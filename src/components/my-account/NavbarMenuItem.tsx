import React, { FC, useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { IMyAccountNavbarMenu } from './constants';
import { isEmpty } from '../../utils/helper';
import clsx from 'clsx';

interface Props {
  menu: IMyAccountNavbarMenu;
}

const NavbarMenuItem: FC<Props> = ({ menu }) => {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const parsed = queryString.parse(location.search);
    if (
      (parsed && menu.section && parsed.section === menu.section) ||
      ((!parsed || Object.keys(parsed).length < 1) && !menu.section)
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [location.search, menu.section]);

  const handleMenuChange = () => {
    const query = menu.section ? queryString.stringify({ section: menu.section }) : '';
    const url = `/my-account${isEmpty(query) ? '' : `?${query}`}`;

    router.push(url, url, { shallow: true });
  };

  return (
    <li
      onClick={handleMenuChange}
      className={clsx(
        'py-1 text-lg w-56 px-4 cursor-pointer text-center inline-flex items-center justify-center rounded-t-xl',
        {
          'bg-primary-100': isActive,
        },
      )}
    >
      <a className="inline-block">{menu.name}</a>
    </li>
  );
};

export default NavbarMenuItem;
