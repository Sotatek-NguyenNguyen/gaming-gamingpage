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

  const statusColor = (status: string) => {
    switch (status) {
      case 'withdrawn':
        return 'text-tx_status-100';
      case 'deposit':
        return 'text-tx_status-200';
      case 'deducted':
        return 'text-tx_status-300';
      case 'granted':
        return 'text-tx_status-400';
      case 'minted':
        return 'text-tx_status-500';
    }
    return '';
  };

  return (
    <>
      <table className="w-full text-white table-fixed">
        <thead className={`border-b-2 border-white border-opacity-50`}>
          <tr className="text-lg">
            <th className="w-1/4 px-5 py-4 md:py-10 text-left">Transaction ID</th>
            <th className="w-1/4 px-4 py-4 md:py-10 md:table-cell text-center">Amount</th>
            <th className="w-1/4 px-4 py-4 md:py-10 md:table-cell">Transaction Note</th>
            <th className="w-1/4 px-4 py-4 md:py-10 text-center">Created on</th>
            <th className="w-1/4 px-4 py-4 md:py-10 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.length > 0 &&
            data.map(({ id, transactionId, amount, createdAt, type, note }) => (
              <tr key={id} className="border-b border-white border-opacity-50 font-normal">
                <td className="px-5 py-6 w-1/4 truncate">{transactionId}</td>
                <td className="px-5 py-6 w-1/4 text-center">{amount}</td>
                <td className="px-5 py-6 w-1/4">{note}</td>
                <td className="px-5 py-6 w-1/4 text-center">
                  {moment(createdAt).local().format('YYYY-MM-DD HH:mm:ss')}
                </td>
                <td className={`px-5 py-6 w-1/4 text-center capitalize ${statusColor(type)}`}>
                  {type}
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
