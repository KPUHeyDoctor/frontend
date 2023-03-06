import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import styles from '../component/Info.module.css';
import swiper_01 from '../img/swiper_01.png';
import swiper_02 from '../img/swiper_02.png';

SwiperCore.use([Navigation, Pagination, Autoplay])

function Info() {
  return (
    <Swiper
      className={styles.info}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 2000, disableOnInteraction: true }}
      loop={false}
    >
      <SwiperSlide>
        <button className={styles.swiper_01}>
          <img src={swiper_01} alt="swiper_01"></img>
        </button>
      </SwiperSlide>
      <SwiperSlide>
        <button className={styles.swiper_02}>
          <img src={swiper_02} alt="swiper_02"></img>
        </button>
      </SwiperSlide>
    </Swiper>
  );
}

export default Info;