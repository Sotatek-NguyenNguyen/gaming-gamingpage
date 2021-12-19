import type { NextPage } from 'next';
// import { useState, useEffect } from 'react';
import Layout from '../components/shared/Layout';
import { PageTitle } from '../shared/enum';
import LoadingScreen from '../components/shared/LoadingScreen';
import Banner from '../components/games/Banner';

const Games: NextPage = () => {
  return (
    <Layout title={PageTitle.HomePage}>
      {/* <LoadingScreen loading={loading} /> */}
      <Banner />
      <div className="h-50v">
        <div className="text-white text-center">list games here</div>
      </div>
    </Layout>
  );
};

export default Games;
