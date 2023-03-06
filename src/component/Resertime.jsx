import { Link } from 'react-router-dom';
import styles from '../component/Resertime.module.css';

function Resertime() {
  return(
    <div className={styles.bg}>
      <h2 className={styles.hosname}>병원</h2>
      <span className={styles.pass}>
        <Link to ="/date">
          <button className={styles.next}>완료</button>
        </Link>
      </span>
      
    </div>
  );
}

export default Resertime;