import { useRouter } from 'next/router';
import clsx from 'clsx';
import { useMemo } from 'react';

interface Props {
  name: string;
  link?: string;
  externalLink?: string;
  variant: 'horizontal' | 'vertical';
  onClick?: (...args: any[]) => void;
}

const NavBarMenuItem: React.FC<Props> = ({ name, link, externalLink, variant, onClick }) => {
  const router = useRouter();

  const isRouteActive = useMemo(() => {
    return router.pathname === link;
  }, [router.pathname, link]);

  const handleNavBarMenuItemClick = () => {
    if (externalLink) {
      window.open(externalLink, '_blank');
    } else if (link) {
      router.push(link);
    }

    if (onClick) {
      onClick();
    }
  };

  return (
    <li
      className={clsx('text-white cursor-pointer uppercase transition-all ', {
        'w-full p-4 hover:bg-primary-300 rounded-md': variant === 'horizontal',
        'px-4 lg:px-12 py-4 lg:py-7 hover:bg-primary-300': variant === 'vertical',
        'bg-primary-300': isRouteActive,
      })}
      onClick={handleNavBarMenuItemClick}
    >
      <a className="text-s16px">{name}</a>
    </li>
  );
};

export default NavBarMenuItem;
