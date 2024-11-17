import { useState, useEffect } from 'react';
import styles from './birth.module.css';
import MainButton from '../../../../components/ui/MainButton';
import useProfileStore from '../../../../store/useProfileStore';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import requests, { postRequest } from '../../../../api/request';

const Birth = () => {
  const { profile, setProfile } = useProfileStore();
  const navigate = useNavigate();

  const token = sessionStorage.getItem('accessToken');

  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();
  const currentDay = date.getDate();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth + 1);
  const [selectedDay, setSelectedDay] = useState(currentDay);
  const [daysArr, setDaysArr] = useState<string[]>([]);

  const yearArr = Array.from(
    { length: currentYear - 1990 + 1 },
    (_, i) => `${i + 1990}년`
  );
  const monthArr = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);

  // 해당 연도와 월에 맞는 일 수를 반환하는 함수
  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month, 0).getDate();

  // 선택된 연도와 월에 따라 일수를 생성하는 useEffect
  useEffect(() => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    setDaysArr(Array.from({ length: daysInMonth }, (_, i) => `${i + 1}일`));
  }, [selectedYear, selectedMonth]);

  //

  // 프로필 저장 핸들러
  const birthHandler = async () => {
    console.log(profile);
    try {
      const data = {
        profileName: profile.nickname,
        selfIntroduction: profile.introduce,
        dateOfBirth: `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`,
        gender: profile.gender,
      };

      const response = await postRequest(requests.fetchProfiles, data, token);
      if (response.status === 409) {
        toast.error('프로필이 존재합니다.');
        return;
      }
      if (response.status === 201) navigate('/signup/setting/address');
    } catch (error) {
      console.error(
        '에러',
        axios.isAxiosError(error) && error.response
          ? error.response.data
          : error
      );
    }
  };

  // 날짜 선택 핸들러
  const handleDateChange = (type: 'year' | 'month' | 'day', value: number) => {
    const setValue = {
      year: setSelectedYear,
      month: setSelectedMonth,
      day: setSelectedDay,
    };

    if (setValue[type]) {
      setValue[type](value);
    }

    setProfile({
      ...profile,
      dateOfBirth: `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`,
    });
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
          onChange={(e) => handleDateChange('year', parseInt(e.target.value))}
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
          onChange={(e) => handleDateChange('month', parseInt(e.target.value))}
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
          onChange={(e) => handleDateChange('day', parseInt(e.target.value))}
        >
          {daysArr.map((day, index) => (
            <option key={index} value={index + 1}>
              {day}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.btnWrapper}>
        <MainButton text="다음으로" type="button" onClickFn={birthHandler} />
      </div>
    </div>
  );
};

export default Birth;
