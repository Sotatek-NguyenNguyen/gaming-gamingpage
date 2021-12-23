import axios from './axios-adapter';
import { UserDetailResponse, UserWithdrawResponse } from '../utils/interface';

export const getUserDetail = (): Promise<UserDetailResponse> => {
  return axios.get('my');
};

export const userWithdraw = (params: Record<string, unknown>): Promise<UserWithdrawResponse> => {
  return axios.post('my/withdrawals', params);
};
