import { FC, useRef } from 'react';
import BaseModal from '../shared/BaseModal';

interface Props {
  onClose?: () => void | Promise<void>;
  onConfirm?: (val: number) => void | Promise<void>;
  confirmText?: string;
  playerKey?: string;
  gameWallet?: string;
  tokenCode?: string;
  chargeLoading: boolean;
}

const ReqOTPModal: FC<Props> = ({
  onClose,
  onConfirm,
  confirmText,
  playerKey,
  gameWallet,
  chargeLoading,
  tokenCode,
}) => {
  const inputElement = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleReqOTP = () => {
    console.log(inputElement.current.value);
    if (onConfirm && inputElement.current.value) {
      onConfirm(Number(inputElement.current.value));
    }
  };

  const onValidateInput = (evt: React.FormEvent<HTMLInputElement>) => {
    const element = evt.target as HTMLInputElement;
    if (element?.value) {
      const t = element.value;
      element.value = t;
      // Validate TODO
      //t.indexOf('.') >= 0 ? t.substr(0, t.indexOf('.')) + t.substr(t.indexOf('.'), 7) : t;
    }
  };

  return (
    <BaseModal
      dense
      modalName="Request OTP"
      loading={false}
      confirmText={confirmText}
      chargeLoading={chargeLoading}
      customBody={
        <div>
          <input
            type="text"
            className="bg-white mt-1 rounded-full outline-none text-primary-100 py-3 px-7 w-full"
            defaultValue=""
            ref={inputElement}
            onInput={(e: React.FormEvent<HTMLInputElement>) => onValidateInput(e)}
          />
        </div>
      }
      onClose={onClose}
      handleConfirm={handleReqOTP}
    />
  );
};

export default ReqOTPModal;
