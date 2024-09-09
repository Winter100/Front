import Badge from '../../../components/common/Badge';
import styles from './badgeList.module.css';

const DUMMY = [
  { description: 'INTP' },
  { description: '요리잘함' },
  { description: '집순이' },
  { description: '학생' },
  { description: '좋아함zzzzzzzzzzzzzz' },
  { description: '게임고수' },
  { description: '강아지 키워요!' },
  { description: 'INTP' },
  { description: '요리잘함' },
  { description: '집순이' },
  { description: '학생' },
  { description: '좋아함zzzzzzzzzzzzzz' },
  { description: '게임고수' },
  { description: '강아지 키워요!' },
  { description: 'INTP' },
  { description: '요리잘함' },
  { description: '집순이' },
  { description: '학생' },
  { description: '좋아함zzzzzzzzzzzzzz' },
  { description: '게임고수' },
  { description: '강아지 키워요!' },
];

const BadgeList = () => {
  return (
    <ul className={styles.container}>
      {DUMMY.map((badge, i) => (
        <li key={i + 20}>
          <Badge description={badge.description} />
        </li>
      ))}
    </ul>
  );
};

export default BadgeList;
