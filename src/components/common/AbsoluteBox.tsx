import { ComponentProps } from 'react';
import styles from './styles/AbsoluteBox.module.css';

interface AbsoluteBox extends ComponentProps<'div'> {
  style?: React.CSSProperties;
}
const AbsoluteBox = ({ children, style, ...props }: AbsoluteBox) => {
  const combinedStyle = style ? { ...style } : undefined;
  return (
    <div style={{ position: 'relative', flex: '1 1 0' }}>
      <div style={combinedStyle} className={styles.container} {...props}>
        {children}
      </div>
    </div>
  );
};

export default AbsoluteBox;
