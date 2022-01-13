import { createContext, useEffect, useState } from 'react';
import { Cluster, PublicKey } from '@solana/web3.js';
import { useConnection, useLocalStorageState, useGlobal } from '../hooks';
import { formatNumber, transformLamportsToSOL } from '../shared/helper';
import { renderTokenBalance } from '../utils/helper';
import { useWallet } from '@solana/wallet-adapter-react';
import * as bs58 from 'bs58';
import { signatureMsgAuth, loginAuth } from '../api/auth';
import { envConfig } from '../configs';
import { Token, ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';

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

const { SOLLET_ENV } = envConfig;

const defaultState: AuthState = {
  isAuthenticated: false,
  cluster: SOLLET_ENV,
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

export const expiredTime = 600; // 10 min

const AuthContext = createContext<AuthState>(defaultState);

export const AuthProvider: React.FC = ({ children }) => {
  const { wallet, publicKey: walletPublicKey } = useWallet();
  const { gameData } = useGlobal();
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
  const [cluster, setCluster] = useState<Cluster>(SOLLET_ENV);

  const decodeToken = (token: string): IPayloadWithSignature => {
    return JSON.parse(bs58.decode(token).toString()) as IPayloadWithSignature;
  };

  useEffect(() => {
    const getAuthenStatus = () => {
      if (!walletPublicKey || !publicKey || !accessToken) {
        return false;
      }

      if (walletPublicKey?.toString() !== publicKey) {
        return false;
      }

      return true;
    };
    setIsAuthenticated(getAuthenStatus());
  }, [wallet, walletPublicKey]);

  const getAccountTokenInfo = async () => {
    if (gameData?.tokenAddress && walletPublicKey) {
      try {
        const tokenAccount = await Token.getAssociatedTokenAddress(
          ASSOCIATED_TOKEN_PROGRAM_ID,
          TOKEN_PROGRAM_ID,
          new PublicKey(gameData.tokenAddress),
          walletPublicKey,
        );
        console.log(
          ASSOCIATED_TOKEN_PROGRAM_ID,
          TOKEN_PROGRAM_ID,
          new PublicKey(gameData.tokenAddress),
          walletPublicKey,
          tokenAccount,
        );
        const tokenAccountBalance = await connection.getTokenAccountBalance(tokenAccount);
        if (tokenAccountBalance && tokenAccountBalance.value) {
          const balanceResult = renderTokenBalance(tokenAccountBalance.value.uiAmount, 2);

          setBalance({
            value: balanceResult,
            formatted: formatNumber.format(balanceResult) as string,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (walletPublicKey) {
      getAccountTokenInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletPublicKey]);

  const changeCluster = (newCluster: Cluster): void => {
    setCluster(newCluster);
  };

  const login = async (
    walletAddress: PublicKey,
    signMessage?: (message: Uint8Array) => Promise<Uint8Array>,
    adapter?: any,
  ): Promise<void> => {
    try {
      let token;
      if (signMessage) {
        /* token = await createTokenWithSignMessageFunc(signMessage!, walletAddress); */

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
