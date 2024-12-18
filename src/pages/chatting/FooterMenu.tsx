import { PiUploadSimpleBold } from 'react-icons/pi';
import styles from './styles/footerMenu.module.css';
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
    </ul>
  );
};

export default FooterMenu;
