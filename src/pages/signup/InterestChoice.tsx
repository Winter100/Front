import React, { useState } from 'react';
import MainButton from '../../components/ui/MainButton';
import Interest from '../../components/ui/Interest';
import styles from './styles/interestChoice.module.css';
import { useNavigate } from 'react-router-dom';
import useProfile from '../../zustand/useProfile';
const InterestChoice: React.FC = () => {
  const nav = useNavigate();
  const [selectedArr, setSelectedArr] = useState<string[]>([]);
  const { profile, setProfile } = useProfile();
  const interestList = [
    '노래',
    '운동',
    '코딩',
    '언어교환',
    '해리포터',
    '사운드클라우드',
    '스파',
    '헤비메탈',
    '인스타그램',
    '아쿠아리움',
    '걷기',
    'J-Pop',
    'K-Pop',
    '카페',
    '스포티파이',
    '뛰기',
  ];

  // 관심사를 클릭하면 배열에 저장하고 만약 한번 더 누르면 배열에서 제외되는 함수
  const toggleInterest = (interest: string) => {
    if (selectedArr.length >= 5) {
      console.log('최대 5개까지만 등록가능');
      return;
    }
    selectedArr.includes(interest)
      ? setSelectedArr(selectedArr.filter((item) => item !== interest))
      : setSelectedArr([...selectedArr, interest]);
  };

  const btnHandler = () => {
    setProfile({ ...profile, interest: selectedArr });
    nav('/signup/profileImageUploader');
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h2>관심사</h2>
        <p>평소 관심이 있거나 자주했던 관심사를 등록해주세요.</p>
      </div>
      <div className={styles.interestListWrapper}>
        <ul>
          {interestList.map((e) => {
            return (
              <li
                key={e}
                onClick={() => {
                  toggleInterest(e);
                }}
              >
                <Interest text={e} isClick={selectedArr.includes(e)} />
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.btnWrapper}>
        <MainButton
          text={`다음으로 ( ${selectedArr.length} / 5)`}
          type="button"
          onClickFn={() => {
            btnHandler();
          }}
        />
      </div>
    </div>
  );
};

export default InterestChoice;
