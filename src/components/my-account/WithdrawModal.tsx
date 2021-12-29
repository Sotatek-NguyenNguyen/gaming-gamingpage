import { FC } from 'react';
import BaseModal from '../shared/BaseModal';

interface Props {
  onClose?: () => void | Promise<void>;
  onConfirm?: () => void | Promise<void>;
  confirmText?: string;
  playerKey?: string;
  chargeLoading: boolean;
}

const WithdrawModal: FC<Props> = ({
  onClose,
  onConfirm,
  confirmText,
  playerKey,
  chargeLoading,
}) => {
  return (
    <BaseModal
      dense
      modalName="WITHDRAW"
      loading={false}
      confirmText={confirmText}
      chargeLoading={chargeLoading}
      customBody={
        <div>
          <div className="text-base mt-2 ml-3">Game Wallet Address</div>
          <input
            type="text"
            className="bg-white mt-1 bg-opacity-50 rounded-full outline-none text-primary-100 py-3 px-7 w-full"
            readOnly
            value="4zj7KF13agrr3VYEt3RxxhDtzHGQmL7KdhzGZ9nzp1xD"
          />
          <div className="text-base mt-4 ml-3">Destination Wallet Address</div>
          <input
            type="text"
            className="bg-white mt-1 rounded-full outline-none text-primary-100 py-3 px-7 w-full"
            defaultValue={playerKey}
          />
          <div className="text-base mt-4 ml-3">Withdraw Amount: *</div>
          <div className="relative mt-1 text-primary-100">
            <input
              type="number"
              className="bg-white rounded-full outline-none py-3 pl-7 pr-32 w-full"
            />
            <span className="uppercase absolute top-1/2 right-10 transform -translate-y-1/2">
              Token
            </span>
          </div>
        </div>
      }
      onClose={onClose}
      handleConfirm={onConfirm}
    />
  );
};

export default WithdrawModal;
