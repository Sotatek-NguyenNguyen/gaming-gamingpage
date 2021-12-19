import React, { FC, useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import NavbarMenus from './NavbarMenus';
import TransactionsTable from './TransactionsTable';
import { confirmAlert } from 'react-confirm-alert';
import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import MintNFTModal from './MintNFTModal';

const Detail: FC = ({}) => {
  const { publicKey } = useWallet();
  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);

  const handleDeposit = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <DepositModal
            onClose={onClose}
            onConfirm={onClose}
            confirmText="Deposit"
            playerKey={base58}
          />
        );
      },
    });
  };

  const handleWithdraw = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <WithdrawModal
            onClose={onClose}
            onConfirm={onClose}
            confirmText="Withdraw"
            playerKey={base58}
          />
        );
      },
    });
  };

  const handleMintNFT = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <MintNFTModal
            onClose={onClose}
            onConfirm={onClose}
            confirmText="Mint"
            playerKey={base58}
          />
        );
      },
    });
  };

  return (
    <div className="bg-primary-100">
      <div className="layout-container pt-5 pb-14">
        <div className="text-center text-white bg-primary-500 py-14 px-10 rounded-lg">
          <h2 className="text-2xl">GAME X BALANCE</h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="text-2xl">ABC</span>
            <span className="text-5xl">400</span>
          </div>
        </div>
        <div className="mt-6 md:flex gap-x-4 justify-between">
          <div className="text-white bg-primary-500 p-6 rounded-lg flex-1">
            <div className="bg-primary-100 bg-opacity-50 p-3 rounded-lg">
              <div className="text-xl uppercase">Player Info</div>
              <div className="text-base mt-2 ml-3">Player ID</div>
              <input
                type="text"
                className="bg-white mt-1 bg-opacity-50 rounded-full outline-none text-primary-100 py-3 px-7 w-full md:w-1/2"
                readOnly
                value="1F6AE26348B0523D"
              />
              <div className="text-base mt-4 ml-3">Wallet Address</div>
              <input
                type="text"
                className="bg-white mt-1 bg-opacity-50 rounded-full outline-none text-primary-100 py-3 px-7 w-full"
                readOnly
                value="4zj7KF13agrr3VYEt3RxxhDtzHGQmL7KdhzGZ9nzp1xD"
              />
            </div>
          </div>
          <div className="text-white bg-primary-500 py-7 mt-6 md:mt-0 px-11 rounded-lg md:w-96 flex flex-col items-center justify-between">
            <button
              className="w-56 font-bold rounded-xl mt-4 md:mt-0 uppercase text-white bg-transparent bg-opacity-70 hover:bg-secondary-100 p-3 border-3 border-primary-200 transition-all"
              onClick={handleDeposit}
            >
              DEPOSIT
            </button>
            <button
              className="w-56 font-bold rounded-xl mt-4 md:mt-0 uppercase text-white bg-transparent bg-opacity-70 hover:bg-secondary-100 p-3 border-3 border-primary-200 transition-all"
              onClick={handleWithdraw}
            >
              WITHDRAW
            </button>
            <button
              className="w-56 font-bold rounded-xl mt-4 md:mt-0 uppercase text-white bg-transparent bg-opacity-70 hover:bg-secondary-100 p-3 border-3 border-primary-200 transition-all"
              onClick={handleMintNFT}
            >
              REQUEST MINT NFT
            </button>
          </div>
        </div>
        <div className="mt-6 p-6 bg-primary-500 text-white rounded-lg">
          <NavbarMenus />
          <TransactionsTable />
        </div>
      </div>
    </div>
  );
};

export default Detail;
