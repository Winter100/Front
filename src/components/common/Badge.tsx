import styles from './styles/Badge.module.css';

const Badge = ({ description }: { description: string }) => {
  return <div className={styles.container}>{description}</div>;
};

export default Badge;
