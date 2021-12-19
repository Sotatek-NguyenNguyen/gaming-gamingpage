import React from 'react';

const Banner: React.FC = () => {
  return (
    <div className="h-418p">
      <div className="bg-game-detail-banner bg-no-repeat bg-center bg-cover relative">
        <div className="flex items-center justify-center md:block h-418p layout-container" />
        <div className="absolute bottom-1/2 transform translate-y-1/2 w-full px-6 text-center text-white">
          <h2 className="font-bold text-5xl tracking-widest2 gc-text-shadow">NEW GAME ERA</h2>
        </div>
      </div>
    </div>
  );
};

export default Banner;
