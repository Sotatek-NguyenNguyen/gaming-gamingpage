import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { navbarMenu } from './constants';
import CurrentAccountBadge from './CurrentAccountBadge';
import NavBarMenuItem from './NavBarMenuItem';

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      width={99}
      height={41}
      src="/images/gamify_logo_max.svg"
      alt="gamify gaming logo"
      className="cursor-pointer"
      onClick={() => router.push('/')}
    />
  );
};

const Header: React.FC = () => {
  const { connected } = useWallet();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [navMenus, setNavMenus] = useState(navbarMenu);

  const handleOpenSidebar = () => {
    setSidebarVisible(true);
  };

  const handleCloseSidebar = () => {
    setSidebarVisible(false);
  };

  const navMemo = useMemo(() => {
    const objIndex = navbarMenu.findIndex((obj) => obj.key === 'my-account');
    if (connected) {
      navbarMenu[objIndex].enable = true;
    } else {
      navbarMenu[objIndex].enable = false;
    }
    return navbarMenu;
  }, [connected]);

  return (
    <div className="bg-primary-100">
      <div className="flex items-center justify-between layout-container">
        <div className="items-center">
          <Logo />
        </div>
        <ul className="hidden md:flex items-center">
          {navMemo
            .filter((menu) => menu.enable === true)
            .map((menu) => (
              <NavBarMenuItem
                key={menu.key}
                name={menu.name}
                link={menu.link}
                externalLink={menu?.externalLink}
                variant="vertical"
              />
            ))}
        </ul>
        <div className="flex items-center">
          <div className="hidden lg:block">
            <CurrentAccountBadge />
          </div>

          <div className="block md:hidden">
            <button className="p-2 text-white" onClick={handleOpenSidebar}>
              <AiOutlineMenu className="text-3xl font-light" />
            </button>

            {sidebarVisible && (
              <div className="fixed inset-0 z-50 flex flex-col px-4 bg-primary-500">
                <div className="flex items-center justify-between py-4">
                  <div>
                    <Logo />
                  </div>

                  <div>
                    <button className="p-2 text-white" onClick={handleCloseSidebar}>
                      <AiOutlineClose className="text-3xl font-light" />
                    </button>
                  </div>
                </div>

                <div className="mt-6">
                  <ul className="flex flex-col">
                    {navMenus
                      .filter((menu) => menu.enable === true)
                      .map((menu) => (
                        <NavBarMenuItem
                          key={menu.key}
                          name={menu.name}
                          link={menu.link}
                          externalLink={menu?.externalLink}
                          variant="horizontal"
                          onClick={handleCloseSidebar}
                        />
                      ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
