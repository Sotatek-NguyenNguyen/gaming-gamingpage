import { ENV as ChainID } from '@solana/spl-token-registry';
import { ESolletEnv } from './enum';

export interface ISolletChain {
  name: ESolletEnv;
  endpoint: string;
  chainID: ChainID;
}

export interface LoginResponse {
  accessToken: string;
}

export interface SignatureResponse {
  signatureMsg: string;
}

export interface GameInfoResponse {
  name: string;
  videoIntroURL: string;
  logoURL: string;
  backgroundURL: string;
  description: string;
  gameURL: string;
  tokenCode: string;
  tokenName: string;
  walletAddress: string;
  programId: string;
  gameId: string;
  tokenAddress: string;
  tokenDecimals: number;
}

export interface UserDetailResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  address: string;
  accountInGameId: string;
  balance: number;
}

export interface UserWithdrawResponse {
  success: boolean;
}

export interface UserTransaction {
  id: string;
  createdAt: string;
  updatedAt: string;
  userAddress: string;
  amount: number;
  transactionId: string;
  type: string;
  note?: string;
  referenceId?: string;
  address?: string;
}

export interface UserTransactionsResponse {
  page: number;
  pageSize: number;
  total: number;
  totalPage: number;
  data: UserTransaction[];
}

export interface ITransactionFilter {
  page: number;
  pageSize: number;
  fromDate?: string;
  toDate?: string;
  type?: string;
  transactionId?: string;
}
