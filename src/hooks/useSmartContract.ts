import { WalletSignTransactionError } from '@solana/wallet-adapter-base';
import { useContext } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import GlobalContext from '../contexts/global';
import { ErrorMessages } from '../utils/enum';
import { useAlert, useGlobal } from '../hooks';
import { transformLamportsToSOL, renderTokenBalance } from './../utils/helper';
import { Token, ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';

export function useSmartContract() {
  const { setAccountBalance } = useContext(GlobalContext);
  const { alertError } = useAlert();
  const { connection } = useConnection();
  const { publicKey, signTransaction } = useWallet();
  const { gameData } = useGlobal();

  const handleOnchainError = (err: any) => {
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
      const tokenAccount = await Token.getAssociatedTokenAddress(
        ASSOCIATED_TOKEN_PROGRAM_ID,
        TOKEN_PROGRAM_ID,
        new PublicKey(gameData.tokenAddress),
        publicKey,
      );
      const tokenAccountBalance = await connection.getTokenAccountBalance(tokenAccount);
      // const accInfo = await connection.getAccountInfo(publicKey);
      if (tokenAccountBalance && tokenAccountBalance.value) {
        // const balanceResult = transformLamportsToSOL(accInfo.lamports || 0);
        const balanceResult = renderTokenBalance(tokenAccountBalance.value.uiAmount, 2);
        setAccountBalance(balanceResult);

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
