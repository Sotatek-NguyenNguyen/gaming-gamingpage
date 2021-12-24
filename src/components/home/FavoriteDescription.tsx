import React, { FC } from 'react';
// import Image from 'next/image';
import DepositButton from './DepositButton';
import { GameInfoResponse } from '../../utils/interface';
import { matchYoutubeUrl } from '../../utils/helper';

interface Props {
  game?: GameInfoResponse;
}

const FavoriteDescription: FC<Props> = ({ game }) => {
  return (
    <div className="bg-primary-100 pt-10 pb-32">
      <div className="text-white layout-container text-center">
        <h1 className="text-5xl uppercase">{game?.name}</h1>
        <div className="text-xl mt-20 max-w-5xl mx-auto">
          <p>{game?.description}</p>
          {/* <p>Axies are fierce creatures that love to battle, build and hunt for treasure!</p>
          <p className="mt-10">
            Build unstoppable teams of Axies and conquer your enemies! <br />
            Each Axie has unique strengths and weaknesses based on its genes. With billions of
            possible genetic combinations, the possibilities are truly infinite!
          </p> */}
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
          {game?.videoIntroURL && (
            <iframe
              width={837}
              height={429}
              className="mx-auto"
              src={`https://www.youtube.com/embed/${matchYoutubeUrl(game.videoIntroURL)}`}
              title="YouTube video player"
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoriteDescription;
