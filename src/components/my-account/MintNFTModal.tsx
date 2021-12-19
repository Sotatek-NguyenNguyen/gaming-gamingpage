import { FC } from 'react';
import BaseModal from '../shared/BaseModal';

interface Props {
  onClose?: () => void | Promise<void>;
  onConfirm?: () => void | Promise<void>;
  confirmText?: string;
  playerKey?: string;
}

const MintNFTModal: FC<Props> = ({ onClose, onConfirm, confirmText, playerKey }) => {
  return (
    <BaseModal
      dense
      modalName="MINT NFT"
      loading={false}
      confirmText={confirmText}
      customBody={
        <div>
          <div className="text-base mt-2 ml-3">Player Wallet Address</div>
          <input
            type="text"
            className="bg-white mt-1 bg-opacity-50 rounded-full outline-none text-primary-100 py-3 px-7 w-full"
            readOnly
            value={playerKey}
          />
          <div className="text-base mt-4 ml-3">Mint Amount: *</div>
          <div className="relative mt-1 text-primary-100">
            <input
              type="number"
              className="bg-white rounded-full outline-none py-3 pl-7 pr-32 w-full"
              defaultValue={1}
            />
          </div>
        </div>
      }
      onClose={onClose}
      handleConfirm={onConfirm}
    />
  );
};

export default MintNFTModal;
