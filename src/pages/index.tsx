import type { NextPage } from 'next';
import Layout from '../components/shared/Layout';
import { PageTitle } from '../shared/enum';
import LoadingScreen from '../components/shared/LoadingScreen';
import Banner from '../components/home/Banner';
import FavoriteDescription from '../components/home/FavoriteDescription';
import { useGlobal } from '../hooks';

const Home: NextPage = () => {
  const { gameData, loading } = useGlobal();

  return (
    <Layout title={PageTitle.HomePage}>
      <LoadingScreen loading={loading} />
      <Banner background={gameData?.backgroundURL} />
      <FavoriteDescription game={gameData} />
    </Layout>
  );
};

export default Home;
