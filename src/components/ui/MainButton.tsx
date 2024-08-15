import React, { MouseEventHandler } from 'react';
import styles from './styles/MainButton.module.css';
type Props = {
  text: string;
  type: 'button' | 'submit' | 'reset';
  onClickFn?: MouseEventHandler<HTMLButtonElement>;
  disable?: boolean;
};
const MainButton: React.FC<Props> = ({ text, type, onClickFn, disable }) => {
  return (
    <div className={styles.btnWrapper}>
      <button type={type} onClick={onClickFn} disabled={disable}>
        {text}
      </button>
    </div>
  );
};

export default MainButton;
