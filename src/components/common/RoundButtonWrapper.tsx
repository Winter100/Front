import { ComponentProps } from 'react';

import styles from './styles/RoundButtonWrapper.module.css';

interface BtnProps extends ComponentProps<'button'> {
  fontSize?: string;
  style?: React.CSSProperties;
}

const RoundButtonWrapper = ({
  children,
  fontSize,
  style = {},
  ...props
}: BtnProps) => {
  const dynamicStyles: React.CSSProperties = {
    fontSize,
    ...style,
  };
  return (
    <button style={dynamicStyles} className={styles.button_wrapper} {...props}>
      {children}
    </button>
  );
};

export default RoundButtonWrapper;
