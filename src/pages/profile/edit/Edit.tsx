import React, { useState } from 'react';
import styles from './styles/edit.module.css';
import ProfileImageEditComponent from '../../../components/common/profile/ProfileImageEditComponent';
import useProfile from '../../../zustand/useProfile';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/common/layout/Header';
import Badge from '../../../components/common/Badge';
import EditContentComponent from '../../../components/common/profile/EditContentComponent';
import InterestList from '../../../components/common/profile/InterestList';
import MainButton from '../../../components/ui/MainButton';

const Edit: React.FC = () => {
  const { profile, setProfile } = useProfile();
  const nav = useNavigate();
  const [mbti, setMbti] = useState('');
  const mbtiTypes = [
    'ISTJ',
    'ISFJ',
    'INFJ',
    'INTJ',
    'ISTP',
    'ISFP',
    'INFP',
    'INTP',
    'ESTP',
    'ESFP',
    'ENFP',
    'ENTP',
    'ESTJ',
    'ESFJ',
    'ENFJ',
    'ENTJ',
  ];

  const textareaChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setProfile({ ...profile, introduce: event.target.value });
  };

  const editButtonHandler = () => {
    console.log(profile);
  };
  return (
    <div className={styles.container}>
      <Header></Header>
      <div className={styles.editContainer}>
        <EditContentComponent title="프로필 이미지">
          <ProfileImageEditComponent />
        </EditContentComponent>

        <EditContentComponent title="자기소개">
          <textarea
            name="introduce"
            id="introduce"
            onChange={textareaChangeHandler}
            defaultValue={profile.introduce}
          ></textarea>
        </EditContentComponent>
        <EditContentComponent title="MBTI">
          <ul className={styles.mbtiContainer}>
            {mbtiTypes.map((e, i) => {
              return (
                <li
                  key={e + i}
                  onClick={() => {
                    setMbti(e);
                  }}
                >
                  <Badge
                    description={e}
                    style={{
                      backgroundColor: mbti === e ? '#dddddd80' : 'inherit',
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </EditContentComponent>
        <EditContentComponent title="관심사">
          <InterestList />
        </EditContentComponent>
        <div className={styles.btnWrapper}>
          <MainButton
            type="button"
            text="수정하기"
            onClickFn={() => {
              editButtonHandler();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Edit;
