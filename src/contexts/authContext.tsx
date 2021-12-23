import { createContext, useEffect, useState } from 'react';
import { Cluster, PublicKey } from '@solana/web3.js';
import { useConnection, useLocalStorageState } from '../hooks';
import { formatNumber, transformLamportsToSOL } from '../shared/helper';
import {
  isTokenOwnedByAddress,
  verifyAndDecode,
  /* createTokenWithSignMessageFunc,
  createTokenWithWalletAdapter, */
} from '@gamify/onchain-program-sdk';
import { useWallet } from '@solana/wallet-adapter-react';
import Wallet from '@project-serum/sol-wallet-adapter';
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

  const login = async (
    walletAddress: PublicKey,
    signMessage?: (message: Uint8Array) => Promise<Uint8Array>,
    adapter?: any,
    wallet?: any,
  ): Promise<void> => {
    try {
      let token;
      if (signMessage) {
        /* token = await createTokenWithSignMessageFunc(signMessage!, walletAddress); */
        if (wallet && wallet.name === 'Phantom') {
          const signatureMsg = await signatureMsgAuth({ address: walletAddress.toString() });
          const encodedMessage = new TextEncoder().encode(signatureMsg?.signatureMsg);
          const signedMessage = await window.solana.signMessage(encodedMessage, 'utf8');

          const tokenResponse = await loginAuth({
            address: walletAddress.toString(),
            signature: signedMessage.signature,
          });
          token = tokenResponse.accessToken;
        } else {
          const providerUrl = 'https://www.sollet.io';
          const wallet = new Wallet(providerUrl);
          wallet.on('connect', (publicKey) => console.log('Connected to ' + publicKey.toBase58()));
          wallet.on('disconnect', () => console.log('Disconnected'));
          await wallet.connect();

          const signatureMsg = await signatureMsgAuth({ address: walletAddress.toString() });
          const data = new TextEncoder().encode(signatureMsg.signatureMsg);
          const { signature } = await wallet.sign(data, 'utf8');
          const tokenResponse = await loginAuth({
            address: walletAddress.toString(),
            signature,
          });
          token = tokenResponse.accessToken;
        }
      } else {
        /* token = await createTokenWithWalletAdapter(adapter._wallet); */
      }
      setIsAuthenticated(true);
      setPublicKey(walletAddress.toString());
      setAccessToken(token);
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
