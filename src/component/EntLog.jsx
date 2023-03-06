import styles from '../component/MemLog.module.css';
import login from '../img/login.png';

function EntLog() {
  return(
    <div className={styles.bg}>
      <div className={styles.log}>
        <img src={login} alt="로그인"></img>
      </div>
      <h4 className={styles.log01}>병원 아이디</h4>
      <input type='phonenum' className={styles.phonenum}></input>
      <h4 className={styles.log02}>병원 비밀번호</h4>
      <input type='resinum' className={styles.resinum}></input>
      <button className={styles.logbtn}>LOGIN</button>
    </div>
  );
}

export default EntLog;