import { useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import styles from './address.module.css';
import { getLatAndLon } from '../../../../util/getLatAndLon';
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import MainButton from '../../../../components/ui/MainButton';
import useProfileStore from '../../../../store/useProfileStore';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import requests, { postRequest } from '../../../../api/request';

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

const Address = () => {
  const { profile } = useProfileStore();
  const [value, setValue] = useState(false);
  const [address, setAddress] = useState('');
  const nav = useNavigate();
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
  };

  const getLatLon = async () => {
    if (address.length === 0 || !address) {
      toast.error('에러가 발생했습니다. 다시 시도해주세요.');
      setAddress('');
      return;
    }
    const data = await getLatAndLon(address);

    const longitude = data[0].x;
    const latitude = data[0].y;

    try {
      const response = await postRequest(
        requests.fetchSaveLocation,
        { latitude, longitude },
        true
      );
      // console.log(response);
      if (response.status === 200) {
        nav('/match');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('postAddressError', error.response);
        toast.error(error.response.data.message);
      } else {
        console.error('postAddressError2', error);
      }
    }
  };

  const [loading, error] = useKakaoLoader({
    libraries: ['services'],
    appkey: import.meta.env.VITE_KAKAO_ADDRESS_API_KEY,
  });

  if (loading) {
    return <p>주소를 불러오는 중입니다</p>;
  }

  if (error) {
    return <p>주소를 불러오는데 실패했습니다. 다시 시도해주세요.</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h2>위치 저장</h2>
        <p>자신의 현재 위치를 저장해보세요.</p>
      </div>
      <div className={styles.adressInputContainer}>
        {!value && (
          <button
            className={styles.searchAddressButton}
            onClick={() => setValue((pre) => !pre)}
          >
            주소 검색
          </button>
        )}
        {value && !address && (
          <div className={styles.postcodeWrapper}>
            <DaumPostcodeEmbed
              theme={theme}
              onComplete={handleComplete}
              style={{ width: '100%', height: '100%', maxHeight: '1000px' }}
            />
          </div>
        )}

        {address && (
          <div className={styles.resultContainer}>
            <div className={styles.locationConfirmationContainer}>
              <p style={{ textAlign: 'center' }}>{address}</p>
              <p>{profile.profileName}님의 현재 위치가 맞으신가요?</p>
            </div>
            <div className={styles.btnContainer}>
              <MainButton
                text="저장하기"
                type="button"
                onClickFn={() => {
                  getLatLon();
                }}
              />
              <div>
                <button
                  className={styles.resetAddressBtn}
                  onClick={() => {
                    setAddress('');
                  }}
                >
                  다시 찾기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Address;
