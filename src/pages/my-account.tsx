import { NextPage } from 'next';
import Layout from '../components/shared/Layout';
import { PageTitle } from '../shared/enum';
import Banner from '../components/my-account/Banner';
import LoadingScreen from '../components/shared/LoadingScreen';
import Detail from '../components/my-account/Detail';
import { useMyAccount } from '../hooks/useMyAccount';

const MyAccount: NextPage = () => {
  const { loading, user } = useMyAccount();

  return (
    <Layout title={PageTitle.MyAccountPage}>
      <LoadingScreen loading={loading} />
      <Banner />
      <Detail user={user} loading={loading} />
    </Layout>
  );
};

export default MyAccount;
