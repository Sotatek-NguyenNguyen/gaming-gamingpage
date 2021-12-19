import React, { FC } from 'react';
import Image from 'next/image';
import { IGameItem } from '../../../src/shared/interface';

interface GameItemProps {
  item: IGameItem;
}

const GameItem: FC<GameItemProps> = ({ item }) => {
  return (
    <div className="relative rounded-lg group">
      <Image width={550} height={293} src={item.image} alt="video" />
      <button className="uppercase absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white rounded-full px-10 py-3 border-2 bg-primary-100 bg-opacity-70 border-primary-200 invisible group-hover:visible">
        Game detail
      </button>
    </div>
  );
};

export default GameItem;
