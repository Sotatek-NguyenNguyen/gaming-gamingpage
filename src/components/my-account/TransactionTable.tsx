import React from 'react';
import { UserTransactionsResponse } from './../../utils/interface';
import Paginations from '../shared/Paginations';
import moment from 'moment';

interface Props {
  paginatedTransaction: UserTransactionsResponse;
  hasNext: boolean;
  hasPrevious: boolean;
  movePage: (page: number) => Promise<void>;
  nextPage: () => Promise<void>;
  previousPage: () => Promise<void>;
}

const TransactionTable: React.FC<Props> = ({
  paginatedTransaction,
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
            <th className="w-1/4 px-5 py-4 md:py-10 md:w-1/2 text-left">Transaction ID</th>
            <th className="w-1/4 px-4 py-4 md:py-10 md:table-cell text-center">Deposit Amount</th>
            <th className="w-1/4 px-4 py-4 md:py-10 md:w-1/4 text-center">Created on</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.length > 0 &&
            data.map(({ id, transactionId, amount, createdAt }) => (
              <tr key={id} className="border-b border-white border-opacity-50 font-normal">
                <td className="px-5 py-6 w-1/4 md:w-1/2 truncate">{transactionId}</td>
                <td className="px-5 py-6 w-1/4 text-center">{amount}</td>
                <td className="px-5 py-6 w-1/4 text-center">
                  {moment(createdAt).local().format('YYYY-MM-DD HH:mm:ss')}
                </td>
              </tr>
            ))}
          <tr className="h-6" />
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
