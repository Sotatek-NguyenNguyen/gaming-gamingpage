import React from 'react';
import { UserTransaction, UserTransactionsResponse } from './../../utils/interface';
import Paginations from '../shared/Paginations';

interface Props {
  paginatedTransaction: UserTransactionsResponse;
  loading: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  movePage: (page: number) => Promise<void>;
  nextPage: () => Promise<void>;
  previousPage: () => Promise<void>;
}

const TransactionTable: React.FC<Props> = ({
  paginatedTransaction,
  loading,
  hasNext,
  hasPrevious,
  movePage,
  nextPage,
  previousPage,
}) => {
  const { data, page, pageSize, total, totalPage } = paginatedTransaction;
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
            <th className="w-1/4 px-5 py-10 md:w-1/2 text-left">Transaction ID</th>
            <th className="hidden w-1/4 md:w-1/4 px-4 py-10 md:table-cell text-center">
              Deposit Amount
            </th>
            <th className="w-1/4 px-4 py-10 md:w-1/4 text-center">Created on</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.length > 0 &&
            data.map(({ id, transactionId, amount, createdAt }) => (
              <tr key={id} className="border-b border-white border-opacity-50 font-normal">
                <td className="px-5 py-6 w-full truncate">{transactionId}</td>
                <td className="px-5 py-6 text-center">{amount}</td>
                <td className="px-5 py-6 text-center">{createdAt}</td>
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

export default TransactionTable;
