import React from 'react';
import clsx from 'clsx';

interface Props {
  title?: string;
  background?: number;
}

const Banner: React.FC<Props> = ({ title, background = 1 }) => {
  return (
    <div className="h-418p">
      <div
        className={clsx('bg-no-repeat bg-center bg-cover relative', {
          'bg-game-detail-banner': background === 1,
          'bg-hero-banner': background === 2,
        })}
      >
        <div className="flex items-center justify-center md:block h-418p layout-container" />
        <div className="absolute bottom-1/2 transform translate-y-1/2 w-full px-6 text-center text-white">
          {title && <h2 className="font-bold text-5xl tracking-widest2 gc-text-shadow">{title}</h2>}
        </div>
      </div>
    </div>
  );
};

export default Banner;
