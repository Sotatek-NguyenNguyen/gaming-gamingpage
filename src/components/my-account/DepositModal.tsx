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

const DepositModal: FC<Props> = ({
  onClose,
  onConfirm,
  confirmText,
  playerKey,
  chargeLoading,
  gameWallet,
  tokenCode,
}) => {
  const inputElement = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleSubmitDeposit = () => {
    if (onConfirm && inputElement.current.value) {
      onConfirm(Number(inputElement.current.value));
    }
  };

  const onValidateInput = (evt: React.FormEvent<HTMLInputElement>) => {
    const element = evt.target as HTMLInputElement;
    if (element?.value) {
      const t = element.value;
      element.value =
        t.indexOf('.') >= 0 ? t.substr(0, t.indexOf('.')) + t.substr(t.indexOf('.'), 7) : t;
    }
  };

  return (
    <BaseModal
      dense
      modalName="Deposit"
      loading={false}
      confirmText={confirmText}
      chargeLoading={chargeLoading}
      customBody={
        <div>
          <div className="text-primary-800">Game Wallet Address</div>
          <input
            type="text"
            className="bg-primary-800 mt-2 bg-opacity-50 rounded-full outline-none text-white truncate py-3 px-7 w-full"
            readOnly
            value={gameWallet}
          />
          <div className="mt-5 text-primary-800">Player Wallet Address</div>
          <input
            type="text"
            className="bg-primary-800 mt-2 bg-opacity-50 rounded-full outline-none text-white truncate py-3 px-7 w-full"
            readOnly
            value={playerKey}
          />
          <div className="mt-5 text-primary-800">Deposit Amount: *</div>
          <div className="relative mt-2 text-primary-100">
            <input
              type="number"
              className="bg-white rounded-full outline-none py-3 pl-7 pr-24 w-full"
              ref={inputElement}
              onKeyDown={(evt) => ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()}
              onInput={(e: React.FormEvent<HTMLInputElement>) => onValidateInput(e)}
            />
            {tokenCode && (
              <span className="flex justify-center items-center rounded-full px-4 font-semibold text-base absolute h-10 top-1/2 right-1 transform bg-primary-300 text-white -translate-y-1/2">
                {tokenCode}
              </span>
            )}
          </div>
        </div>
      }
      onClose={onClose}
      handleConfirm={handleSubmitDeposit}
    />
  );
};

export default DepositModal;
