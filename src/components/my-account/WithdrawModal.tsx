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

const WithdrawModal: FC<Props> = ({
  onClose,
  onConfirm,
  confirmText,
  playerKey,
  gameWallet,
  chargeLoading,
  tokenCode,
}) => {
  const inputElement = useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleWithDraw = () => {
    if (onConfirm && inputElement.current.value) {
      onConfirm(Number(inputElement.current.value));
    }
  };

  const onValidateInput = (evt: { target: HTMLInputElement }) => {
    if (evt.target?.value) {
      const t = evt.target.value;
      evt.target.value =
        t.indexOf('.') >= 0 ? t.substr(0, t.indexOf('.')) + t.substr(t.indexOf('.'), 7) : t;
    }
  };

  return (
    <BaseModal
      dense
      modalName="Withdraw"
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
          <div className="mt-5 text-primary-800">Destination Wallet Address</div>
          <input
            type="text"
            className="bg-white mt-1 rounded-full outline-none text-primary-100 py-3 px-7 w-full"
            defaultValue={playerKey}
          />
          <div className="mt-5 text-primary-800">Withdraw Amount: *</div>
          <div className="relative mt-1 text-primary-100">
            <input
              type="number"
              className="bg-white rounded-full outline-none py-3 pl-7 pr-32 w-full"
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
      handleConfirm={handleWithDraw}
    />
  );
};

export default WithdrawModal;
