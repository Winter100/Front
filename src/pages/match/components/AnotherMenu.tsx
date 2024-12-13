import { GrPowerReset } from 'react-icons/gr';
import { GrClose } from 'react-icons/gr';
import { FaHeart } from 'react-icons/fa';

import styles from './anotherMenu.module.css';
import RoundWrapper from '../../../components/common/RoundWrapper';
import Button from '../../../components/common/Button';
import { handleOnDisLike, handleOnLike } from '../../../util/swipe';
import useFindUserStore from '../../../store/useFindUserStore';

const AnotherMenu = () => {
  const selectedUser = useFindUserStore((state) => state.selectedUser);
  const token = sessionStorage.getItem('accessToken') ?? '';
  const deleteUser = useFindUserStore((state) => state.deleteUser);
  const setNextSelectUser = useFindUserStore(
    (state) => state.setNextSelectUser
  );

  const hanldeDisLike = async () => {
    handleOnDisLike(selectedUser?.profileName ?? '', token);
    deleteUser(selectedUser?.profileName ?? '');
    setNextSelectUser();
  };
  const hanldeLike = async () => {
    handleOnLike(selectedUser?.profileName ?? '', token);
    deleteUser(selectedUser?.profileName ?? '');
    setNextSelectUser();
  };

  return (
    <ul className={styles.container}>
      <li key="next">
        <RoundWrapper
          style={{
            width: '50px',
            height: '50px',
            color: 'orange',
            borderColor: 'orange',
          }}
        >
          <Button onClick={setNextSelectUser}>
            <GrPowerReset />
          </Button>
        </RoundWrapper>
      </li>
      <li key="disLike">
        <RoundWrapper
          style={{
            width: '50px',
            height: '50px',
            color: 'red',
            borderColor: 'red',
          }}
        >
          <Button onClick={hanldeDisLike}>
            <GrClose />
          </Button>
        </RoundWrapper>
      </li>
      <li key="like">
        <RoundWrapper
          style={{
            width: '50px',
            height: '50px',
            color: 'green',
            borderColor: 'green',
          }}
        >
          <Button onClick={hanldeLike}>
            <FaHeart />
          </Button>
        </RoundWrapper>
      </li>
    </ul>
  );
};

export default AnotherMenu;
