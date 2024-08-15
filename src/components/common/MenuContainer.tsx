import styles from './styles/MenuContainer.module.css';
const MenuContainer = ({ children }: { children: React.ReactNode }) => {
  return <ul className={styles.container}>{children}</ul>;
};

export default MenuContainer;
