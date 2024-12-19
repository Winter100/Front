import styles from './topPreivew.module.css';

const TopPreview = () => {
  const images = [
    { src: 'url(/ad1.png)' },
    { src: 'url(/ad2.png)' },
    { src: 'url(/ad3.png)' },
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
      <p className={styles.ad}>Ad</p>
    </div>
  );
};

export default TopPreview;
