import { NavLink } from 'react-router-dom';
import { AiFillFire } from 'react-icons/ai';
import { ImBubbles } from 'react-icons/im';
import { HiUser } from 'react-icons/hi2';

import styles from './matchingMenu.module.css';
import MenuContainer from '../../../components/common/MenuContainer';

const MATCH_DUMMY_MENU = [
  { id: 'a1', item: AiFillFire, href: '/match', end: true },
  { id: 'a4', item: ImBubbles, href: '/match/messages', end: false },
  { id: 'a5', item: HiUser, href: '/match/my', end: true },
];

const MatchingMenu = () => {
  return (
    <MenuContainer>
      {MATCH_DUMMY_MENU.map((menu) => (
        <NavLink
          end={menu.end}
          to={menu.href}
          className={({ isActive }) => (isActive ? styles.active : '')}
          key={menu.id}
        >
          <menu.item />
        </NavLink>
      ))}
    </MenuContainer>
  );
};

export default MatchingMenu;
