import styles from './styles/AbsoluteBox.module.css';
const AbsoluteBox = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};

export default AbsoluteBox;
