import React, { FC } from 'react';
import GameItem from '../shared/GameItem';

const PopularGame: FC = () => {
  let games = [
    {
      id: 0,
      name: 'Game A',
      image: '/images/games/image-7.png',
      link: '/',
    },
    {
      id: 1,
      name: 'Game A',
      image: '/images/games/image-8.png',
      link: '/',
    },
    {
      id: 2,
      name: 'Game c',
      image: '/images/games/image-8.png',
      link: '/',
    },
    {
      id: 3,
      name: 'Game D',
      image: '/images/games/image-7.png',
      link: '/',
    },
  ];

  return (
    <div className="text-center pt-20">
      <h3 className="text-white uppercase text-2xl mb-24">Popular Games</h3>
      <div className="bg-primary-100 pb-11">
        <div className="layout-container pt-7">
          <div className="grid grid-cols-2 gap-x-24 gap-y-10 -mt-14">
            {games.map((game, idx) => (
              <GameItem key={idx} item={game} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularGame;
