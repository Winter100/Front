import { useState } from 'react';
import Modal from 'react-modal';
import Button from './common/Button';
import styles from './MyModal.module.css';
import RoundWrapper from './common/RoundWrapper';
import axios from 'axios';

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

const Exit = ({ chatRoomId }: { chatRoomId: string }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = sessionStorage.getItem('accessToken');

    if (!token) {
      console.error('Access token is missing!');
      return;
    }

    const url = import.meta.env.VITE_PROJECT_SERVER_URL;

    try {
      const response = await axios.delete(
        `${url}/api/v1/chat-rooms/${chatRoomId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
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
          <div className={styles.body}>
            <div className={styles.image_container}>
              <RoundWrapper
                style={{
                  cursor: 'default',
                  border: 'none',
                }}
              ></RoundWrapper>
            </div>

            <form>
              <div>채팅방 나가기</div>
              <div>
                채팅방을 나가면 메시지가 삭제되며 더이상 해당 유저와 매칭되지
                않습니다
              </div>
              <div>
                <button onClick={() => setOpenModal(false)}>취소</button>
                <button onClick={handleSubmit}>나가기</button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Exit;
