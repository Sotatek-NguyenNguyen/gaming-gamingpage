import React, { FC, useState, useEffect } from 'react';
// import Image from 'next/image';
import DepositButton from './DepositButton';
import { GameInfoResponse } from '../../utils/interface';
import { matchYoutubeUrl } from '../../utils/helper';

interface Props {
  game?: GameInfoResponse;
}

const FavoriteDescription: FC<Props> = ({ game }) => {
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string>('');

  useEffect(() => {
    if (game?.videoIntroURL) {
      setVideoUrl(
        matchYoutubeUrl(game.videoIntroURL)
          ? `https://www.youtube.com/embed/${matchYoutubeUrl(game.videoIntroURL)}`
          : game.videoIntroURL,
      );
    }
  }, [game?.videoIntroURL]);

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
          {game?.videoIntroURL && (
            <>
              {matchYoutubeUrl(game.videoIntroURL) && (
                <img
                  width={837}
                  height={429}
                  src={`https://img.youtube.com/vi/${matchYoutubeUrl(
                    game.videoIntroURL,
                  )}/maxresdefault.jpg`}
                  alt="video"
                  className={`mx-auto cursor-pointer ${showVideo ? 'hidden' : ''}`}
                  onClick={() => {
                    setShowVideo(true);
                    setVideoUrl(`${videoUrl}?autoplay=1`);
                  }}
                />
              )}
              <iframe
                height={429}
                className={`mx-auto w-full lg:w-837px ${!showVideo ? 'hidden' : ''}`}
                src={videoUrl}
                title="YouTube video player"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoriteDescription;
