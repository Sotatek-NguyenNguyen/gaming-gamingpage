import Decimal from 'decimal.js';
import moment from 'moment';
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
// import { ClockLayout } from '../sdk/layout';
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
  setLoading: Dispatch<SetStateAction<boolean>>;
  setAccountBalance: (balance: number | 0) => void;
  gameData: GameInfoResponse;
}

const GlobalContext = createContext<GlobalState>({
  now: 0,
  balance: {
    value: null,
    formatted: null,
  },
  loading: false,
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
    tokenDecimals: 6,
  },
});

export const GlobalProvider: React.FC = ({ children }) => {
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
    tokenDecimals: 6,
  });

  useEffect(() => {
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

  const setAccountBalance = (accBalance: number | 0) => {
    // const balanceResult = transformLamportsToSOL(accBalance || 0);

    setBalance({
      value: accBalance,
      formatted: formatNumber.format(accBalance) as string,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        now,
        balance,
        loading,
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
