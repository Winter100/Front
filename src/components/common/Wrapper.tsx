import { ComponentProps } from 'react';

import styles from './styles/Wrapper.module.css';

interface WrapperProps extends ComponentProps<'div'> {
  fontSize?: string;
  flexDirection?: 'column' | 'row';
  gap?: string;
  flexGrow?: number;
}
const Wrapper = ({
  children,
  fontSize,
  flexDirection,
  gap,
  flexGrow,
  ...props
}: WrapperProps) => {
  return (
    <div
      style={{ fontSize, flexDirection, gap, flexGrow }}
      className={styles.container}
      {...props}
    >
      {children}
    </div>
  );
};

export default Wrapper;
