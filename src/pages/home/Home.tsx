import { Link } from 'react-router-dom';
import styles from './Home.module.css';
// import { FaSignInAlt } from 'react-icons/fa';
// import { GiDolphin } from 'react-icons/gi';
import AddressForm from './components/AddressForm';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.description}>주변에서 인연을 찾아보세요!</p>
        <div className={styles.titleContainer}>
          <p className={styles.title}>엔돌핀</p>
        </div>
      </div>
      <div className={styles.authLinksContainer}>
        <Link to="/login" className={styles.authLink}>
          <span>인연 찾기</span>
        </Link>
      </div>

      <AddressForm />
    </div>
  );
};
export default Home;
