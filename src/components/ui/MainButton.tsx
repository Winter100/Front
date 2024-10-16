import React, { MouseEventHandler } from 'react';
import styles from './styles/MainButton.module.css';
type Props = {
  text: string;
  type: 'button' | 'submit' | 'reset';
  onClickFn?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};
const MainButton: React.FC<Props> = ({ text, type, onClickFn, disabled }) => {
  return (
    <div className={styles.btnWrapper}>
      <button
        type={type}
        onClick={onClickFn}
        disabled={disabled}
        style={{
          background: !disabled
            ? 'linear-gradient(45deg, #e94b76, #eb6649)'
            : '#4c4c4c',
        }}
      >
        {text}
      </button>
    </div>
  );
};

export default MainButton;
