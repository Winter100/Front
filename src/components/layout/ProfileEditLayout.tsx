import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './styles/profileEditLayout.module.css';
const ProfileEditLayout: React.FC = () => {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
};

export default ProfileEditLayout;
