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
      modalMW="md:w-46-6rem w-full"
      customBody={
        <>
          <div className="flex gap-x-2 justify-between text-xl">
            <div className="flex-1 flex items-center">
              <span className="bg-primary-700 w-12 h-12 flex justify-center items-center rounded-full">
                1
              </span>
              <span className="ml-3">Information</span>
              <span className="bg-secondary-100 h-0.5 w-full flex-1 ml-2.5" />
            </div>
            <div className="flex-1 flex items-center">
              <span className="bg-primary-800 w-12 h-12 flex justify-center items-center rounded-full">
                2
              </span>
              <span className="ml-3">Royalties</span>
              <span className="bg-primary-800 h-0.5 w-full flex-1 ml-2.5" />
            </div>
            <div className="flex items-center">
              <span className="bg-primary-800 w-12 h-12 flex justify-center items-center rounded-full">
                3
              </span>
              <span className="ml-3">Launch</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-base mt-2 ml-3">Player Wallet Address</div>
            <input
              type="text"
              className="bg-white mt-1 bg-opacity-50 rounded-full outline-none text-primary-100 py-3 px-7 w-full"
              readOnly
              value={playerKey}
            />
            <div className="text-base mt-4 ml-3">Item ID: </div>
            <div className="relative mt-1 text-primary-100">
              <input
                type="text"
                className="bg-white rounded-full outline-none py-3 pl-7 w-full"
                defaultValue={112312123}
              />
            </div>
            <div className="text-base mt-4 ml-3">Title:</div>
            <div className="relative mt-1 text-primary-100">
              <input
                type="text"
                className="bg-white rounded-full outline-none py-3 pl-7 w-full"
                defaultValue={1234557647635647}
              />
            </div>
            <div className="text-base mt-4 ml-3">Symbol:</div>
            <div className="relative mt-1 text-primary-100">
              <input
                type="text"
                className="bg-white rounded-full outline-none py-3 pl-7 w-full"
                defaultValue={1234557647635647}
              />
            </div>
            <div className="text-base mt-4 ml-3">Description:</div>
            <div className="relative mt-1 text-primary-100">
              <textarea
                className="bg-white rounded-3xl resize-none outline-none py-3 pl-7 h-24 w-full"
                defaultValue={'Meo meo meo ~'}
              />
            </div>
          </div>
        </>
      }
      onClose={onClose}
      handleConfirm={onConfirm}
    />
  );
};

export default MintNFTModal;
