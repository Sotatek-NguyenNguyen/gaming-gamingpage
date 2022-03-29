import axios from './axios-adapter';
import {
  UserDetailResponse,
  UserWithdrawResponse,
  UserTransactionsResponse,
  UserMintNFTArweaveUploadResponse,
  OTPResponse,
} from '../utils/interface';

export const getUserDetail = (): Promise<UserDetailResponse> => {
  return axios.get('my');
};

export const userWithdrawAction = (
  params: Record<string, unknown>,
): Promise<UserWithdrawResponse> => {
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

export const userMintNFTArweaveUploadAction = (
  params: Record<string, unknown>,
): Promise<UserMintNFTArweaveUploadResponse> => {
  return axios.post('my/nft/mint/arweave-upload', params);
};

export const userMintNFTAction = (
  params: Record<string, unknown>,
): Promise<UserWithdrawResponse> => {
  return axios.post('my/nft/mint', params);
};

export const getOTPAction = (params: Record<string, unknown>): Promise<OTPResponse> => {
  return axios.post('my/requestOTP', params);
};
