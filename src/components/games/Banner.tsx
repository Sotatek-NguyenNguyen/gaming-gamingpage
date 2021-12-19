import React from 'react';

const Banner: React.FC = () => {
  return (
    <div className="h-418p">
      <div className="bg-hero-banner bg-no-repeat bg-center bg-cover relative">
        <div className="flex items-center justify-center md:block h-418p layout-container"></div>
        <div className="absolute bottom-2/4 transform translate-y-2/3 w-full px-6 text-center text-white">
          <h2 className="font-bold text-5xl tracking-widest2 gc-text-shadow">ALL GAMES</h2>
        </div>
      </div>
    </div>
  );
};

export default Banner;
