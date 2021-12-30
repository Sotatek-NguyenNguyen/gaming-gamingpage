import { useState, useEffect } from 'react';
import { getCurrentUserTransactionHistory, getCurrentUserNftItems } from './../api/user';
import queryString from 'query-string';
import { UserTransactionsResponse } from './../utils/interface';

const PAGE_SIZE = 10;

export const useDataTable = () => {
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currPaginated, setCurrPaginated] = useState<UserTransactionsResponse | null>();
  const [tabActive, setTabActive] = useState<string>('');

  useEffect(() => {
    const parsed = queryString.parse(location.search);
    if (parsed && parsed.section) {
      setTabActive(parsed.section.toString());
    } else {
      setTabActive('');
    }
  }, [location.search]);

  useEffect(() => {
    if (currPaginated) {
      setHasNext(() => {
        return currPaginated.page < currPaginated.totalPage - 1;
      });
      setHasPrevious(() => {
        return currPaginated.page > 1;
      });
      if (currPaginated.page === 1) {
        const interval = setInterval(
          () => getDataBySection({ page: 1, pageSize: PAGE_SIZE }, true),
          10000,
        );
        return () => {
          clearInterval(interval);
        };
      }
    }
  }, [currPaginated]);

  useEffect(() => {
    const init = async () => {
      await getDataBySection({ page: 1, pageSize: PAGE_SIZE });
    };
    init();
  }, [tabActive]);

  const movePage = async (page: number): Promise<void> => {
    getDataBySection({ page, pageSize: PAGE_SIZE });
  };

  const nextPage = async (): Promise<void> => {
    if (currPaginated && hasNext) {
      getDataBySection({ page: currPaginated.page + 1, pageSize: PAGE_SIZE });
    }
  };

  const previousPage = async (): Promise<void> => {
    if (currPaginated && hasNext) {
      getDataBySection({ page: currPaginated.page - 1, pageSize: PAGE_SIZE });
    }
  };

  const getDataBySection = async (params: object, hideLoading?: boolean): Promise<void> => {
    // const condition: ITransactionFilter | undefined = {};
    /* if (params.section) {
      condition.section = params.section;
    }
    if (params.walletPublicKey) {
      condition.walletAddress = params.walletPublicKey;
    } */

    if (!hideLoading) setLoading(true);
    try {
      const serverResponseData = tabActive
        ? await getCurrentUserNftItems({
            params,
          })
        : await getCurrentUserTransactionHistory({
            params,
          });

      setCurrPaginated(serverResponseData);
    } catch (err) {
      setCurrPaginated(null);
    } finally {
      if (!hideLoading) setLoading(false);
    }
  };

  return {
    tabActive,
    hasNext,
    hasPrevious,
    loading,
    currPaginated,
    movePage,
    nextPage,
    previousPage,
  };
};
