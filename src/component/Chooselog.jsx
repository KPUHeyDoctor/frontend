import { Link } from 'react-router-dom';
import login from '../img/login.png';
import styles from '../component/Chooselog.module.css';
import member from '../img/member.png';
import enter from '../img/enter.png';

function Chooselog() {
  return(
    <div className={styles.bg}>
      <div className={styles.log}>
        <img src={login} alt="로그인"></img>
      </div>
      <span className={styles.chosbtn}>
        <Link to="/memlog">
          <button className={styles.mem}>
            <img src={member} alt='rec' className={styles.memrec}></img>
            회원로그인</button>
        </Link>
        <Link to="/entlog">
          <button className={styles.enter}>
            <img src={enter} alt='rec' className={styles.entrec}></img>
            기업로그인</button>
        </Link>
      </span>
    </div>
  );
}

export default Chooselog;