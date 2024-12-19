import { useRef, useState } from 'react';
import Modal from 'react-modal';
import Button from './common/Button';
import styles from './MyModal.module.css';
import instance from '../api/axios';
import { useQueryClient } from '@tanstack/react-query';
import { getAccessToken } from '../util/token';
import { CgProfile } from 'react-icons/cg';
import Spinner from './common/Spinner';

type MyProfile = {
  profileName: string | undefined;
  selfIntroduction: string | undefined;
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
  width: '350px',
  height: '250px',
  zIndex: 100,
  backgroundColor: '#202123',
  border: 'none',
};

const MyModal = ({ profileName = '', selfIntroduction = '' }: MyProfile) => {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const profileNameRef = useRef<HTMLInputElement>(null);
  const selfIntroductionRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const token = getAccessToken();

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={() => setOpenModal((pre) => !pre)}>
        <CgProfile />
      </Button>
      {openModal && (
        <Modal
          ariaHideApp={false}
          isOpen={openModal}
          onRequestClose={() => setOpenModal(false)}
          style={{ overlay, content }}
          contentLabel="마이페이지 모달"
        >
          <div className={styles.container}>
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
                <button
                  disabled={isLoading}
                  style={{
                    width: '5rem',
                    height: '2rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  className={styles.btn}
                >
                  {isLoading ? <Spinner size={20} /> : '수정하기'}
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MyModal;
