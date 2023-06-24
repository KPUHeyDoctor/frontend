import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import styles from '../component/Info.module.css';
import right01 from '../img/right01.png';
import right from '../img/right.png';
import left from '../img/left.png';
import lefttext from '../img/lefttext.png';
import heygif from '../img/heydoctor.gif';

SwiperCore.use([Navigation, Pagination, Autoplay])

function Info() {
  return (
    <Swiper
      className={styles.info}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: true }}
      loop={true}
      speed={1000}
    >
      <SwiperSlide>
        <button className={styles.swiper_001}>
          <div className={styles.left01}>
            <div className={styles.updownWrapper}>
              <div className={styles.up}>
                <div>
                  <img src={heygif} alt="hey" className={styles.heytext01} />
                </div>
                <div className={styles.subtext01}>에서</div>
              </div>
              <div className={styles.down}>
                <img src={lefttext} alt="lefttext" className={styles.lefttext} />
              </div>
            </div>
            <img src={right01} alt="right01" className={styles.right01} />
          </div>
        </button>
      </SwiperSlide>

      <SwiperSlide>
        <button className={styles.swiper_002}>
          <img src={left} alt='left' className={styles.left}></img>
          <div className={styles.rightside}>
            
            <div className={styles.one}>
              
              <div>
                <img src={heygif} alt='hey'className={styles.heytext}></img>
              </div>
              <div className={styles.subtext}>에서</div>
           
            </div>
            
            <div className={styles.two}>
              <img src={right} alt='right' className={styles.right}></img>
            </div>
          
          </div>
        </button>
      </SwiperSlide>
    </Swiper>
  );
}

export default Info;