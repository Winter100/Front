import { ComponentProps } from 'react';
import styles from './styles/Input.module.css';

interface InputProps extends ComponentProps<'input'> {}
const Input = ({ ...props }: InputProps) => {
  return (
    <input
      className={styles.input}
      placeholder="메시지를 입력해주세요."
      {...props}
    />
  );
};

export default Input;
