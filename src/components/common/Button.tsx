import { ComponentProps } from 'react';
import styles from './styles/Button.module.css';

type ButtonProps = ComponentProps<'button'>;

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button className={`${styles.button} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
