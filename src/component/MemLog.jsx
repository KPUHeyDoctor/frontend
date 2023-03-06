import styles from '../component/MemLog.module.css';
import login from '../img/login.png';

function MemLog() {
  return(
    <div className={styles.bg}>
      <div className={styles.log}>
        <img src={login} alt="로그인"></img>
      </div>
      <h4 className={styles.log01}>전화번호</h4>
      <input type='phonenum' className={styles.phonenum}></input>
      <h4 className={styles.log02}>주민등록번호</h4>
      <input type='resinum' className={styles.resinum}></input>
      <button className={styles.logbtn}>LOGIN</button>
    </div>
  );
}

export default MemLog;