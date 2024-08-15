import styles from './styles/Footer.module.css';

const Footer = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Footer;
