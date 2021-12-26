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
        <div className="layout-container flex justify-center items-center py-14">
          {gameData?.logoURL && (
            <img
              width={334}
              height={133}
              src={gameData.logoURL}
              alt={gameData.name}
              className="cursor-pointer"
              onClick={() => router.push('/')}
            />
          )}
        </div>
        <div className="layout-container py-2 text-center">
          <span className="layout-container text-xl text-white">Powered by Gamify</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
