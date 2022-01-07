import React from 'react';
import { UserTransactionsResponse } from '../../utils/interface';
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

const AssetsTable: React.FC<Props> = ({
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
      case 'Minted':
        return 'bg-tx_status-100';
      case 'MetadataUploading':
        return 'bg-tx_status-200';
      case 'Minting':
        return 'bg-tx_status-500';
    }
    return '';
  };

  const statusText = (status: string) => {
    switch (status) {
      case 'MetadataUploading':
        return 'Metadata Uploading';

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
              <th className="w-1/4 px-5 py-5 text-left font-semibold">Item ID</th>
              <th className="w-1/4 px-5 py-5 font-semibold">Item Name</th>
              <th className="w-1/4 px-5 py-5 font-semibold">Added on</th>
              <th className="w-1/4 px-5 py-5 font-semibold">Status</th>
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
              data.map(({ id, gameItemId, createdAt, status, gameItemName }, idx) => (
                <tr
                  key={id}
                  className={`${
                    data.length - 1 !== idx ? 'border-b border-white border-opacity-15' : ''
                  }`}
                >
                  <td className="px-5 py-6 w-full truncate">{gameItemId}</td>
                  <td className="px-5 py-6">
                    {gameItemName && (
                      <div className="w-max">
                        <p className="uppercase font-bold">NFT</p>
                        <p>{gameItemName}</p>
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-6">
                    {moment(createdAt).local().format('YYYY-MM-DD HH:mm:ss')}
                  </td>
                  <td className={`px-5 py-6 capitalize`}>
                    {status && (
                      <span
                        className={`text-white py-2 px-4 rounded-full font-semibold text-base ${statusColor(
                          status,
                        )}`}
                      >
                        {statusText(status)}
                      </span>
                    )}
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

export default AssetsTable;
