import { useState, useEffect } from 'react';
import {
  getCurrentUserTransactionHistory,
  getCurrentUserInGameBalanceChangeHistory,
} from './../api/user';
import { ITransactionFilter, UserTransactionsResponse } from './../utils/interface';

const PAGE_SIZE = 7;

export const useDataTable = () => {
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currPaginated, setCurrPaginated] = useState<UserTransactionsResponse | null>();

  useEffect(() => {
    if (currPaginated) {
      setHasNext(() => {
        return currPaginated.page < currPaginated.totalPage - 1;
      });
      setHasPrevious(() => {
        return currPaginated.page > 1;
      });
    }
  }, [currPaginated]);

  useEffect(() => {
    const init = async () => {
      await getDataBySection({ type: '' });
    };
    init();
  }, []);

  const movePage = async (page: number): Promise<void> => {
    setLoading(true);

    try {
      const serverResponseData = await getCurrentUserTransactionHistory({
        params: { page, pageSize: PAGE_SIZE },
      });
      setCurrPaginated(serverResponseData);
    } catch (err) {
      setCurrPaginated(null);
    } finally {
      setLoading(false);
    }
  };

  const nextPage = async (): Promise<void> => {
    if (currPaginated && hasNext) {
      setLoading(true);
      try {
        const serverResponseData = await getCurrentUserTransactionHistory({
          params: { page: currPaginated.page + 1, pageSize: PAGE_SIZE },
        });
        setCurrPaginated(serverResponseData);
      } catch (err) {
        setCurrPaginated(null);
      } finally {
        setLoading(false);
      }
    }
  };

  const previousPage = async (): Promise<void> => {
    if (currPaginated && hasNext) {
      setLoading(true);
      try {
        const serverResponseData = await getCurrentUserTransactionHistory({
          params: { page: currPaginated.page - 1, pageSize: PAGE_SIZE },
        });
        setCurrPaginated(serverResponseData);
      } catch (err) {
        setCurrPaginated(null);
      } finally {
        setLoading(false);
      }
    }
  };

  const getDataBySection = async (params: { type?: string }): Promise<void> => {
    // const condition: ITransactionFilter | undefined = {};
    /* if (params.section) {
      condition.section = params.section;
    }
    if (params.walletPublicKey) {
      condition.walletAddress = params.walletPublicKey;
    } */

    setLoading(true);
    try {
      const serverResponseData = await getCurrentUserTransactionHistory({
        params: { page: 1, pageSize: PAGE_SIZE },
      });

      setCurrPaginated(serverResponseData);
    } catch (err) {
      setCurrPaginated(null);
    } finally {
      setLoading(false);
    }
  };

  return { hasNext, hasPrevious, loading, currPaginated, movePage, nextPage, previousPage };
};
