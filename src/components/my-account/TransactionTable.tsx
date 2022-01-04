import React from 'react';
import { UserTransactionsResponse } from './../../utils/interface';
import Paginations from '../shared/Paginations';
import moment from 'moment';

interface Props {
  paginatedTransaction?: UserTransactionsResponse | null;
  hasNext: boolean;
  hasPrevious: boolean;
  movePage: (page: number) => Promise<void>;
  nextPage: () => Promise<void>;
  previousPage: () => Promise<void>;
  verifiedInGameAccount: boolean;
}

const TransactionTable: React.FC<Props> = ({
  paginatedTransaction,
  hasNext,
  hasPrevious,
  movePage,
  nextPage,
  previousPage,
  verifiedInGameAccount,
}) => {
  const { data, page, /* pageSize, total, */ totalPage } = paginatedTransaction || {};
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
        return 'bg-tx_status-100';
      case 'deposit':
        return 'bg-tx_status-200';
      case 'deducted':
      case 'admin_deduct':
        return 'bg-tx_status-300';
      case 'granted':
      case 'admin_grant':
        return 'bg-tx_status-400';
      case 'minted':
        return 'bg-tx_status-500';
      case 'failed':
        return 'bg-white';
    }
    return '';
  };

  const statusText = (status: string) => {
    switch (status) {
      case 'admin_deduct':
        return 'Deducted';

      case 'admin_grant':
        return 'Granted';

      default:
        return status;
    }
  };

  return (
    <>
      <div className="overflow-hidden rounded-2xl bg-primary-200">
        <table className="w-full table-fixed text-base">
          <thead className={`border-b border-white border-opacity-15 text-white`}>
            <tr className="text-lg text-left">
              <th className="w-1/4 px-5 py-5 font-semibold">Deposit Address</th>
              <th className="w-1/6 px-4 pl-6 py-5 font-semibold">Amount</th>
              <th className="w-1/5 px-4 py-5 font-semibold">Transaction Note</th>
              <th className="w-1/5 px-4 py-5 font-semibold">Created on</th>
              <th className="w-1/6 px-4 py-5 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="text-primary-800">
            {!verifiedInGameAccount ? (
              <tr>
                <td className="py-10 text-base text-white text-center" colSpan={6}>
                  Wallet verification is required to view associated transaction history
                </td>
              </tr>
            ) : data && data.length > 0 ? (
              data.map(({ id, transactionId, amount, createdAt, type, note }, idx) => (
                <tr
                  key={id}
                  className={`${
                    data.length - 1 !== idx ? 'border-b border-white border-opacity-15' : ''
                  }`}
                >
                  <td className="px-5 py-6 w-1/4 truncate">{transactionId}</td>
                  <td className="px-5 pl-6 py-6 w-1/6">{amount}</td>
                  <td className="px-5 py-6 w-1/5 truncate">{note}</td>
                  <td className="px-5 py-6 w-1/5">
                    {moment(createdAt).local().format('YYYY-MM-DD HH:mm:ss')}
                  </td>
                  <td className={`px-5 py-6 w-1/6 capitalize`}>
                    <span
                      className={`text-white py-2 px-4 rounded-full font-semibold text-base ${statusColor(
                        type,
                      )}`}
                    >
                      {statusText(type)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="h-10" />
            )}
          </tbody>
        </table>
      </div>
      {verifiedInGameAccount && (
        <Paginations
          totalPages={totalPage}
          currentPage={page}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
          handleGoNext={handleNext}
          handleGoPrevious={handlePrevious}
          handleGoToPage={handleMove}
        />
      )}
    </>
  );
};

export default TransactionTable;
