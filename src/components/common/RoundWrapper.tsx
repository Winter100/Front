import { ComponentProps } from 'react';

import styles from './styles/RoundWrapper.module.css';

interface BtnProps extends ComponentProps<'div'> {
  fontSize?: string;
  style?: React.CSSProperties;
}

const RoundWrapper = ({
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
    <div style={dynamicStyles} className={`${styles.div_wrapper}`} {...props}>
      {children}
    </div>
  );
};

export default RoundWrapper;
