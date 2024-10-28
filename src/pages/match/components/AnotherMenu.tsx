import { GrPowerReset } from 'react-icons/gr';
import { GrClose } from 'react-icons/gr';
import { FaHeart } from 'react-icons/fa';

import styles from './anotherMenu.module.css';
import RoundWrapper from '../../../components/common/RoundWrapper';
import Button from '../../../components/common/Button';
import axios from 'axios';

// const MATCH_ANOTHER_MENU = [
//   { id: 'reset', item: GrPowerReset, color: 'orange' },
//   { id: 'close', item: GrClose, color: 'red' },
//   { id: 'heart', item: FaHeart, color: 'green' },
// ];

const token = '';

const AnotherMenu = ({ profileName }: { profileName: string }) => {
  const like = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_PROJECT_SERVER_URL}/api/v1/swipes/like?toProfileName=${profileName}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // if(response.status)

    const data = response.data;
    console.log(data);
  };
  return (
    <ul className={styles.container}>
      <li key="reset">
        <RoundWrapper
          style={{
            width: '50px',
            height: '50px',
            color: 'orange',
            borderColor: 'orange',
          }}
        >
          <Button>
            <GrPowerReset />
          </Button>
        </RoundWrapper>
      </li>
      <li key="close">
        <RoundWrapper
          style={{
            width: '50px',
            height: '50px',
            color: 'red',
            borderColor: 'red',
          }}
        >
          <Button>
            <GrClose />
          </Button>
        </RoundWrapper>
      </li>
      <li key="heart">
        <RoundWrapper
          style={{
            width: '50px',
            height: '50px',
            color: 'green',
            borderColor: 'green',
          }}
        >
          <Button onClick={like}>
            <FaHeart />
          </Button>
        </RoundWrapper>
      </li>
    </ul>
    // <ul className={styles.container}>
    //   {MATCH_ANOTHER_MENU.map((menu) => (
    //     <RoundWrapper
    //       style={{
    //         width: '50px',
    //         height: '50px',
    //         color: menu.color,
    //         borderColor: menu.color,
    //       }}
    //     >
    //       <li key={menu.id}>
    //         <Button>
    //           <menu.item />
    //         </Button>
    //       </li>
    //     </RoundWrapper>
    //   ))}
    // </ul>
  );
};

export default AnotherMenu;
