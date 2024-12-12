import { PiGifBold, PiUploadSimpleBold } from 'react-icons/pi';
import styles from './footerMenu.module.css';
import { useSendMessage } from '../../hooks/useSendMessage';

const FooterMenu = () => {
  const { handleFileUpload } = useSendMessage();

  return (
    <ul className={styles.ul}>
      <li>
        <input
          type="file"
          id="file-upload"
          style={{ display: 'none' }}
          onChange={(e) => handleFileUpload(e, 'FILE')}
        />
        <label htmlFor="file-upload">
          <PiUploadSimpleBold />
        </label>
      </li>
      <li>
        <input
          type="file"
          id="gif-upload"
          style={{ display: 'none' }}
          accept="image/gif"
          onChange={(e) => handleFileUpload(e, 'GIF')}
        />
        <label htmlFor="gif-upload">
          <PiGifBold />
        </label>
      </li>
    </ul>
  );
};

export default FooterMenu;
