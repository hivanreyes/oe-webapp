import React, { Component } from 'react';
import Slider from 'react-slick';

import style from './carousel.scss';

const settings = {
  dots: true,
  slidesToShow: 1,
  lazyLoad: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  pauseOnHover: false,
  appendDots: dots => (
    <div
      style={{
        bottom: '20px',
        display: 'block',
        listStyle: 'none',
        padding: '0px',
        position: 'absolute',
        textAlign: 'center',
        width: '100%',
      }}
    >
      <ul style={{ margin: '0px' }}> {dots} </ul>
    </div>
  ),
  customPaging: () => (
    <div
      style={{
        width: '10px',
        height: '10px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        opacity: '.7',
      }}
    />
  ),
};

class Carousel extends Component {

  render() {
    return(
      <div className={style.carouselContainer}>
        <Slider {...settings}>
          <div className={style.container}>
            <img
              src="https://openexplorer.nationalgeographic.com/assets/images/heropictures/NationalGeographic_1767876_2048.jpg"
              className={style.image}
              alt="Exploration for everyone"
            />
            <div className={style.centered}>
              <div className={style.title}>Exploration for everyone</div>
              <div className={style.subtitle}>Follow the world’s explorers and start your own expedition</div>
            </div>
          </div>
          <div className={style.container}>
            <img
              src="https://openexplorer.nationalgeographic.com/assets/images/heropictures/underwater-meteorites.jpg"
              className={style.image}
              alt="Hunting for underwater meteorites"
            />
            <div className={style.centered}>
              <div className={style.title}>Hunting for underwater meteorites</div>
              <div className={style.subtitle}>Teens in Chicago are on a quest to find a meteorite in Lake Michigan</div>
            </div>
          </div>
          <div className={style.container}>
            <img
              src="https://openexplorer.nationalgeographic.com/assets/images/heropictures/Carousel_option_2_preview.jpeg"
              className={style.image}
              alt="Exploring the most remote rivers in Angola"
            />
            <div className={style.centered}>
              <div className={style.title}>Exploring the most remote rivers in Angola</div>
              <div className={style.subtitle}>Follow the mission to protect sub-saharan Africa’s last pristine wetland</div>
            </div>
          </div>
        </Slider>
      </div>
    )
  }
}

export default Carousel
