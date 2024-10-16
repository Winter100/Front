import React, { useEffect, useState } from 'react';
import Badge from '../Badge';
import styles from './styles/interestList.module.css';
import useProfileStore from '../../../store/useProfileStore';
import { toast } from 'react-toastify';

const InterestList: React.FC = () => {
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
    setSelectedArr(interest);
  }, [interest]);
  const toggleInterest = (selectedInterest: string) => {
    const isSelected = selectedArr.includes(selectedInterest);

    if (isSelected) {
      const newSelectedArr = selectedArr.filter(
        (item: string) => item !== selectedInterest
      );
      setSelectedArr(newSelectedArr);
      setProfile({ ...profile, interest: newSelectedArr });
    } else if (selectedArr.length >= 5) {
      toast.error('관심사는 최대 5개만 등록가능합니다.');
    } else {
      setSelectedArr([...selectedArr, selectedInterest]);
      setProfile({ ...profile, interest: [...selectedArr] });
    }
  };
  return (
    <ul className={styles.interestListBox}>
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
  );
};

export default InterestList;
