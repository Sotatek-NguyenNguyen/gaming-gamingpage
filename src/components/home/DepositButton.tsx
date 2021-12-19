import { FC, useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useAlert } from '../../hooks';
import { confirmAlert } from 'react-confirm-alert';
import DepositModal from '../my-account/DepositModal';

const DepositButton: FC = () => {
  const { alertError } = useAlert();
  const { wallet, publicKey } = useWallet();

  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);

  const handleDeposit = () => {
    if (!wallet) {
      alertError('Please connect to your wallet');
      return;
    }
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

  return (
    <button
      className="mt-12 font-bold rounded-xl uppercase text-white bg-transparent bg-opacity-70 hover:bg-secondary-100 px-10 py-5 border-3 border-primary-200 transition-all"
      onClick={handleDeposit}
    >
      DEPOSIT TO PLAY
    </button>
  );
};

export default DepositButton;
