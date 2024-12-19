import { useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';
import Modal from 'react-modal';
import { getLatAndLon } from '../../../util/getLatAndLon';
import { TbHomeSearch } from 'react-icons/tb';
import Button from '../../../components/common/Button';
import instance from '../../../api/axios';
import { getAccessToken } from '../../../util/token';

interface dataType {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
}

const PostcodePopup = () => {
  const [isImageOpen, setImageIsOpen] = useState(false);

  const handleComplete = async (data: dataType) => {
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

    const convertData = await getLatAndLon(fullAddress);
    const longitude = convertData[0].x;
    const latitude = convertData[0].y;

    const coordinate = {
      longitude,
      latitude,
    };

    try {
      await instance.post(`/api/v1/profiles/saveLocation`, coordinate, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          'Content-Type': 'application/json',
        },
      });
      closeModal();
    } catch (e) {
      console.log(e);
    }
  };

  const openModal = () => {
    setImageIsOpen(true);
  };

  const closeModal = () => {
    setImageIsOpen(false);
  };

  return (
    <div>
      <Button onClick={openModal}>
        <TbHomeSearch />
      </Button>

      {isImageOpen && (
        <Modal
          ariaHideApp={false}
          isOpen={isImageOpen}
          onRequestClose={closeModal}
          style={{
            overlay: { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
            content: {
              width: '450px',
              height: '550px',
              margin: 'auto',
              borderRadius: '10px',
              backgroundColor: '#fff',
            },
          }}
        >
          <DaumPostcodeEmbed
            onComplete={handleComplete}
            style={{
              width: '100%',
              height: '500px',
            }}
          />
        </Modal>
      )}
    </div>
  );
};

export default PostcodePopup;
