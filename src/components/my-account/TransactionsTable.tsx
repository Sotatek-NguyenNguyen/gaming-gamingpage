import React, { FC } from 'react';
import Spinner from '../shared/Spinner';
import { useDataTable } from '../../hooks';
import TransactionTable from './TransactionTable';
import AssetsTable from './AssetsTable';

interface Props {
  verifiedInGameAccount: boolean;
}

const TransactionsTable: FC<Props> = ({ verifiedInGameAccount }) => {
  const {
    tabActive,
    hasNext,
    hasPrevious,
    loading,
    currPaginated,
    movePage,
    nextPage,
    previousPage,
  } = useDataTable(verifiedInGameAccount);

  return (
    <div className="relative w-full mt-7">
      {loading && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black bg-opacity-30">
          <Spinner variant="alt" size="medium" />
        </div>
      )}
      {tabActive ? (
        <AssetsTable
          paginatedTransaction={currPaginated}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
          movePage={movePage}
          nextPage={nextPage}
          previousPage={previousPage}
          verifiedInGameAccount={verifiedInGameAccount}
        />
      ) : (
        <TransactionTable
          paginatedTransaction={currPaginated}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
          movePage={movePage}
          nextPage={nextPage}
          previousPage={previousPage}
          verifiedInGameAccount={verifiedInGameAccount}
        />
      )}
    </div>
  );
};

export default TransactionsTable;
