import { FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Footer: FC = () => {
  const router = useRouter();

  const handleClickNav = (navLink?: string, newTab: boolean = false) => {
    if (navLink) {
      if (!newTab) {
        router.push(navLink);
      } else {
        window.open(navLink, '_blank');
      }
    }
  };

  return (
    <footer className="bg-primary-200">
      <div className="flex flex-col">
        <div className="layout-container flex justify-center items-center py-14">
          <Image
            width={334}
            height={133}
            src="/images/gamify_logo_max.svg"
            alt="gamify gaming logo"
            className="cursor-pointer"
            onClick={() => router.push('/')}
          />
        </div>
        <div className="layout-container py-2">
          <span className="layout-container text-xl text-left text-white">Powered by Gamify</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
