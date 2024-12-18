import styles from './topPreivew.module.css';

const TopPreview = () => {
  const images = [
    { src: 'url(/1.jpg)' },
    { src: 'url(/2.jpg)' },
    { src: 'url(/3.jpg)' },
    { src: 'url(/dolphin.png)' },
  ];

  return (
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
  );
};

export default TopPreview;
