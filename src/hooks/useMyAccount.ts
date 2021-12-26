import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';
import { getUserDetail } from '../api/user';
import { UserDetailResponse } from '../utils/interface';
import { useAuth } from './useAuth';

export const useMyAccount = () => {
  const { connected } = useWallet();
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserDetailResponse>();

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (!connected || (connected && !isAuthenticated)) {
      router.push('/');
    }
  }, [router, connected, isAuthenticated]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const userResponse = await getUserDetail();
      setUser(userResponse);
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };

  return { loading, user };
};
