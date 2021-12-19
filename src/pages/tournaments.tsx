import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Layout from '../components/shared/Layout';
import { PageTitle } from '../shared/enum';
import LoadingScreen from '../components/shared/LoadingScreen';
import Banner from '../components/shared/Banner';

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Layout title={PageTitle.HomePage}>
      <LoadingScreen loading={loading} />
      <Banner />
      <div className="text-center h-50v text-white py-9">List tournaments here</div>
    </Layout>
  );
};

export default Home;
