import type { NextPage } from 'next';
import Layout from '../components/shared/Layout';
import { PageTitle } from '../shared/enum';
import LoadingScreen from '../components/shared/LoadingScreen';
import Banner from '../components/shared/Banner';
import FavoriteDescription from '../components/home/FavoriteDescription';
import { useGetGame } from '../hooks';

const Home: NextPage = () => {
  const { loading, gameData } = useGetGame();

  return (
    <Layout title={PageTitle.HomePage}>
      <LoadingScreen loading={loading} />
      <Banner />
      <FavoriteDescription game={gameData} />
    </Layout>
  );
};

export default Home;
