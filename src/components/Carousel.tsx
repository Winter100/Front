import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import styles from './styles/Carousel.module.css';

const Carousel = ({ images }: { images: string[] }) => {
  const settings = {
    dots: true,
    dotsClass: 'dots_custom',
    appendDots: (dots: React.ReactNode) => (
      <div
        style={{
          width: '100%',
          position: 'absolute',
          top: '0px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={styles.container}>
      <Slider className={styles.slider_container} {...settings}>
        {images.map((image) => (
          <img key={image} className={styles.img} src={image} alt={image} />
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
