import axios from './axios-adapter';
import { GameInfoResponse } from '../utils/interface';

export const getGameInfo = (): Promise<GameInfoResponse> => {
  return axios.get('game-info');
};
