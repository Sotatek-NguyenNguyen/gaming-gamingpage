import { createContext, useEffect, useState } from 'react';
import { Cluster, PublicKey } from '@solana/web3.js';
import { useConnection, useLocalStorageState } from '../hooks';
import { formatNumber, transformLamportsToSOL } from '../shared/helper';
import {
  // isTokenOwnedByAddress,
  verifyAndDecode,
  /* createTokenWithSignMessageFunc,
  createTokenWithWalletAdapter, */
} from '@gamify/onchain-program-sdk';
import { useWallet } from '@solana/wallet-adapter-react';
import * as bs58 from 'bs58';
import { signatureMsgAuth, loginAuth } from '../api/auth';

interface AuthState {
  isAuthenticated: boolean;
  cluster: Cluster;
  balance: {
    value: number;
    formatted: string;
  };
  login: (...args: any[]) => Promise<void>;
  logout: () => void;
  changeCluster: (cluster: Cluster) => void;
}

const defaultState: AuthState = {
  isAuthenticated: false,
  cluster: 'devnet',
  balance: {
    value: 0,
    formatted: '0',
  },
  // tslint:disable-next-line:no-empty
  login: async () => {},
  // tslint:disable-next-line:no-empty
  logout: () => {},
  // tslint:disable-next-line:no-empty
  changeCluster: () => {},
};

interface IPayloadWithSignature {
  address: string;
  signature: string;
}

const AuthContext = createContext<AuthState>(defaultState);

export const AuthProvider: React.FC = ({ children }) => {
  const { wallet, publicKey: walletPublicKey } = useWallet();
  const [publicKey, setPublicKey] = useLocalStorageState('public_key');
  const [accessToken, setAccessToken] = useLocalStorageState('access_token');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return false;
  });

  const [balance, setBalance] = useState<{
    value: number;
    formatted: string;
  }>({
    value: 0,
    formatted: '0',
  });
  const { connection } = useConnection();
  const [cluster, setCluster] = useState<Cluster>('devnet');

  const decodeToken = (token: string): IPayloadWithSignature => {
    return JSON.parse(bs58.decode(token).toString()) as IPayloadWithSignature;
  };

  const isTokenOwnedByAddress = (token: string, address: PublicKey) => {
    try {
      const payloadWithSig = decodeToken(token);
      return payloadWithSig.address === address.toString();
    } catch (error) {
      console.log('isTokenOwnedByAddress: error', error);
      return false;
    }
  };

  useEffect(() => {
    const getAuthenStatus = () => {
      if (!walletPublicKey || !publicKey || !accessToken) {
        return false;
      }

      if (walletPublicKey?.toString() !== publicKey) {
        return false;
      }

      if (!isTokenOwnedByAddress(accessToken, publicKey)) {
        return false;
      }

      const result = verifyAndDecode(accessToken);
      if (!result.isValid || result.isExpired) {
        return false;
      }

      return true;
    };
    setIsAuthenticated(getAuthenStatus());
  }, [wallet, walletPublicKey]);

  useEffect(() => {
    if (publicKey) {
      connection
        .getAccountInfo(new PublicKey(publicKey))
        .then((response: any) => {
          const balanceResult = transformLamportsToSOL(response?.lamports!);
          setBalance({
            value: balanceResult,
            formatted: formatNumber.format(balanceResult) as string,
          });
        })
        .catch((err: any) => console.error(err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey]);

  const changeCluster = (newCluster: Cluster): void => {
    setCluster(newCluster);
  };

  /* const createPayload = (address: PublicKey) => {
    const now = new Date().getTime();
    return {
      address: address.toString(),
      iat: now,
      exp: now + 24 * 60 * 60 * 1000,
    };
  }; */

  const login = async (
    walletAddress: PublicKey,
    signMessage?: (message: Uint8Array) => Promise<Uint8Array>,
    adapter?: any,
  ): Promise<void> => {
    try {
      let token;
      if (signMessage) {
        /* token = await createTokenWithSignMessageFunc(signMessage!, walletAddress); */
        // const payload = createPayload(walletAddress);

        const signatureMsg = await signatureMsgAuth({ address: walletAddress.toString() });
        const encodedMessage = new TextEncoder().encode(signatureMsg?.signatureMsg);
        const signature = await signMessage(encodedMessage);
        const tokenResponse = await loginAuth({
          address: walletAddress.toString(),
          signature: Buffer.from(signature),
        });
        token = tokenResponse.accessToken;
      } else {
        /* token = await createTokenWithWalletAdapter(adapter._wallet); */
        const signatureMsg = await signatureMsgAuth({ address: walletAddress.toString() });
        const encodedMessage = new TextEncoder().encode(signatureMsg?.signatureMsg);
        const { signature } = await adapter._wallet.sign(Buffer.from(encodedMessage), 'object');
        const tokenResponse = await loginAuth({
          address: walletAddress.toString(),
          signature: Buffer.from(signature),
        });
        token = tokenResponse.accessToken;
      }
      if (token) {
        setIsAuthenticated(true);
        setPublicKey(walletAddress.toString());
        setAccessToken(token);
      }
    } catch (e) {
      setIsAuthenticated(false);
      setPublicKey(null);
      throw new Error('Can not login, please try again');
    }
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setPublicKey(null);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        cluster,
        balance,
        login,
        logout,
        changeCluster,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
