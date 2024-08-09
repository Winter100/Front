import React, { MouseEventHandler } from 'react';
import styles from './styles/MainButton.module.css';
type Props = {
  text: string;
  type: 'button' | 'submit' | 'reset';
  onClickFn?: MouseEventHandler<HTMLButtonElement>;
  disable?: boolean;
};
const MainButton = ({ text, type, onClickFn, disable }: Props) => {
  return (
    <div className={styles.btnWrapper}>
      <button type={type} onClick={onClickFn} disabled={disable}>
        {text}
      </button>
    </div>
  );
};

export default MainButton;
