import { useState, useEffect, useMemo } from 'react';
import styles from './styles/birth.module.css';
import useProfileStore from '../../../../../store/useProfileStore';

const Birth = () => {
  const { profile, setProfile } = useProfileStore();

  // 현재 날짜 관련 상수를 객체로 분리
  const TODAY = {
    YEAR: new Date().getFullYear(),
    MONTH: new Date().getMonth() + 1,
    DAY: new Date().getDate(),
  };

  const [selectedYear, setSelectedYear] = useState(TODAY.YEAR);
  const [selectedMonth, setSelectedMonth] = useState(TODAY.MONTH);
  const [selectedDay, setSelectedDay] = useState(TODAY.DAY);
  const [daysArr, setDaysArr] = useState<string[]>([]);

  // 연도 배열 생성 (1990년부터 현재까지)
  const yearArr = useMemo(
    () =>
      Array.from({ length: TODAY.YEAR - 1990 + 1 }, (_, i) => `${i + 1990}년`),
    [TODAY.YEAR]
  );

  // 월 배열 생성 (1-12월)
  const monthArr = useMemo(
    () => Array.from({ length: 12 }, (_, i) => `${i + 1}월`),
    []
  );

  // 날짜 포맷팅 함수
  const formatDate = (year: number, month: number, day: number): string =>
    `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  // 해당 월의 일수 계산
  const getDaysInMonth = (year: number, month: number): number =>
    new Date(year, month, 0).getDate();

  // 일 배열 업데이트
  useEffect(() => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    setDaysArr(Array.from({ length: daysInMonth }, (_, i) => `${i + 1}일`));
  }, [selectedYear, selectedMonth]);

  // 날짜 변경 핸들러
  const handleDateChange = (type: 'year' | 'month' | 'day', value: number) => {
    const dateSetters = {
      year: setSelectedYear,
      month: setSelectedMonth,
      day: setSelectedDay,
    };

    dateSetters[type](value);

    const newDate = {
      year: type === 'year' ? value : selectedYear,
      month: type === 'month' ? value : selectedMonth,
      day: type === 'day' ? value : selectedDay,
    };

    setProfile({
      ...profile,
      dateOfBirth: formatDate(newDate.year, newDate.month, newDate.day),
    });
  };

  // select 컴포넌트 생성 함수
  const renderSelect = (
    value: number,
    type: 'year' | 'month' | 'day',
    options: string[]
  ) => (
    <select
      className={styles.select}
      value={value}
      onChange={(e) => handleDateChange(type, parseInt(e.target.value))}
    >
      {options.map((option, index) => (
        <option
          key={index}
          value={type === 'year' ? parseInt(option) : index + 1}
        >
          {option}
        </option>
      ))}
    </select>
  );

  return (
    <div className={styles.container}>
      <div className={styles.headerWrapper}>
        <h3>생년월일</h3>
      </div>
      <div className={styles.selectContainer}>
        {renderSelect(selectedYear, 'year', yearArr)}
        {renderSelect(selectedMonth, 'month', monthArr)}
        {renderSelect(selectedDay, 'day', daysArr)}
      </div>
    </div>
  );
};

export default Birth;
