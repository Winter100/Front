import styles from './styles/AnotherMenu.module.css';
import { GrPowerReset } from 'react-icons/gr';
import { GrClose } from 'react-icons/gr';
import { MdOutlineStar } from 'react-icons/md';
import { FaHeart } from 'react-icons/fa';
import { AiFillThunderbolt } from 'react-icons/ai';

const AnotherMenu = () => {
  return (
    <div className={styles.container}>
      <GrPowerReset />
      <GrClose />
      <MdOutlineStar />
      <FaHeart />
      <AiFillThunderbolt />
    </div>
  );
};

export default AnotherMenu;
