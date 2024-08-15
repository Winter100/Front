import { useState } from 'react';
import styles from './styles/AddressForm.module.css';
import DaumPostcodeEmbed from 'react-daum-postcode';

const theme = {
  bgColor: '#202123', //바탕 배경색
  searchBgColor: '#202123', //검색창 배경색
  contentBgColor: '#202123', //본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
  pageBgColor: '#202123', //페이지 배경색
  textColor: '#FFFFFF', //기본 글자색
  queryTextColor: '#FFFFFF', //검색창 글자색
  postcodeTextColor: '#5DC7FE', //우편번호 글자색
  outlineColor: '#444444', //테두리
};

const AddressForm = () => {
  const [value, setValue] = useState(false);
  const [address, setAddress] = useState('');

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setAddress(fullAddress);
    setValue(false);
    console.log(fullAddress);
  };
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => setValue((pre) => !pre)}>
        주소 검색
      </button>
      {value && (
        <div className={styles.postcodeWrapper}>
          <DaumPostcodeEmbed theme={theme} onComplete={handleComplete} />
        </div>
      )}
      <div className={styles.address}>
        {address && <p>선택된 주소: {address}</p>}
      </div>
    </div>
  );
};

export default AddressForm;
