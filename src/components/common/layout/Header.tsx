import styles from './styles/Header.module.css';

const Header = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Header;
