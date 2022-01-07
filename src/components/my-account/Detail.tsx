import React, { FC, useMemo, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  Connection,
  clusterApiUrl,
  PublicKey,
  Commitment,
  ConfirmOptions,
  Transaction,
} from '@solana/web3.js';
import { Program, Provider, BN, web3 } from '@project-serum/anchor';
import { confirmAlert } from 'react-confirm-alert';
import * as spl from '@solana/spl-token';
import * as bs58 from 'bs58';
import clsx from 'clsx';
import NavbarMenus from './NavbarMenus';
import TransactionsTable from './TransactionsTable';
import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import MintNFTModal from './MintNFTModal';
import VerifyInGameAccountModal from './VerifyInGameAccountModal';
import { UserDetailResponse } from '../../utils/interface';
import { useGlobal, useAlert } from '../../hooks';
import { IDL } from '../../utils/treasury';
import { renderTokenBalance } from '../../utils/helper';
import { userWithdrawAction } from '../../api/user';

interface Props {
  user?: UserDetailResponse;
  loading: boolean;
}

declare global {
  interface Window {
    solana: any;
  }
}

const treasuryPDASeed = Buffer.from('treasury');
export const expiredTime = 600; // 10 mins

const Detail: FC<Props> = ({ user, loading }) => {
  const { publicKey, signTransaction, signMessage } = useWallet();
  // const { connection } = useConnection();
  const { gameData } = useGlobal();
  const { alertError, alertSuccess } = useAlert();
  const [chargeLoading, setChargeLoading] = useState<boolean>(false);
  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);
  const isAccountVerified = useMemo(() => user?.accountInGameId, [user]);

  const opts: ConfirmOptions = {
    preflightCommitment: 'processed' as Commitment,
    commitment: 'processed' as Commitment,
  };

  const { SystemProgram } = web3;
  const wallet = window.solana;

  const network = clusterApiUrl('devnet');
  const connection = new Connection(network, opts.preflightCommitment);
  const provider = new Provider(connection, wallet, opts);

  const createPayload = (address: PublicKey) => {
    const now = new Date().getTime();
    return {
      address: address.toString(),
      // iat: now,
      exp: now + expiredTime * 1000,
    };
  };

  const handleDeposit = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        async function sendTransaction(depositValue: number) {
          const wallet = window.solana;

          if (publicKey && gameData.gameId && gameData.programId && gameData.tokenAddress) {
            const gameId = new PublicKey(gameData.gameId);
            setChargeLoading(true);
            try {
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

              const signature = await program.rpc.deposit(
                gameId,
                new BN(depositValue * Math.pow(10, gameData.tokenDecimals)),
                {
                  accounts: {
                    sender: program.provider.wallet.publicKey,
                    depositUser: program.provider.wallet.publicKey,
                    senderTokenAccount: fromTokenAccount.address,
                    treasuryAccount,
                    treasuryTokenAccount,
                    tokenProgram: spl.TOKEN_PROGRAM_ID,
                    systemProgram: SystemProgram.programId,
                  },
                },
              );
              alertSuccess('Deposited successfully');
              // console.log('signature: ', signature);
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
            confirmText={chargeLoading ? 'Depositing' : 'Deposit'}
            playerKey={base58}
            chargeLoading={chargeLoading}
            gameWallet={gameData.walletAddress}
          />
        );
      },
    });
  };

  const handleWithdraw = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        const handleWithdraw = async (amount: number) => {
          if (signTransaction) {
            setChargeLoading(true);
            try {
              const serverTx = await userWithdrawAction({ amount });

              const userTx = Transaction.from(Buffer.from(serverTx.serializedTx, 'base64'));
              const signed = await signTransaction(userTx);
              const signature = await connection.sendRawTransaction(signed.serialize());
              await connection.confirmTransaction(signature);
              alertSuccess('Withdraw successfully');
              // console.log({ signature });
            } catch (error) {
              console.error(error);
              setChargeLoading(false);
              onClose();
              alertError('Transaction Canceled');
            }
            setChargeLoading(false);
            onClose();
          }
        };

        return (
          <WithdrawModal
            onClose={onClose}
            onConfirm={handleWithdraw}
            confirmText="Withdraw"
            playerKey={base58}
            chargeLoading={chargeLoading}
            gameWallet={gameData.walletAddress}
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
            playerKey={base58}
            signTransaction={signTransaction}
            connection={connection}
          />
        );
      },
    });
  };

  const handleVerifyInGameAccount = async () => {
    if (publicKey && signMessage) {
      try {
        const payload = createPayload(publicKey);
        const signatureOTP = await signMessage(Buffer.from(JSON.stringify(payload)));
        const signedOTPData = {
          ...payload,
          signature: Buffer.from(signatureOTP).toString('hex'),
        };
        const otpToken = bs58.encode(Buffer.from(JSON.stringify(signedOTPData)));

        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <VerifyInGameAccountModal
                onClose={onClose}
                confirmText="Confirm"
                otpToken={otpToken}
                logoUrl={gameData.logoURL}
                expiredTime={expiredTime}
                signMessage={signMessage}
                createPayload={createPayload}
                publicKey={publicKey}
              />
            );
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="bg-primary-100">
      <div className="layout-container pt-12 pb-14">
        <div className="text-center text-white bg-primary-200 p-8 rounded-2xl font-bold">
          <h2 className="text-2xl text-primary-800">GAME X BALANCE</h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="text-4xl">{gameData.tokenCode}</span>
            {loading ? (
              <span className="h-3 bg-gray-300 rounded-full w-14 animate-pulse" />
            ) : (
              <span className="text-4xl">
                {user && user?.balance !== 0
                  ? renderTokenBalance(user.balance / (10 * gameData.tokenDecimals), 2)
                  : user?.balance}
              </span>
            )}
          </div>
        </div>
        <div className="mt-6 md:flex gap-x-4 justify-between">
          <div className="text-white bg-primary-200 p-10 rounded-2xl flex-1">
            <div className="font-bold text-base uppercase">Player Info</div>
            {/* <div className="text-base mt-2 ml-3">Player ID</div>
              {loading ? (
                <span className="h-3 bg-gray-300 rounded-full w-full animate-pulse" />
              ) : (
                <input
                  type="text"
                  className="bg-white mt-1 bg-opacity-50 rounded-full outline-none text-primary-100 py-3 px-7 w-full md:w-1/2"
                  readOnly
                  value={user?.accountInGameId}
                />
              )} */}
            <div className="mt-6 text-primary-800">Wallet Address</div>
            {loading ? (
              <span className="h-3 bg-gray-300 rounded-full w-full animate-pulse" />
            ) : (
              <input
                type="text"
                className="bg-primary-800 rounded-full outline-none text-primary-200 py-3 px-7 w-full mt-3"
                readOnly
                value={user?.address}
              />
            )}
          </div>
          <div className="text-white bg-primary-200 py-7 mt-6 md:mt-0 px-12 rounded-2xl md:w-96 flex flex-col items-center justify-between">
            <button
              className={clsx(
                'w-60 p-2 h-12 font-semibold overflow-hidden text-lg text-white rounded-full transition-all',
                {
                  'bg-primary-300 hover:bg-primary-100': isAccountVerified,
                  'bg-primary-800': !isAccountVerified,
                },
              )}
              onClick={isAccountVerified ? handleDeposit : () => {}}
              disabled={isAccountVerified ? true : false}
            >
              Deposit
            </button>
            <button
              className="w-60 p-2 h-12 mt-4 font-semibold overflow-hidden text-lg text-white rounded-full bg-primary-300 hover:bg-primary-100 transition-all"
              onClick={isAccountVerified ? handleWithdraw : handleVerifyInGameAccount}
            >
              {isAccountVerified ? 'Withdraw' : 'Verify wallet with OTP'}
            </button>
            <button
              className={clsx(
                'w-60 p-2 h-12 mt-4 font-semibold overflow-hidden text-lg text-white rounded-full transition-all',
                {
                  'bg-primary-300 hover:bg-primary-100': isAccountVerified,
                  'bg-primary-800': !isAccountVerified,
                },
              )}
              onClick={isAccountVerified ? handleMintNFT : () => {}}
              disabled={isAccountVerified ? true : false}
            >
              Request Mint NFT
            </button>
          </div>
        </div>
        <div className="mt-6 text-white">
          <NavbarMenus />
          <TransactionsTable verifiedInGameAccount={isAccountVerified ? true : false} />
        </div>
      </div>
    </div>
  );
};

export default Detail;
