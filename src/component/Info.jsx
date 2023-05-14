import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import styles from '../component/Info.module.css';
// import swiper_0001 from '../img/swiper_0001.png';
// import ambul from '../img/ambulance.gif'
import right from '../img/right.png';
import left from '../img/left.png';
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
        {/* <button className={styles.swiper_0001}>
          <img src={swiper_0001} alt="swiper_001"></img>
          <div className={styles.swiperhos}>
            <img src={ambul} alt="swiperhos"></img>
          </div>
        </button> */}
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