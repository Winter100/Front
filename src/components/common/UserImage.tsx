import { convertRemToSize } from '../../util/convertRemToSize';
import styles from './styles/UserImage.module.css';

interface UserImageProps {
  src?: string;
  size?: 'S' | 'M' | 'L' | 'XL' | 'MODAL';
}
const UserImage = ({ src = '/public/3.jpg', size = 'M' }: UserImageProps) => {
  const sizeValue = convertRemToSize(size);
  return (
    <div
      className={styles.container}
      style={{ width: sizeValue, height: sizeValue }}
    >
      <img src={src} alt="테스트" />
    </div>
  );
};

export default UserImage;
