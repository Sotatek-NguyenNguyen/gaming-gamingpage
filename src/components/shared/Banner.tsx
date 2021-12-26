import React from 'react';
// import clsx from 'clsx';

interface Props {
  title?: string;
  background?: string;
}

const Banner: React.FC<Props> = ({ title, background = '/images/Sub-header.png' }) => {
  return (
    <div className="max-h-418p overflow-hidden">
      <div className="relative">
        <img src={background} className="w-full" alt="game banner" />
        {/* <div className="flex items-center justify-center md:block h-418p layout-container" /> */}
        {title && (
          <div className="absolute bottom-1/2 transform translate-y-1/2 w-full px-6 text-center text-white">
            <h2 className="font-bold text-5xl tracking-widest2 gc-text-shadow">{title}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;
