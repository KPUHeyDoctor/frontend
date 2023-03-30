import { useState } from 'react';
import axios from 'axios';
import styles from '../component/MemLog.module.css';
import login from '../img/login.png';

function MemLog() {
  const [phoneNum, setPhoneNum] = useState('');
  const [rrNum, setRrNum] = useState('');
  const [id, setId] = useState(false);
  const [pw, setPw] = useState(false);

  const loginClick = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5001/', { phoneNum, rrNum })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className={styles.bg}>
      <div className={styles.log}>
        <img src={login} alt="로그인">
        </img>
      </div>
      <h4 htmlFor="phonenum" className={styles.id}>전화번호</h4>
      <input
        type="id"
        id="id"
        className={styles.phonenum}
        onFocus={() => {
          setId(true);
        }}
        onBlur={() => {
          setId(false);
        }}
        placeholder={id === true ? "" : "010-1234-5678"}
        value={phoneNum}
        onChange={(e) => {
          setPhoneNum(e.target.value);
        }}
      />

      <h4 htmlFor="rrnum" className={styles.pw}>주민등록번호</h4>
      <input
        type="pw"
        id="pw"
        className={styles.resinum}
        onFocus={() => {
          setPw(true);
        }}
        onBlur={() => {
          setPw(false);
        }}
        placeholder={pw === true ? "" : "000000-0000000"}
        value={rrNum}
        onChange={(e) => {
          setRrNum(e.target.value);
        }}
      />
      <button className={styles.logbtn} onClick={loginClick}>LOGIN</button>
    </div>
  );
}

export default MemLog;