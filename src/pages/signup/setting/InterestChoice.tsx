import React, { useEffect, useState } from 'react';
import MainButton from '../../../components/ui/MainButton';
import styles from './styles/interestChoice.module.css';
import { useNavigate } from 'react-router-dom';
import useProfile from '../../../zustand/useProfile';
import MainSection from '../../../components/common/layout/MainSection';
import Badge from '../../../components/common/Badge';
import { errorToast } from '../../../components/toast/toast';
const InterestChoice: React.FC = () => {
  const nav = useNavigate();
  const [selectedArr, setSelectedArr] = useState<string[]>([]);
  const { profile, setProfile } = useProfile();
  const { interest } = profile;
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

  //이전에 선택된 관심사가 있으면 표시
  useEffect(() => {
    setSelectedArr(interest);
  }, [interest]);

  // 관심사를 클릭하면 배열에 최대 5개를 저장하고 다시 클릭하면 제외되는 함수
  const toggleInterest = (interest: string) => {
    const isSelected = selectedArr.includes(interest);

    if (isSelected) {
      setSelectedArr(selectedArr.filter((item) => item !== interest));
    } else if (selectedArr.length >= 5) {
      errorToast('관심사는 최대 5개만 등록가능합니다.', 1000);
    } else {
      setSelectedArr([...selectedArr, interest]);
    }
  };

  const btnHandler = () => {
    setProfile({ ...profile, interest: selectedArr });
    nav('/signup/setting/profileImageUploader');
  };

  return (
    <MainSection>
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
                  <Badge
                    description={e}
                    style={{
                      backgroundColor: selectedArr.includes(e)
                        ? '#dddddd80'
                        : 'inherit',
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.btnWrapper}>
          <MainButton
            text={
              selectedArr.length === 0
                ? `스킵하기 ( ${selectedArr.length} / 5)`
                : `다음으로 ( ${selectedArr.length} / 5)`
            }
            type="button"
            onClickFn={() => {
              btnHandler();
            }}
          />
        </div>
      </div>
    </MainSection>
  );
};

export default InterestChoice;
