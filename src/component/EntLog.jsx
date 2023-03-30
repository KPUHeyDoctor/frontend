import { useState } from 'react';
import styles from '../component/EntLog.module.css';
import login from '../img/login.png';

function EntLog() {
  
  const [id, setId] = useState(false);          // placeholder
  const [pw, setPw] = useState(false);    // placeholder
  
  return(
    <div className={styles.bg}>
      <div className={styles.log}>
        <img src={login} alt="로그인"></img>
      </div>
      <h4 className={styles.id}>전화번호</h4>
      <input type='phonenum' className={styles.phonenum}
        onFocus={() => {
          setId(true);
        }}
        onBlur={() => {
          setId(false);
        }}
        placeholder={id === true ? "" : "010-1234-5678"}
      ></input>

      <h4 className={styles.pw}>주민등록번호</h4>
      <input type='resinum' className={styles.resinum}
        onFocus={() => {
          setPw(true);
        }}
        onBlur={() => {
          setPw(false);
        }}
        placeholder={pw === true ? "" : "000000-0000000"}
      ></input>
      <button className={styles.logbtn}>LOGIN</button>
    </div>
  );
}

export default EntLog;