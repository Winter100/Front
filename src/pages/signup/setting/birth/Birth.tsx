import { useState, useEffect } from 'react';
import styles from './birth.module.css';
import MainButton from '../../../../components/ui/MainButton';
import useProfileStore from '../../../../store/useProfileStore';
import { useNavigate } from 'react-router-dom';

const Birth = () => {
  const { profile, setProfile } = useProfileStore();
  const nav = useNavigate();

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedDay, setSelectedDay] = useState(1);
  const [daysArr, setDaysArr] = useState<string[]>([]);

  const yearArr = Array.from(
    { length: currentYear - 1990 + 1 },
    (_, i) => `${i + 1990}년`
  );

  const monthArr = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);

  // 해당 연도와 월에 맞는 일 수를 반환하는 함수
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  // 선택된 연도와 월에 따라 일수를 생성하는 함수
  useEffect(() => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const dayArr = Array.from({ length: daysInMonth }, (_, i) => `${i + 1}일`);
    setDaysArr(dayArr);
    setSelectedDay(1);
  }, [selectedYear, selectedMonth]);

  const birthHandler = () => {
    const formattedMonth = String(selectedMonth).padStart(2, '0');
    const formattedDay = String(selectedDay).padStart(2, '0');
    console.log(`${selectedYear}-${formattedMonth}-${formattedDay}`);

    setProfile({
      ...profile,
      dateOfBirth: `${selectedYear}-${formattedMonth}-${formattedDay}`,
    });
    nav('/signup/setting/address');
  };
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h2>생년월일</h2>
        <p>
          정확한 생년월일을 입력해주시면 더 나은 서비스를 제공할 수 있습니다.
        </p>
      </div>
      <div className={styles.selectContainer}>
        <select
          className={styles.select}
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        >
          {yearArr.map((year, index) => (
            <option key={index} value={parseInt(year)}>
              {year}
            </option>
          ))}
        </select>
        <select
          className={styles.select}
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
        >
          {monthArr.map((month, index) => (
            <option key={index} value={index + 1}>
              {month}
            </option>
          ))}
        </select>
        <select
          className={styles.select}
          value={selectedDay}
          onChange={(e) => setSelectedDay(parseInt(e.target.value))}
        >
          {daysArr.map((day, index) => (
            <option key={index}>{day}</option>
          ))}
        </select>
      </div>

      <div className={styles.btnWrapper}>
        <MainButton
          text="다음으로"
          type="button"
          onClickFn={() => {
            birthHandler();
          }}
        />
      </div>
    </div>
  );
};

export default Birth;
