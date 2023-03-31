import styles from '../component/MemJoin.module.css';
import join from '../img/join.png';

function MemJoin() {
  return(
  <div className={styles.bg}>
    <div className={styles.join}>
      <img src={join} alt="회원가입입"></img>
    </div>
  </div>
  );
}

export default MemJoin;