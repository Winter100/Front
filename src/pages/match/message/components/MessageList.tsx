import MessagePreview from './MessagePreview';
import styles from './messageList.module.css';

const DUMMY = new Array(3).fill('a');

const images = [
  { src: 'url(/public/1.jpg)' },
  { src: 'url(/public/2.jpg)' },
  { src: 'url(/public/3.jpg)' },
  { src: 'url(/public/dolphin.png)' },
];
const MessageList = () => {
  return (
    <>
      <ul className={styles.container}>
        <div className={styles.matchs_container}>
          {images.map((item, i) => (
            <div
              key={i}
              className={styles.matches_image}
              style={{
                backgroundImage: item.src,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
        {DUMMY.map((message, i) => (
          <li key={message + i + 10}>
            <MessagePreview />
          </li>
        ))}
      </ul>
    </>
  );
};

export default MessageList;
