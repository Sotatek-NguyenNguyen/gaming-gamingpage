import { FC, useMemo, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, clusterApiUrl, PublicKey, Commitment, ConfirmOptions } from '@solana/web3.js';
import { Program, Provider, BN, web3 } from '@project-serum/anchor';
import { useAlert, useAuth, useGlobal } from '../../hooks';
import { confirmAlert } from 'react-confirm-alert';
import DepositModal from '../my-account/DepositModal';
import { IDL } from '../../utils/treasury';
import * as spl from '@solana/spl-token';

declare global {
  interface Window {
    solana: any;
  }
}

const treasuryPDASeed = Buffer.from('treasury');

const DepositButton: FC = () => {
  const { alertError, alertSuccess } = useAlert();
  const { wallet, publicKey } = useWallet();
  const { isAuthenticated } = useAuth();
  const { gameData } = useGlobal();
  const [chargeLoading, setChargeLoading] = useState<boolean>(false);

  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);

  const opts: ConfirmOptions = {
    preflightCommitment: 'processed' as Commitment,
    commitment: 'processed' as Commitment,
  };

  const { SystemProgram } = web3;

  const handleDeposit = () => {
    if (!wallet || !isAuthenticated) {
      alertError('Please connect to your wallet');
      return;
    }
    confirmAlert({
      customUI: ({ onClose }) => {
        async function sendTransaction(depositValue: number) {
          const wallet = window.solana;

          if (publicKey && gameData.gameId && gameData.programId && gameData.tokenAddress) {
            const gameId = new PublicKey(gameData.gameId);
            setChargeLoading(true);
            try {
              const network = clusterApiUrl('devnet');
              const connection = new Connection(network, opts.preflightCommitment);
              const provider = new Provider(connection, wallet, opts);
              const program = new Program(IDL, new PublicKey(gameData.programId), provider);

              // token for deposit and withdraw
              const token = new spl.Token(
                provider.connection,
                new PublicKey(gameData.tokenAddress),
                spl.TOKEN_PROGRAM_ID,
                wallet.payer,
              );

              const fromTokenAccount = await token.getOrCreateAssociatedAccountInfo(
                wallet.publicKey,
              );

              const [treasuryAccount] = await PublicKey.findProgramAddress(
                [treasuryPDASeed, gameId.toBuffer()],
                program.programId,
              );

              const [treasuryTokenAccount] = await PublicKey.findProgramAddress(
                [treasuryPDASeed, gameId.toBuffer(), token.publicKey.toBuffer()],
                program.programId,
              );

              const signature = await program.rpc.deposit(gameId, new BN(depositValue * 1000000), {
                accounts: {
                  sender: program.provider.wallet.publicKey,
                  depositUser: program.provider.wallet.publicKey,
                  senderTokenAccount: fromTokenAccount.address,
                  treasuryAccount,
                  treasuryTokenAccount,
                  tokenProgram: spl.TOKEN_PROGRAM_ID,
                  systemProgram: SystemProgram.programId,
                },
              });
              alertSuccess('Deposited successfully');
              console.log('signature: ', signature);
            } catch (error) {
              console.error(error);
              setChargeLoading(false);
              onClose();
              alertError('Transaction Canceled');
            }
            setChargeLoading(false);
            onClose();
          }
        }

        return (
          <DepositModal
            onClose={onClose}
            onConfirm={sendTransaction}
            confirmText="Deposit"
            playerKey={base58}
            chargeLoading={chargeLoading}
            gameWallet={gameData.walletAddress}
          />
        );
      },
    });
  };

  return (
    <button
      className="mt-12 px-12 h-14 font-semibold overflow-hidden text-lg text-white rounded-full bg-primary-300 hover:bg-primary-100 transition-all"
      onClick={handleDeposit}
    >
      Deposit To Play
    </button>
  );
};

export default DepositButton;
