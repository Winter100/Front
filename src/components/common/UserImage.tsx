import styles from './styles/UserImage.module.css';

interface UserImageProps {
  src: string;
  size: 'M' | 'L';
}
const UserImage = ({ src = '/public/3.jpg', size = 'M' }: UserImageProps) => {
  const sizeValue = size === 'M' ? '2.7rem' : '3.5rem';
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
