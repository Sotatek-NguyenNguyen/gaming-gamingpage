import React from 'react';

interface Props {
  background?: string;
}

const Banner: React.FC<Props> = ({ background }) => {
  return (
    <div className="h-600p">
      <div
        className="bg-no-repeat bg-center bg-cover relative"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="flex items-center justify-center md:block h-600p layout-container" />
        {/* <div className="absolute bottom-1/2 transform translate-y-1/2 w-full px-6 text-center text-white">
          <h2 className="font-bold text-5xl tracking-widest2 gc-text-shadow">NEW GAME ERA</h2>
        </div> */}
      </div>
    </div>
  );
};

export default Banner;
