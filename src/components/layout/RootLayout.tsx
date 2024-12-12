import { Outlet } from 'react-router-dom';
import styles from './styles/RootLayout.module.css';
// import useChatRooms from '../../hooks/useChatRooms';

const RootLayout = () => {
  // const token = sessionStorage.getItem('accessToken') ?? '';
  // const { getLastMessage, isConnected } = useChatRooms(token, ['5', '6']);
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
};

export default RootLayout;
