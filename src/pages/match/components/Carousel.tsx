import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './carousel.module.css';

const Carousel = ({ image }: { image: string }) => {
  return (
    <div className={styles.img_container}>
      <img key={image} className={styles.img} src={image} alt={image} />
    </div>
  );
};

export default Carousel;
