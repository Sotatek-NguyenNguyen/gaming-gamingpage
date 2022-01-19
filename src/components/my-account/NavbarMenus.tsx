import React, { FC } from 'react';
import { mcNavbarMenus } from './constants';
import NavbarMenuItem from './NavbarMenuItem';

const NavbarMenus: FC = () => {
  return (
    <ul className="flex flex-wrap w-full max-w-screen-xl mx-auto items-stretch border-b-4 border-primary-400">
      {mcNavbarMenus
        .filter((menu) => menu.enable === true)
        .map((menu, idx) => (
          <NavbarMenuItem menu={menu} key={idx} />
        ))}
    </ul>
  );
};

export default NavbarMenus;
