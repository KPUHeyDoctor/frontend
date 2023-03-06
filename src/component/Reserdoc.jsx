import { Link } from 'react-router-dom';
import styles from '../component/Reserdoc.module.css';
import doc01 from '../img/doc01.png';
import doc02 from '../img/doc02.png';

function Reserdoc() {
  return(
    <div className={styles.bg}>
      <h2 className={styles.hosname}>병원</h2>
      <div className={styles.doctor}>
        <button className={styles.doc01}>
          <img src={doc01} alt="의사1"></img>
        </button>
        <button className={styles.doc02}>
          <img src={doc02} alt="의사2"></img>
        </button>
      </div>
      <span className={styles.pass}>
        <Link to ="/date">
          <button className={styles.next}>다음</button>
        </Link>
      </span>
      
    </div>
  );
}

export default Reserdoc;