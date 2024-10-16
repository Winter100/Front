import { useState } from 'react';
import Modal from 'react-modal';
import Button from './common/Button';
import styles from './MyModal.module.css';
import RoundWrapper from './common/RoundWrapper';
import UserImage from './common/UserImage';

const overlay = {
  backgroundColor: ' rgba(0, 0, 0, 0.7)',
};

const content = {
  top: '50%',
  left: '50%',
  right: 'auto',
  bottom: 'auto',
  marginRight: '-50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  height: '600px',
  zIndex: 100,
  backgroundColor: '#202123',
  border: 'none',
};

const MyModal = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <Button
        onClick={() => setOpenModal((pre) => !pre)}
        style={{ fontSize: '0.8rem' }}
      >
        모달 테스트
      </Button>
      <Modal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        style={{ overlay, content }}
        contentLabel="마이페이지 모달"
      >
        <div className={styles.container}>
          {/* <div
            className={styles.header}
            style={{
              backgroundImage: 'url(/public/1.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            모달 제목
          </div> */}
          <div className={styles.body}>
            <div className={styles.image_container}>
              <RoundWrapper
                style={{
                  cursor: 'default',
                  border: 'none',
                }}
              >
                <UserImage src="/public/3.jpg" size="MODAL" />
              </RoundWrapper>
            </div>
            <div>다른 컨텐츠...</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyModal;
