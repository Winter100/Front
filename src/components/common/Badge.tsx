import { ComponentProps } from 'react';
import styles from './styles/Badge.module.css';

interface BadgeProps extends ComponentProps<'div'> {
  description: string;
}

const Badge = ({ description, ...props }: BadgeProps) => {
  return (
    <div className={styles.container} {...props}>
      {description}
    </div>
  );
};

export default Badge;
