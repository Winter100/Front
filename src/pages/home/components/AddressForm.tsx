import { useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import styles from './addressForm.module.css';
import { getLatAndLon } from '../../../util/getLatAndLon';
import { useKakaoLoader } from 'react-kakao-maps-sdk';

interface dataType {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
}

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

  const handleComplete = (data: dataType) => {
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
  };

  const getLatLon = async () => {
    if (address.length === 0 && !address) {
      console.log('값이 없음');
      return;
    }
    const data = await getLatAndLon(address);

    const longitude = data[0].x;
    const latitude = data[0].y;
    console.log(latitude, longitude);
  };

  const [loaidng, error] = useKakaoLoader({
    libraries: ['services'],
    appkey: 'bc97fdd9154c0108b80dd0d936b13290',
  });

  if (loaidng) {
    return <p>로딩 테스트...</p>;
  }

  if (error) {
    return <p>에러 테스트...</p>;
  }

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
      <button onClick={getLatLon}>위경도 확인</button>
    </div>
  );
};

export default AddressForm;
