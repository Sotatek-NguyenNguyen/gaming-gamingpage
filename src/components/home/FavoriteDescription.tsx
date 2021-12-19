import React, { FC } from 'react';
// import Image from 'next/image';
import DepositButton from './DepositButton';

const FavoriteDescription: FC = () => {
  return (
    <div className="bg-primary-100 pt-10 pb-32">
      <div className="text-white layout-container text-center">
        <h1 className="text-5xl uppercase">AXIE INFINITY</h1>
        <div className="text-xl mt-20 max-w-5xl mx-auto">
          <p>Axies are fierce creatures that love to battle, build and hunt for treasure!</p>
          <p className="mt-10">
            Build unstoppable teams of Axies and conquer your enemies! <br />
            Each Axie has unique strengths and weaknesses based on its genes. With billions of
            possible genetic combinations, the possibilities are truly infinite!
          </p>
        </div>
        <DepositButton />
        <div className="mt-12">
          {/* <Image
            width={837}
            height={429}
            src="/images/Vid-stream.png"
            alt="video"
            className="cursor-pointer"
          /> */}
          <iframe
            width={837}
            height={429}
            className="mx-auto"
            src="https://www.youtube.com/embed/oMa8cc6YxSI"
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default FavoriteDescription;
