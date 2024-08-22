import React from 'react';
import styles from './styles/consenItem.module.css';

type Props = {
  text: string;
  des: string;
};
const ConsentItem: React.FC<Props> = ({ text, des }) => {
  return (
    <li className={styles.consentItem}>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="22.903" height="19.395">
          <path
            d="M22.903 2.828 20.075 0 6.641 13.435 3.102 9.09 0 11.616l6.338 7.779L22.903 2.828z"
            fill="#e94b76"
          />
        </svg>
      </div>

      <div>
        <p>{text}</p>
        <p>{des}</p>
      </div>
    </li>
  );
};
export default ConsentItem;
