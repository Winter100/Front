import React from 'react';
import styles from './styles/interest.module.css';
type Props = {
  text: string;
  isClick: boolean;
};
const Interest: React.FC<Props> = ({ text, isClick }) => {
  return (
    <div
      className={styles.interest}
      style={{ backgroundColor: isClick ? '#04040480' : 'white' }}
    >
      <span>{text}</span>
    </div>
  );
};

export default Interest;
