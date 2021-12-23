import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';
import { getUserDetail } from '../api/user';
import { UserDetailResponse } from '../utils/interface';

export const useMyAccount = () => {
  const { connected } = useWallet();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserDetailResponse>();

  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!connected) {
      router.push('/');
    }
  }, [router, connected]);

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
