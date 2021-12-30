import React, { FC } from 'react';
import Spinner from '../shared/Spinner';
import { useDataTable } from '../../hooks';
import TransactionTable from './TransactionTable';
import InGameChangeTable from './InGameChangeTable';

const TransactionsTable: FC = ({}) => {
  const {
    tabActive,
    hasNext,
    hasPrevious,
    loading,
    currPaginated,
    movePage,
    nextPage,
    previousPage,
  } = useDataTable();

  return (
    <div className="relative w-full mt-7">
      {loading && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black bg-opacity-30">
          <Spinner variant="alt" size="medium" />
        </div>
      )}
      {currPaginated ? (
        tabActive ? (
          <InGameChangeTable
            paginatedTransaction={currPaginated}
            hasNext={hasNext}
            hasPrevious={hasPrevious}
            movePage={movePage}
            nextPage={nextPage}
            previousPage={previousPage}
          />
        ) : (
          <TransactionTable
            paginatedTransaction={currPaginated}
            hasNext={hasNext}
            hasPrevious={hasPrevious}
            movePage={movePage}
            nextPage={nextPage}
            previousPage={previousPage}
          />
        )
      ) : null}
    </div>
  );
};

export default TransactionsTable;
