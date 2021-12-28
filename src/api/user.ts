import axios from './axios-adapter';
import {
  UserDetailResponse,
  UserWithdrawResponse,
  UserTransactionsResponse,
} from '../utils/interface';

export const getUserDetail = (): Promise<UserDetailResponse> => {
  return axios.get('my');
};

export const userWithdraw = (params: Record<string, unknown>): Promise<UserWithdrawResponse> => {
  return axios.post('my/withdrawals', params);
};

export const getCurrentUserTransactionHistory = (
  params: Record<string, unknown>,
): Promise<UserTransactionsResponse> => {
  return axios.get('my/transactions', params);
};

export const getCurrentUserInGameBalanceChangeHistory = (
  params: Record<string, unknown>,
): Promise<UserTransactionsResponse> => {
  return axios.get('my/in-game-balances-changes', params);
};

export const getCurrentUserNftItems = (
  params: Record<string, unknown>,
): Promise<UserTransactionsResponse> => {
  return axios.get('my/nft', params);
};
