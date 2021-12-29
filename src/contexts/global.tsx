import { clockSysvarAccount } from '@gamify/onchain-program-sdk';
import { u64 } from '@solana/spl-token';
import { useConnection } from '@solana/wallet-adapter-react';
import Decimal from 'decimal.js';
import moment from 'moment';
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ClockLayout } from '../sdk/layout';
import { formatNumber, transformLamportsToSOL } from '../utils/helper';
import { getGameInfo } from '../api/game';
import { GameInfoResponse } from '../utils/interface';

interface GlobalState {
  now: number;
  balance: {
    value: number | null;
    formatted: string | null;
  };
  loading: boolean;
  isInitTimestamp: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setAccountBalance: (balance: number | null) => void;
  gameData: GameInfoResponse;
}

const GlobalContext = createContext<GlobalState>({
  now: 0,
  balance: {
    value: null,
    formatted: null,
  },
  loading: false,
  isInitTimestamp: false,
  // tslint:disable-next-line:no-empty
  setLoading: () => {},
  // tslint:disable-next-line:no-empty
  setAccountBalance: () => {},
  gameData: {
    name: '',
    videoIntroURL: '',
    logoURL: '',
    backgroundURL: '',
    description: '',
    gameURL: '',
    tokenCode: '',
    tokenName: '',
    walletAddress: '',
    programId: '',
    gameId: '',
    tokenAddress: '',
  },
});

export const GlobalProvider: React.FC = ({ children }) => {
  const { connection } = useConnection();
  const [loading, setLoading] = useState(false);
  const [now, setNow] = useState(() => {
    return new Decimal(moment().unix()).times(1000).toNumber();
  });
  const [balance, setBalance] = useState<{
    value: number | null;
    formatted: string | null;
  }>({
    value: null,
    formatted: null,
  });
  const [isInitTimestamp, setIsInitTimestamp] = useState(false);
  const [gameData, setGameData] = useState<GameInfoResponse>({
    name: '',
    videoIntroURL: '',
    logoURL: '',
    backgroundURL: '',
    description: '',
    gameURL: '',
    tokenCode: '',
    tokenName: '',
    walletAddress: '',
    programId: '',
    gameId: '',
    tokenAddress: '',
  });

  useEffect(() => {
    const fetchNow = () => {
      connection
        .getAccountInfo(clockSysvarAccount)
        .then((result) => {
          const decoded = ClockLayout.decode(result?.data);
          const unixTimestamp = u64.fromBuffer(decoded.unix_timestamp).toString();

          setNow(new Decimal(unixTimestamp).toNumber());
        })
        .finally(() => {
          setIsInitTimestamp(true);
        });
    };

    const fetchGameData = async () => {
      try {
        setLoading(true);
        const gameResponse = await getGameInfo();
        setGameData(gameResponse);
      } catch (error) {
        setLoading(false);
      }
      setLoading(false);
    };

    fetchGameData();
    // fetchNow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const setAccountBalance = (accBalance: number | null) => {
    const balanceResult = transformLamportsToSOL(accBalance || 0);

    setBalance({
      value: balanceResult,
      formatted: formatNumber.format(balanceResult) as string,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        now,
        balance,
        loading,
        isInitTimestamp,
        setLoading,
        setAccountBalance,
        gameData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
