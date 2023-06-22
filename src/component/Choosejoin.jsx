import { Link } from 'react-router-dom';
import join from '../img/join.png';
import styles from '../component/Choosejoin.module.css';
import member from '../img/member.png';
import enter from '../img/enter.png';

function Choosejoin() {
  return(
    <div className={styles.bg}>
      <div className={styles.join}>
        <img src={join} alt="가입"></img>
      </div>
      <span className={styles.chosbtn}>
        <Link to="/memjoin">
          <button className={styles.mem}>
            <img src={member} alt='rec' className={styles.memrec}></img>
            회원가입</button>
        </Link>
        <Link to="/entjoin">
          <button className={styles.enter}>
            <img src={enter} alt='rec' className={styles.entrec}></img>
            기업가입</button>
        </Link>
      </span>
    </div>
  );
}

export default Choosejoin;