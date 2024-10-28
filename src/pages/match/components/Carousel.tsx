import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import styles from './carousel.module.css';

const Carousel = ({ image }: { image: string }) => {
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
    arrows: false,
  };

  return (
    <div className={styles.img_container}>
      <img key={image} className={styles.img} src={image} alt={image} />
    </div>
    // <Slider {...settings}>
    //  </Slider>
  );
};

export default Carousel;
{
  /* {images.map((image) => (
        <img key={image} className={styles.img} src={image} alt={image} />
      ))} */
}
