import { FC, useState, useEffect } from 'react';
import { PublicKey } from '@solana/web3.js';
import { useAlert } from '../../hooks/useAlert';
import * as bs58 from 'bs58';

interface Props {
  onClose?: () => void | Promise<void>;
  // handleRegenerateOTP: () => Promise<void>;
  createPayload: (address: PublicKey) => { address: string; exp: number };
  signMessage: (message: Uint8Array) => Promise<Uint8Array>;
  confirmText?: string;
  otpToken: string;
  logoUrl?: string;
  expiredTime: number;
  publicKey: PublicKey;
}

const VerifyInGameAccountModal: FC<Props> = ({
  otpToken,
  confirmText,
  logoUrl,
  onClose,
  expiredTime,
  createPayload,
  signMessage,
  publicKey,
}) => {
  const [countDown, setCountDown] = useState<number>(expiredTime);
  const [runTimer, setRunTimer] = useState<boolean>(true);
  const [otpCode, setOtpCode] = useState<string>(otpToken);
  const { alertInfo } = useAlert();

  useEffect(() => {
    let timerId: any;
    if (runTimer) {
      // setCountDown(expiredTime);
      timerId = setInterval(() => {
        setCountDown((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [runTimer]);

  useEffect(() => {
    if (countDown < 0 && runTimer) {
      setRunTimer(false);
      setCountDown(0);
    }
  }, [countDown, runTimer]);

  const seconds = String(countDown % 60).padStart(2, '0');
  const minutes = String(Math.floor(countDown / 60)).padStart(2, '0');

  const handleRegenerateOTP = async () => {
    try {
      const payloadGenerate = createPayload(publicKey);
      const signatureOTPGenerate = await signMessage(Buffer.from(JSON.stringify(payloadGenerate)));
      /* const signedOTPDataGenerate = {
        ...payloadGenerate,
        signature: Buffer.from(signatureOTPGenerate).toString('hex'),
      }; */
      // setOtpCode(bs58.encode(Buffer.from(JSON.stringify(signedOTPDataGenerate))));
      setOtpCode(Buffer.from(signatureOTPGenerate).toString('hex'));
      setRunTimer(true);
      setCountDown(expiredTime);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm = async () => {
    if (countDown) {
      if (otpToken) {
        await navigator.clipboard.writeText(otpToken);
        alertInfo('Copied OTP');
      }
      if (onClose) {
        onClose();
      }
    } else {
      handleRegenerateOTP();
    }
  };

  return (
    <div
      className={`relative flex flex-col items-center w-full overflow-x-hidden overflow-y-auto max-h-90v rounded-2xl p-10 shadow-lg bg-primary-100 md:w-32rem`}
    >
      {/* {loading && (
      <div className="absolute inset-0 flex items-center justify-center bg-opacity-75">
        <Spinner size="medium" variant="basic" />
      </div>
    )} */}

      {logoUrl && <img src={logoUrl} alt="logo" style={{ maxHeight: 40 }} />}

      <div className="w-full text-white">
        <div className="mt-10 text-center">
          <h4 className="text-xl font-bold mb-4">Gamify Connect Request</h4>
          <p
            className="text-primary-800 mb-7"
            dangerouslySetInnerHTML={{
              __html: `Gamify needs to confirm the wallet address linkage to your Game account. <b>Copy the OTP</b> to your game then click <b>CONFIRM</b> to complete the connection:`,
            }}
          />
          <input
            type="text"
            className="bg-transparent mt-2 bg-opacity-50 rounded-full outline-none border border-primary-300 text-white truncate py-3 px-7 w-full font-bold"
            readOnly
            defaultValue={otpCode}
          />
          <div
            className="mt-4 text-primary-800"
            dangerouslySetInnerHTML={{
              __html:
                countDown > 0
                  ? `OTP will expire after <b>${minutes}:${seconds}</b> minutes`
                  : 'Click GENERATE to create a new OPT',
            }}
          />
        </div>

        <div className="flex items-center justify-center w-full px-4">
          <button
            className="w-60 h-12 mt-4 text-white rounded-full font-semibold overflow-hidden text-base bg-primary-300 hover:bg-primary-100 transition-all"
            onClick={handleConfirm}
          >
            {countDown > 0 ? confirmText : 'Generate'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyInGameAccountModal;
