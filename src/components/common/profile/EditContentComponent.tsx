import React from 'react';
import styles from './styles/editContentComponent.module.css';
type Props = {
  title: string;
  children: React.ReactNode;
};
const EditContentComponent: React.FC<Props> = ({ title, children }) => {
  return (
    <div className={styles.editContent}>
      <div className={styles.editTitleWrapper}>
        <p>{title}</p>
      </div>
      {children}
    </div>
  );
};

export default EditContentComponent;
