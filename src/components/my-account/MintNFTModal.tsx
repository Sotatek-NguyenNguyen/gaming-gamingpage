import { FC, useState } from 'react';
import clsx from 'clsx';

interface Props {
  onClose?: () => void | Promise<void>;
  onConfirm?: () => void | Promise<void>;
  confirmText?: string;
  playerKey?: string;
  chargeLoading: boolean;
}

const MintNFTModal: FC<Props> = ({ onClose, onConfirm, confirmText, playerKey, chargeLoading }) => {
  const [currentState, setCurrentState] = useState<number>(1);

  const handleCheckAvailability = () => {
    // TODO: handle submit avaialbility item

    if (currentState === 1) {
      setCurrentState(2);
    } else if (currentState === 2) {
      setCurrentState(3);
    }
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
                  <div className="h-full w-4 flex items-center justify-center">
                    <div className="h-full w-1 bg-primary-300 pointer-events-none" />
                  </div>
                  <div className="w-4 h-4 absolute bottom-0.5 -mt-2 rounded-full bg-primary-300 shadow text-center" />
                </div>
                <div className="col-start-3 col-end-12 mt-6">Preparing Assets</div>
              </div>
              <div className="flex md:contents">
                <div className="col-start-1 col-end-3 mr-10 md:mx-auto relative">
                  <div className="h-full w-7 flex items-center justify-center">
                    <div className="h-full w-1 bg-primary-300 pointer-events-none" />
                  </div>
                  <div className="w-7 h-7 absolute -bottom-1 rounded-full bg-primary-300 bg-opacity-40 shadow text-center flex justify-center items-center">
                    <div className="w-4 h-4 bg-primary-300 rounded-full" />
                  </div>
                </div>
                <div className="col-start-3 col-end-12 mt-6">Signing Metadata Transaction</div>
              </div>
              <div className="flex md:contents">
                <div className="col-start-1 col-end-3 mr-10 md:mx-auto relative">
                  <div className="h-full w-4 flex items-center justify-center">
                    <div className="h-full w-1 bg-primary-800 pointer-events-none" />
                  </div>
                </div>
                <div className="col-start-3 col-end-12 mt-6">Sending Transaction to SOlana</div>
              </div>
              <div className="flex md:contents">
                <div className="col-start-1 col-end-3 mr-10 md:mx-auto relative">
                  <div className="h-full w-4 flex items-center justify-center">
                    <div className="h-full w-1 bg-primary-800 pointer-events-none" />
                  </div>
                </div>
                <div className="col-start-3 col-end-12 mt-6">Waiting for Initial Confirmation</div>
              </div>
              <div className="flex md:contents">
                <div className="col-start-1 col-end-3 mr-10 md:mx-auto relative">
                  <div className="h-full w-4 flex items-center justify-center">
                    <div className="h-full w-1 bg-primary-800 pointer-events-none" />
                  </div>
                </div>
                <div className="col-start-3 col-end-12 mt-6">Waiting for Final Confirmation</div>
              </div>
              <div className="flex md:contents">
                <div className="col-start-1 col-end-3 mr-10 md:mx-auto relative">
                  <div className="h-full w-4 flex items-center justify-center">
                    <div className="h-full w-1 bg-primary-800 pointer-events-none" />
                  </div>
                </div>
                <div className="col-start-3 col-end-12 mt-6">Uploading to Arweave</div>
              </div>
              <div className="flex md:contents">
                <div className="col-start-1 col-end-3 mr-10 md:mx-auto relative">
                  <div className="h-full w-4 flex items-center justify-center">
                    <div className="h-full w-1 bg-primary-800 pointer-events-none" />
                  </div>
                </div>
                <div className="col-start-3 col-end-12 mt-6">Updating Metadata</div>
              </div>
              <div className="flex md:contents">
                <div className="col-start-1 col-end-3 mr-10 md:mx-auto relative">
                  <div className="h-full w-4 flex items-center justify-center">
                    <div className="h-full w-1 bg-primary-800 pointer-events-none rounded-br-md rounded-bl-md" />
                  </div>
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
              />
              {currentState === 2 && (
                <>
                  <div className="mt-5 text-primary-800">Title</div>
                  <input
                    type="text"
                    className="bg-primary-800 mt-2 bg-opacity-50 rounded-full outline-none text-white truncate py-3 px-7 w-full"
                    defaultValue=""
                    readOnly
                  />
                  <div className="mt-5 text-primary-800">Symbol:</div>
                  <input
                    type="text"
                    className="bg-primary-800 mt-2 bg-opacity-50 rounded-full outline-none text-white truncate py-3 px-7 w-full"
                    defaultValue=""
                    readOnly
                  />
                  <div className="mt-5 text-primary-800">Description:</div>
                  <textarea
                    className="bg-primary-800 bg-opacity-50 mt-2 rounded-3xl resize-none text-white outline-none py-3 pl-7 h-24 w-full"
                    defaultValue={'Meo meo meo ~'}
                    readOnly
                  />
                  <div className="mt-5 text-primary-800">Attributes:</div>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <input
                      type="text"
                      className="bg-primary-800 bg-opacity-50 rounded-full outline-none text-white truncate py-3 px-7 w-full"
                      defaultValue="e.g. Color"
                      readOnly
                    />
                    <input
                      type="text"
                      className="bg-primary-800 bg-opacity-50 rounded-full outline-none text-white truncate py-3 px-7 w-full"
                      defaultValue="e.g. Purple"
                      readOnly
                    />
                    <input
                      type="text"
                      className="bg-primary-800 bg-opacity-50 rounded-full outline-none text-white truncate py-3 px-7 w-full"
                      defaultValue="e.g. Color"
                      readOnly
                    />
                    <input
                      type="text"
                      className="bg-primary-800 bg-opacity-50 rounded-full outline-none text-white truncate py-3 px-7 w-full"
                      defaultValue="e.g. Purple"
                      readOnly
                    />
                  </div>
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
                className="w-60 h-12 mt-8 text-white rounded-full font-semibold overflow-hidden text-base bg-primary-300 hover:bg-primary-100 transition-all"
                onClick={handleCheckAvailability}
                disabled={chargeLoading}
              >
                {currentState === 1 ? 'Check item availability' : 'Pay to MINT'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MintNFTModal;
