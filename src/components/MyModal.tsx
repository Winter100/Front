import { useRef, useState } from 'react';
import Modal from 'react-modal';
import Button from './common/Button';
import styles from './MyModal.module.css';
import UserImage from './common/UserImage';
import instance from '../api/axios';
import { useQueryClient } from '@tanstack/react-query';

type MyProfile = {
  profileName: string | undefined;
  selfIntroduction: string | undefined;
  profileImages: string | undefined;
};
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
  width: '400px',
  height: '450px',
  zIndex: 100,
  backgroundColor: '#202123',
  border: 'none',
};

const MyModal = ({
  profileName = '',
  selfIntroduction = '',
  profileImages = '/profile.png',
}: MyProfile) => {
  const [openModal, setOpenModal] = useState(false);
  const profileNameRef = useRef<HTMLInputElement>(null);
  const selfIntroductionRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = sessionStorage.getItem('accessToken');

    const profileName = profileNameRef.current?.value;
    const selfIntroduction = selfIntroductionRef.current?.value;

    if (!profileName?.trim() || !selfIntroduction?.trim()) {
      return;
    }

    if (!token) {
      console.error('Access token is missing!');
      return;
    }

    const url = import.meta.env.VITE_PROJECT_SERVER_URL;
    try {
      const response = await instance.patch(
        `${url}/api/v1/profiles/update`,
        { profileName, selfIntroduction },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 201) {
        queryClient.invalidateQueries({ queryKey: ['myProfile'], exact: true });
      }
      setOpenModal(false);
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error);
    }
  };

  return (
    <div>
      <Button
        onClick={() => setOpenModal((pre) => !pre)}
        style={{ fontSize: '0.8rem' }}
      >
        프로필 수정
      </Button>
      <Modal
        ariaHideApp={false}
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        style={{ overlay, content }}
        contentLabel="마이페이지 모달"
      >
        <div className={styles.container}>
          <div className={styles.image_container}>
            <UserImage src={profileImages ?? '/profile.png'} size="MODAL" />
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.input_container}>
              <label htmlFor="profileName" className={styles.title}>
                이름
              </label>
              <input
                type="text"
                id="profileName"
                className={styles.input}
                ref={profileNameRef}
                defaultValue={profileName}
                name="profileName"
              />
            </div>

            <div className={styles.input_container}>
              <label htmlFor="selfIntroduction" className={styles.title}>
                자기소개
              </label>
              <input
                type="text"
                id="selfIntroduction"
                className={styles.input}
                ref={selfIntroductionRef}
                defaultValue={selfIntroduction}
                name="selfIntroduction"
              />
            </div>
            <div className={styles.btn_container}>
              <button className={styles.btn}>수정</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default MyModal;
