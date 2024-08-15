import styles from './styles/Header.module.css';

interface HeaderProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

const Header = ({ left = null, center = null, right = null }: HeaderProps) => {
  return (
    <div className={styles.container}>
      <div>{left}</div>
      <div>{center}</div>
      <div>{right}</div>
    </div>
  );
};

export default Header;
