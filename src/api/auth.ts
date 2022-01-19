import axios from './axios-adapter';
import { LoginResponse, SignatureResponse } from '../utils/interface';

export const loginAuth = (params: Record<string, unknown>): Promise<LoginResponse> => {
  return axios.post('auth/login', params);
};

export const signatureMsgAuth = (params: Record<string, unknown>): Promise<SignatureResponse> => {
  return axios.post('auth/signature-msg', params);
};
