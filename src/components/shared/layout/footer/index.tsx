import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useGlobal } from '../../../../hooks';

const Footer: FC = () => {
  const router = useRouter();
  const { gameData } = useGlobal();

  return (
    <footer className="bg-primary-200">
      <div className="flex flex-col">
        <div className="layout-container flex justify-center items-center pt-10 pb-7">
          {gameData?.logoURL && (
            <img
              src={gameData.logoURL}
              alt={gameData.name}
              className="cursor-pointer max-w-full"
              onClick={() => router.push('/')}
            />
          )}
        </div>
        <div className="layout-container pb-12 text-center">
          <span className="text-lg text-primary-800">Powered by Gamify</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
