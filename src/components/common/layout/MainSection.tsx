import styles from './styles/MainSection.module.css';
const MainSection = ({ children }: { children: React.ReactNode }) => {
  return <main className={styles.container}>{children}</main>;
};

export default MainSection;
