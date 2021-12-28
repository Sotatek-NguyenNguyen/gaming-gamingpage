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
      <table className="w-full text-white table-fixed">
        <thead className={`border-b-2 border-white border-opacity-50`}>
          <tr className="text-lg">
            <th className="w-1/4 px-5 py-4 md:py-10 text-left">Item ID</th>
            <th className="w-1/4 px-4 py-4 md:py-10 md:table-cell text-center">Item Name</th>
            <th className="w-1/4 px-4 py-4 md:py-10 text-center">Added on</th>
            <th className="w-1/4 px-4 py-4 md:py-10 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.length > 0 &&
            data.map(({ id, userAddress, createdAt }) => (
              <tr key={id} className="border-b border-white border-opacity-50 font-normal">
                <td className="px-5 py-4 md:py-6 w-full truncate">{userAddress}</td>
                <td className="px-5 py-4 md:py-6 text-center">
                  <div className="mx-auto text-left w-max">
                    <p className="uppercase font-bold">NFT</p>
                    <p>Happy Bunny</p>
                  </div>
                </td>
                <td className="px-5 py-4 md:py-6 text-center">
                  {moment(createdAt).local().format('YYYY-MM-DD HH:mm:ss')}
                </td>
                <td
                  className={`px-5 py-4 md:py-6 text-center uppercase ${
                    base58 === userAddress ? 'text-tx_status-400' : 'text-tx_status-600'
                  }`}
                >
                  {base58 === userAddress ? 'minted' : 'minted by other'}
                </td>
              </tr>
            ))}
          <tr className="h-20" />
        </tbody>
      </table>
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
