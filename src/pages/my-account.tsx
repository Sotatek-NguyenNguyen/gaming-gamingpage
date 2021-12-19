import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import Layout from '../components/shared/Layout';
import { PageTitle } from '../shared/enum';
import Banner from '../components/shared/Banner';
import LoadingScreen from '../components/shared/LoadingScreen';
import Detail from '../components/my-account/Detail';
import { useRouter } from 'next/router';

const MyAccount: NextPage = () => {
  const { connected } = useWallet();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!connected) {
      router.push('/');
    }
  }, [router, connected]);

  return (
    <Layout title={PageTitle.MyAccountPage}>
      <LoadingScreen loading={loading} />
      <Banner title="MY ACCOUNT" background={2} />
      <Detail />
    </Layout>
  );
};

export default MyAccount;
