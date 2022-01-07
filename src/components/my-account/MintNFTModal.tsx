import { FC, useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { userMintNFTArweaveUploadAction, userMintNFTAction } from '../../api/user';
import { Connection, Transaction } from '@solana/web3.js';
import { UserMintNFTArweaveUploadResponse } from '../../utils/interface';
// import Spinner from '../shared/Spinner';

interface Props {
  onClose?: () => void | Promise<void>;
  playerKey?: string;
  signTransaction?: (transaction: Transaction) => Promise<Transaction>;
  connection?: Connection;
}

const MintNFTModal: FC<Props> = ({ onClose, playerKey, signTransaction, connection }) => {
  const [currentState, setCurrentState] = useState<number>(1);
  const [txId, setTxId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [mintingState, setMintingState] = useState<number>(1);
  const [runTimer, setRunTimer] = useState<boolean>(false);
  const [arweaveUploaded, setArweaveUploaded] = useState<UserMintNFTArweaveUploadResponse>();
  const inputItemIdElement = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    let timerId: any;
    if (runTimer) {
      timerId = setInterval(() => {
        setMintingState((increase) => increase + 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [runTimer]);

  useEffect(() => {
    if (mintingState >= 7 && runTimer) {
      setRunTimer(false);
    }
  }, [mintingState, runTimer]);

  const handleCheckAvailability = async () => {
    try {
      if (currentState === 1) {
        if (connection && signTransaction && inputItemIdElement.current.value) {
          setLoading(true);
          const arweaveUploadResponse = await userMintNFTArweaveUploadAction({
            gameItemId: inputItemIdElement.current.value,
          });

          const userTx = Transaction.from(
            Buffer.from(arweaveUploadResponse.serializedTx, 'base64'),
          );
          const signed = await signTransaction(userTx);
          const signature = await connection.sendRawTransaction(signed.serialize());
          await connection.confirmTransaction(signature);
          setArweaveUploaded(arweaveUploadResponse);
          setTxId(signature);
          setCurrentState(2);
        }
      } else if (currentState === 2) {
        if (connection && signTransaction && arweaveUploaded && arweaveUploaded?.nftItemId) {
          setLoading(true);
          setCurrentState(3);
          setRunTimer(true);
          const userMintTx = await userMintNFTAction({
            arweaveUploadTxId: txId,
            nftItemId: arweaveUploaded.nftItemId,
          });
          const userTx = Transaction.from(Buffer.from(userMintTx.serializedTx, 'base64'));
          const signed = await signTransaction(userTx);
          const signature = await connection.sendRawTransaction(signed.serialize());
          await connection.confirmTransaction(signature);
          console.log(signature);
          setMintingState(8);
          if (onClose) {
            setTimeout(() => {
              onClose();
            }, 3000);
          }
        }
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    setLoading(false);
  };
  return (
    <div
      className={`relative flex flex-col items-center w-full overflow-x-hidden overflow-y-auto max-h-90v rounded-2xl p-10 shadow-lg bg-primary-100 md:w-32rem`}
    >
      {/* {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-75">
          <Spinner size="medium" variant="basic" />
        </div>
      )} */}

      <div className="w-full font-bold text-xl text-white">Mint NFT</div>
      <div className="w-full text-white mt-6">
        <ul className="flex justify-between items-center relative px-20 mint-title-list">
          <li className={clsx('text-center flex flex-col items-center z-10')}>
            <span className="bg-primary-700 w-3.75rem h-3.75rem flex justify-center items-center rounded-full font-bold text-2xl">
              1
            </span>
            <span className="mt-1 text-lg">Check Item</span>
          </li>
          <li
            className={clsx('text-center flex flex-col items-center z-10', {
              'text-white text-opacity-40': currentState < 2,
            })}
          >
            <span
              className={clsx(
                'w-3.75rem h-3.75rem flex justify-center items-center rounded-full font-bold text-2xl',
                {
                  'bg-primary-800': currentState < 2,
                  'bg-primary-700': currentState >= 2,
                },
              )}
            >
              2
            </span>
            <span className="mt-1 text-lg">Mint</span>
          </li>
        </ul>
        {currentState === 3 ? (
          <div className="text-white">
            <div className="text-center mt-10">
              Easily create an NFT with Metaplex standard that can be traded on any NFT market
            </div>
            <div className="flex flex-col md:grid grid-cols-12 text-gray-50 mt-6 -ml-5">
              <div className="flex md:contents">
                <div className="col-start-1 col-end-3 mr-10 md:mx-auto relative">
                  <div className="h-full w-4 flex items-center justify-center">
                    <div className="h-full w-1 bg-primary-300 pointer-events-none" />
                  </div>
                  <div className="w-4 h-4 absolute top-0 rounded-full bg-primary-300 shadow text-center" />
                </div>
                <div className="col-start-3 col-end-12">Minting</div>
              </div>

              <div className="flex md:contents">
                <div className="col-start-1 col-end-3 mr-10 md:mx-auto relative">
                  {mintingState >= 1 ? (
                    <>
                      <div className="h-full w-7 flex items-center justify-center">
                        <div className="h-full w-1 bg-primary-300 pointer-events-none" />
                      </div>
                      <div className="w-7 h-7 absolute -bottom-1 rounded-full bg-primary-300 bg-opacity-40 shadow text-center flex justify-center items-center">
                        <div className="w-4 h-4 bg-primary-300 rounded-full" />
                      </div>
                    </>
                  ) : (
                    <div className="h-full w-4 flex items-center justify-center">
                      <div className="h-full w-1 bg-primary-800 pointer-events-none" />
                    </div>
                  )}
                </div>
                <div className="col-start-3 col-end-12 mt-6">Preparing Assets</div>
              </div>
              <div className="flex md:contents">
                <div className="col-start-1 col-end-3 mr-10 md:mx-auto relative">
                  {mintingState >= 2 ? (
                    <>
                      <div className="h-full w-7 flex items-center justify-center">
                        <div className="h-full w-1 bg-primary-300 pointer-events-none" />
                      </div>
                      <div className="w-7 h-7 absolute -bottom-1 rounded-full bg-primary-300 bg-opacity-40 shadow text-center flex justify-center items-center">
                        <div className="w-4 h-4 bg-primary-300 rounded-full" />
                      </div>
                    </>
                  ) : (
                    <div className="h-full w-4 flex items-center justify-center">
                      <div className="h-full w-1 bg-primary-800 pointer-events-none" />
                    </div>
                  )}
                </div>
                <div className="col-start-3 col-end-12 mt-6">Signing Metadata Transaction</div>
              </div>
              <div className="flex md:contents">
                <div className="col-start-1 col-end-3 mr-10 md:mx-auto relative">
                  {mintingState >= 3 ? (
                    <>
                      <div className="h-full w-7 flex items-center justify-center">
                        <div className="h-full w-1 bg-primary-300 pointer-events-none" />
                      </div>
                      <div className="w-7 h-7 absolute -bottom-1 rounded-full bg-primary-300 bg-opacity-40 shadow text-center flex justify-center items-center">
                        <div className="w-4 h-4 bg-primary-300 rounded-full" />
                      </div>
                    </>
                  ) : (
                    <div className="h-full w-4 flex items-center justify-center">
                      <div className="h-full w-1 bg-primary-800 pointer-events-none" />
                    </div>
                  )}
                </div>
                <div className="col-start-3 col-end-12 mt-6">Sending Transaction to Solana</div>
              </div>
              <div className="flex md:contents">
                <div className="col-start-1 col-end-3 mr-10 md:mx-auto relative">
                  {mintingState >= 4 ? (
                    <>
                      <div className="h-full w-7 flex items-center justify-center">
                        <div className="h-full w-1 bg-primary-300 pointer-events-none" />
                      </div>
                      <div className="w-7 h-7 absolute -bottom-1 rounded-full bg-primary-300 bg-opacity-40 shadow text-center flex justify-center items-center">
                        <div className="w-4 h-4 bg-primary-300 rounded-full" />
                      </div>
                    </>
                  ) : (
                    <div className="h-full w-4 flex items-center justify-center">
                      <div className="h-full w-1 bg-primary-800 pointer-events-none" />
                    </div>
                  )}
                </div>
                <div className="col-start-3 col-end-12 mt-6">Waiting for Initial Confirmation</div>
              </div>
              <div className="flex md:contents">
                <div className="col-start-1 col-end-3 mr-10 md:mx-auto relative">
                  {mintingState >= 5 ? (
                    <>
                      <div className="h-full w-7 flex items-center justify-center">
                        <div className="h-full w-1 bg-primary-300 pointer-events-none" />
                      </div>
                      <div className="w-7 h-7 absolute -bottom-1 rounded-full bg-primary-300 bg-opacity-40 shadow text-center flex justify-center items-center">
                        <div className="w-4 h-4 bg-primary-300 rounded-full" />
                      </div>
                    </>
                  ) : (
                    <div className="h-full w-4 flex items-center justify-center">
                      <div className="h-full w-1 bg-primary-800 pointer-events-none" />
                    </div>
                  )}
                </div>
                <div className="col-start-3 col-end-12 mt-6">Waiting for Final Confirmation</div>
              </div>
              <div className="flex md:contents">
                <div className="col-start-1 col-end-3 mr-10 md:mx-auto relative">
                  {mintingState >= 6 ? (
                    <>
                      <div className="h-full w-7 flex items-center justify-center">
                        <div className="h-full w-1 bg-primary-300 pointer-events-none" />
                      </div>
                      <div className="w-7 h-7 absolute -bottom-1 rounded-full bg-primary-300 bg-opacity-40 shadow text-center flex justify-center items-center">
                        <div className="w-4 h-4 bg-primary-300 rounded-full" />
                      </div>
                    </>
                  ) : (
                    <div className="h-full w-4 flex items-center justify-center">
                      <div className="h-full w-1 bg-primary-800 pointer-events-none" />
                    </div>
                  )}
                </div>
                <div className="col-start-3 col-end-12 mt-6">Uploading to Arweave</div>
              </div>
              <div className="flex md:contents">
                <div className="col-start-1 col-end-3 mr-10 md:mx-auto relative">
                  {mintingState >= 7 ? (
                    <>
                      <div className="h-full w-7 flex items-center justify-center">
                        <div className="h-full w-1 bg-primary-300 pointer-events-none" />
                      </div>
                      <div className="w-7 h-7 absolute -bottom-1 rounded-full bg-primary-300 bg-opacity-40 shadow text-center flex justify-center items-center">
                        <div className="w-4 h-4 bg-primary-300 rounded-full" />
                      </div>
                    </>
                  ) : (
                    <div className="h-full w-4 flex items-center justify-center">
                      <div className="h-full w-1 bg-primary-800 pointer-events-none" />
                    </div>
                  )}
                </div>
                <div className="col-start-3 col-end-12 mt-6">Updating Metadata</div>
              </div>
              <div className="flex md:contents">
                <div className="col-start-1 col-end-3 mr-10 md:mx-auto relative">
                  {mintingState >= 8 ? (
                    <>
                      <div className="h-full w-7 flex items-center justify-center">
                        <div className="h-full w-1 bg-primary-300 pointer-events-none" />
                      </div>
                      <div className="w-7 h-7 absolute -bottom-1 rounded-full bg-primary-300 bg-opacity-40 shadow text-center flex justify-center items-center">
                        <div className="w-4 h-4 bg-primary-300 rounded-full" />
                      </div>
                    </>
                  ) : (
                    <div className="h-full w-4 flex items-center justify-center">
                      <div className="h-full w-1 bg-primary-800 pointer-events-none rounded-br-md rounded-bl-md" />
                    </div>
                  )}
                </div>
                <div className="col-start-3 col-end-12 mt-6">Signing Token Transaction</div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-10">
              <div className="text-primary-800">Player Wallet Address</div>
              <input
                type="text"
                className="bg-primary-800 mt-2 bg-opacity-50 rounded-full outline-none text-white truncate py-3 px-7 w-full"
                readOnly
                value={playerKey}
              />
              <div className="mt-5 text-primary-800">Item ID: </div>
              <input
                type="text"
                className={clsx('mt-2 rounded-full outline-none py-3 pl-7 w-full', {
                  'bg-white text-primary-100': currentState === 1,
                  'bg-primary-800 bg-opacity-50 text-white': currentState !== 1,
                })}
                readOnly={currentState !== 1}
                ref={inputItemIdElement}
              />
              {currentState === 2 && (
                <>
                  <div className="mt-5 text-primary-800">Title</div>
                  <input
                    type="text"
                    className="bg-primary-800 mt-2 bg-opacity-50 rounded-full outline-none text-white truncate py-3 px-7 w-full"
                    defaultValue={arweaveUploaded?.metadata?.name}
                    readOnly
                  />
                  <div className="mt-5 text-primary-800">Symbol:</div>
                  <input
                    type="text"
                    className="bg-primary-800 mt-2 bg-opacity-50 rounded-full outline-none text-white truncate py-3 px-7 w-full"
                    defaultValue=""
                    readOnly
                  />
                  {arweaveUploaded?.metadata?.description && (
                    <>
                      <div className="mt-5 text-primary-800">Description:</div>
                      <textarea
                        className="bg-primary-800 bg-opacity-50 mt-2 rounded-3xl resize-none text-white outline-none py-3 pl-7 h-24 w-full"
                        defaultValue={arweaveUploaded?.metadata?.description}
                        readOnly
                      />
                    </>
                  )}
                  {arweaveUploaded?.metadata?.attributes &&
                  arweaveUploaded.metadata.attributes.length ? (
                    <>
                      <div className="mt-5 text-primary-800">Attributes:</div>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        {arweaveUploaded.metadata.attributes.map((attribute, idx) => (
                          <input
                            key={idx}
                            type="text"
                            className="bg-primary-800 bg-opacity-50 rounded-full outline-none text-white truncate py-3 px-7 w-full"
                            defaultValue={attribute.value}
                            readOnly
                          />
                        ))}
                      </div>
                    </>
                  ) : (
                    ''
                  )}
                  <div className="mt-5 text-primary-800">Royalties Percentage:</div>
                  <input
                    type="text"
                    className="bg-primary-800 mt-2 bg-opacity-50 rounded-full outline-none text-white truncate py-3 px-7 w-full"
                    defaultValue="0 - 100%"
                    readOnly
                  />
                  <div className="mt-5 text-primary-800">Cost to Create: $2</div>
                </>
              )}
            </div>

            <div className="flex items-center justify-center w-full px-4">
              <button
                className={clsx(
                  'w-60 h-12 mt-8 text-white rounded-full font-semibold overflow-hidden text-base transition-all',
                  {
                    'bg-primary-300 hover:bg-primary-100': !loading,
                    'bg-primary-800': loading,
                  },
                )}
                onClick={handleCheckAvailability}
                disabled={loading}
              >
                {currentState === 1
                  ? loading
                    ? 'Checking'
                    : 'Check item availability'
                  : loading
                  ? 'Paying'
                  : 'Pay to MINT'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MintNFTModal;
