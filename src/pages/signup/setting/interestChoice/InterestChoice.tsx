import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import styles from './interestChoice.module.css';

import Badge from '../../../../components/common/Badge';
import MainButton from '../../../../components/ui/MainButton';
import useProfileStore from '../../../../store/useProfileStore';

const InterestChoice = () => {
  const nav = useNavigate();
  const [selectedArr, setSelectedArr] = useState<string[]>([]);
  const { profile, setProfile } = useProfileStore();
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
    if (interest && interest.length > 0) {
      setSelectedArr(interest);
    }
  }, [interest]);

  // 관심사를 클릭하면 배열에 최대 5개를 저장하고 다시 클릭하면 제외되는 함수
  const toggleInterest = (interest: string) => {
    const isSelected = selectedArr.includes(interest);

    if (isSelected) {
      setSelectedArr(selectedArr.filter((item) => item !== interest));
    } else if (selectedArr.length >= 5) {
      toast.error('관심사는 최대 5개만 등록가능합니다.');
    } else {
      setSelectedArr([...selectedArr, interest]);
    }
  };

  const btnHandler = () => {
    setProfile({ ...profile, interest: selectedArr });
    nav('/signup/setting/birth');
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
  );
};

export default InterestChoice;
