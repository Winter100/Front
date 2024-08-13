import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillFire } from 'react-icons/ai';
import { MdDashboardCustomize } from 'react-icons/md';
import { GiDiamonds } from 'react-icons/gi';
import { ImBubbles } from 'react-icons/im';
import { HiUser } from 'react-icons/hi2';

import styles from './styles/MatchingMenu.module.css';
import MenuContainer from './common/MenuContainer';

const MATCH_DUMMY_MENU = [
  { id: 'a1', item: AiFillFire, href: '/match' },
  { id: 'a2', item: MdDashboardCustomize, href: '/' },
  { id: 'a3', item: GiDiamonds, href: '/' },
  { id: 'a4', item: ImBubbles, href: '/match/messages' },
  { id: 'a5', item: HiUser, href: '/' },
];

const MatchingMenu = () => {
  const [value, setValue] = useState('a1');
  return (
    <MenuContainer>
      {MATCH_DUMMY_MENU.map((menu) => (
        <Link
          to={menu.href}
          className={value === menu.id ? styles.active : ''}
          key={menu.id}
          onClick={() => {
            setValue(menu.id);
          }}
        >
          <menu.item />
        </Link>
      ))}
    </MenuContainer>
  );
};

export default MatchingMenu;
