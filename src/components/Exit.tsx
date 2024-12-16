import { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Button from './common/Button';
import styles from './Exit.module.css';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../util/token';

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
  width: '350px',
  height: '200px',
  zIndex: 100,
  backgroundColor: '#202123',
  border: 'none',
};

const Exit = ({ chatRoomId }: { chatRoomId: string }) => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = getAccessToken();

    if (!token) {
      console.error('Access token is missing!');
      return;
    }

    const url = import.meta.env.VITE_PROJECT_SERVER_URL;

    try {
      const response = await axios.delete(
        `${url}/api/v1/chat-rooms/${chatRoomId}/leave`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 200) {
        navigate('/match/messages', { replace: true });
      }
      const data = response.data;
      return data;
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error);
    }
  };
  return (
    <div>
      <Button onClick={() => setOpenModal(true)} style={{ fontSize: '0.8rem' }}>
        나가기
      </Button>
      <Modal
        ariaHideApp={false}
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        style={{ overlay, content }}
        contentLabel="채팅방 나가기"
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <h2>채팅방 나가기</h2>
            <div className={styles.description}>
              <p>채팅방을 나가면 다시 들어올 수 없습니다</p>
              <p>정말 나가시겠습니까?</p>
            </div>
          </div>
          <div className={styles.btn_container}>
            <button
              className={`${styles.btn}`}
              onClick={() => setOpenModal(false)}
            >
              취소
            </button>
            <button
              className={`${styles.btn} ${styles.exit}`}
              onClick={handleSubmit}
            >
              나가기
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Exit;
