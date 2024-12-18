import { ComponentProps } from 'react';
import styles from './styles/Button.module.css';

interface ButtonProps extends ComponentProps<'button'> {
  style?: React.CSSProperties;
}

const Button = ({ children, style, ...props }: ButtonProps) => {
  const combinedStyle = style ? { ...style } : undefined;

  return (
    <button style={combinedStyle} className={`${styles.button} `} {...props}>
      {children}
    </button>
  );
};

export default Button;
