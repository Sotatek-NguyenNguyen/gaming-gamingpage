import { WalletSignTransactionError } from '@solana/wallet-adapter-base';
import { useContext } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import GlobalContext from '../contexts/global';
import { ErrorMessages } from '../utils/enum';
import { useAlert } from './useAlert';
import { transformLamportsToSOL } from './../utils/helper';

export function useSmartContract() {
  const { setAccountBalance } = useContext(GlobalContext);
  const { alertError } = useAlert();
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();

  const handleOnchainError = (err: any) => {
    console.log({ err });
    if (err as WalletSignTransactionError) {
      if (typeof err === 'string') {
        alertError(err);
      } else if (
        err &&
        (err.code === '4001' ||
          err.message === 'Transaction cancelled' ||
          err.name === WalletSignTransactionError.name)
      ) {
        alertError(ErrorMessages.UserRejectRequest);
      } else if (err && err.message) {
        alertError(err.message);
      } else {
        alertError(ErrorMessages.UnKnow);
      }
    } else {
      alertError(ErrorMessages.UnKnow);
    }
  };

  const refreshWalletBalance = async (): Promise<number | null> => {
    if (!publicKey) {
      throw new WalletNotConnectedError();
    }

    try {
      const accInfo = await connection.getAccountInfo(publicKey);
      if (accInfo && accInfo.lamports) {
        const balanceResult = transformLamportsToSOL(accInfo.lamports || 0);

        setAccountBalance(accInfo.lamports);

        return balanceResult;
      } else {
        return Promise.reject({ message: 'Account not found' });
      }
    } catch (err) {
      return Promise.reject({ err });
    }
  };

  return { handleOnchainError, refreshWalletBalance };
}
