import { useState } from 'react';
import { convertRemToSize } from '../../util/convertRemToSize';
import styles from './styles/UserImage.module.css';
import Modal from 'react-modal';
import Button from './Button';

interface UserImageProps {
  src?: string;
  size?: 'S' | 'M' | 'L' | 'XL' | 'MODAL';
  name?: string;
}

const overlayStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
};

const contentStyle = {
  top: '50%',
  left: '50%',
  right: 'auto',
  bottom: 'auto',
  marginRight: '-50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  height: '450px',
  zIndex: 100,
  backgroundColor: '#202123',
  border: 'none',
  borderRadius: '10px',
};

const UserImage = ({
  src = '/public/3.jpg',
  size = 'M',
  name = '',
}: UserImageProps) => {
  const sizeValue = convertRemToSize(size);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div
        className={styles.container}
        style={{
          width: sizeValue,
          height: sizeValue,
        }}
      >
        <Button
          onClick={() => setOpenModal(true)}
          className={styles.imageButton}
        >
          <img src={src} alt="User Avatar" className={styles.image} />
        </Button>
      </div>
      {openModal && (
        <Modal
          ariaHideApp={false}
          isOpen={openModal}
          onRequestClose={() => setOpenModal(false)}
          style={{ overlay: overlayStyle, content: contentStyle }}
          contentLabel="User Image Modal"
        >
          <div className={styles.modalContent}>
            {name && <h2>{name}</h2>}
            <img src={src} alt="User Avatar" className={styles.modalImage} />

            <div
              onClick={() => setOpenModal(false)}
              className={styles.btn_container}
            >
              <button className={styles.btn}>닫기</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default UserImage;
