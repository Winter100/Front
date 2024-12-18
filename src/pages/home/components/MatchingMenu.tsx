import { NavLink } from 'react-router-dom';
import { AiFillFire } from 'react-icons/ai';
import { ImBubbles } from 'react-icons/im';
import { HiUser } from 'react-icons/hi2';

import styles from './matchingMenu.module.css';
import MenuContainer from '../../../components/common/MenuContainer';
import { useChattingStore } from '../../../store/useChattingStore';

const MatchingMenu = () => {
  const chattingRooms = useChattingStore((state) => state.chattingRooms);
  const unreadMessages = chattingRooms.reduce(
    (acc, cur) => acc + cur.unreadCount,
    0
  );

  return (
    <MenuContainer>
      <div className={styles.navLinkContainer}>
        <NavLink
          end={true}
          to={'/match'}
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <AiFillFire />
        </NavLink>
      </div>

      <div className={styles.navLinkContainer}>
        <NavLink
          end={true}
          to={'/match/messages'}
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <ImBubbles />
        </NavLink>

        {unreadMessages > 0 && (
          <span className={styles.unreadBadge}>{unreadMessages}</span>
        )}
      </div>

      <div className={styles.navLinkContainer}>
        <NavLink
          end={true}
          to={'/match/my'}
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <HiUser />
        </NavLink>
      </div>
    </MenuContainer>
  );
};

export default MatchingMenu;
