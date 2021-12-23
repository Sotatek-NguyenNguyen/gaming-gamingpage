import { useEffect, useState } from 'react';
import { getGameInfo, GameInfoResponse } from '../api/game';

export const useGetGame = () => {
  const [loading, setLoading] = useState(false);
  const [gameData, setGameData] = useState<GameInfoResponse>();

  const fetchData = async () => {
    try {
      setLoading(true);
      const gameResponse = await getGameInfo();
      setGameData(gameResponse);
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, gameData };
};
