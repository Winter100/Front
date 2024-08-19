import { GrPowerReset } from 'react-icons/gr';
import { GrClose } from 'react-icons/gr';
import { FaHeart } from 'react-icons/fa';

import styles from './styles/AnotherMenu.module.css';

import RoundWrapper from './common/RoundWrapper';
import Button from './common/Button';

const MATCH_ANOTHER_MENU = [
  { id: 'reset', item: GrPowerReset, color: 'orange' },
  { id: 'close', item: GrClose, color: 'red' },
  { id: 'heart', item: FaHeart, color: 'green' },
];

const AnotherMenu = () => {
  return (
    <ul className={styles.container}>
      {MATCH_ANOTHER_MENU.map((menu) => (
        <RoundWrapper
          style={{
            width: '50px',
            height: '50px',
            color: menu.color,
            borderColor: menu.color,
          }}
        >
          <li key={menu.id}>
            <Button>
              <menu.item />
            </Button>
          </li>
        </RoundWrapper>
      ))}
    </ul>
  );
};

export default AnotherMenu;
