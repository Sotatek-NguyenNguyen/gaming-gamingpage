import type { NextPage } from 'next';
import { useState } from 'react';
import Layout from '../components/shared/Layout';
import { PageTitle } from '../shared/enum';
import LoadingScreen from '../components/shared/LoadingScreen';
import Banner from '../components/shared/Banner';
import FavoriteDescription from '../components/home/FavoriteDescription';

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);

  /* useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []); */

  return (
    <Layout title={PageTitle.HomePage}>
      <LoadingScreen loading={loading} />
      <Banner />
      <FavoriteDescription />
    </Layout>
  );
};

export default Home;
