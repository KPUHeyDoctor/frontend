import styles from '../component/Mypage.module.css';
import mypage from '../img/mypage.png';

function Mypage() {
  return(
    <>
    <div className={styles.bg}>
      <div className={styles.mypage}>
        <img src={mypage} alt="마이페이지"></img>
      </div>
      <div className={styles.list}>
        <span className={styles.myreser}>
          예약 내역
        </span>
        <span className={styles.myinfo}>
          내 정보
        </span>
      </div>
      
    </div>
    </>
  );
}

export default Mypage;