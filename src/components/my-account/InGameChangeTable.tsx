import React, { useMemo } from 'react';
import { UserTransactionsResponse } from '../../utils/interface';
import Paginations from '../shared/Paginations';
import moment from 'moment';
import { useWallet } from '@solana/wallet-adapter-react';

interface Props {
  paginatedTransaction: UserTransactionsResponse;
  hasNext: boolean;
  hasPrevious: boolean;
  movePage: (page: number) => Promise<void>;
  nextPage: () => Promise<void>;
  previousPage: () => Promise<void>;
}

const InGameChangeTable: React.FC<Props> = ({
  paginatedTransaction,
  hasNext,
  hasPrevious,
  movePage,
  nextPage,
  previousPage,
}) => {
  const { publicKey } = useWallet();
  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey]);

  const { data, page, /* pageSize, total, */ totalPage } = paginatedTransaction;
  const handleMove = async (page: number) => {
    await movePage(page);
  };

  const handleNext = async () => {
    await nextPage();
  };

  const handlePrevious = async () => {
    await previousPage();
  };

  return (
    <>
      <div className="overflow-hidden rounded-2xl bg-primary-200">
        <table className="w-full table-fixed text-base">
          <thead className={`border-b border-white border-opacity-15 text-white`}>
            <tr className="text-lg text-left">
              <th className="w-1/4 px-5 py-5 text-left font-semibold">Item ID</th>
              <th className="w-1/4 px-5 py-5 font-semibold">Item Name</th>
              <th className="w-1/4 px-5 py-5 font-semibold">Added on</th>
              <th className="w-1/4 px-5 py-5 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="text-primary-800">
            {data && data.length > 0 ? (
              data.map(({ id, gameItemId, userAddress, createdAt }, idx) => (
                <tr
                  key={id}
                  className={`${
                    data.length - 1 !== idx ? 'border-b border-white border-opacity-15' : ''
                  }`}
                >
                  <td className="px-5 py-6 w-full truncate">{gameItemId}</td>
                  <td className="px-5 py-6">
                    <div className="mx-auto w-max">
                      <p className="uppercase font-bold">NFT</p>
                      <p>Happy Bunny</p>
                    </div>
                  </td>
                  <td className="px-5 py-6">
                    {moment(createdAt).local().format('YYYY-MM-DD HH:mm:ss')}
                  </td>
                  <td
                    className={`px-5 py-6 uppercase ${
                      base58 === userAddress ? 'text-tx_status-400' : 'text-tx_status-600'
                    }`}
                  >
                    {base58 === userAddress ? 'minted' : 'minted by other'}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="h-10" />
            )}
          </tbody>
        </table>
      </div>
      <Paginations
        totalPages={totalPage}
        currentPage={page}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
        handleGoNext={handleNext}
        handleGoPrevious={handlePrevious}
        handleGoToPage={handleMove}
      />
    </>
  );
};

export default InGameChangeTable;
