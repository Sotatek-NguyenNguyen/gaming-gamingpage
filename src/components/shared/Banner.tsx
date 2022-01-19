import { FC } from 'react';
// import clsx from 'clsx';

interface Props {
  title?: string;
  background?: string;
}

const Banner: FC<Props> = ({ title, background }) => {
  return (
    <div className="max-h-600p overflow-hidden">
      <div className="relative max-h-600p">
        {background ? (
          <img src={background} className="max-w-full" alt="game banner" />
        ) : (
          <span className="h-96 bg-gray-300 rounded-full w-full animate-pulse" />
        )}
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
