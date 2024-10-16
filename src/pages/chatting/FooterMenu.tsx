import { PiGifBold, PiUploadSimpleBold } from 'react-icons/pi';

import styles from './footerMenu.module.css';

const FooterMenu = () => {
  return (
    <ul className={styles.ul}>
      <li>
        <input type="file" id="file-upload" />
        <label htmlFor="file-upload">
          <PiUploadSimpleBold />
        </label>
      </li>
      <li>
        <input type="file" id="gif-upload" />
        <label htmlFor="gif-upload">
          <PiGifBold />
        </label>
      </li>
    </ul>
  );
};

export default FooterMenu;
