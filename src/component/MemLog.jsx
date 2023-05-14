import { useState } from 'react';
import axios from 'axios';
import styles from '../component/MemLog.module.css';
import login from '../img/login.png';

function MemLog() {
  const [phoneNum, setPhoneNum] = useState('');
  const [rrNum, setRrNum] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    axios.post('https://tukdoctor.shop//login/member', { phoneNum, rrNum })
      .then((response) => {
        if (response.data.message === 'Login successful!') {
          console.log('로그인 성공');
          // save token to local storage
          localStorage.setItem('token', response.data.token);
          // set logged in state to true
          // redirect to logged in page
          window.location.replace('/');
        } else if (response.data.message === 'Invalid credentials!') {
          console.log('로그인 실패');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [idFocused, setIdFocused] = useState(false);
  const [pwFocused, setPwFocused] = useState(false);

  return (
    <div className={styles.bg}>
      <div className={styles.log}>
        <img src={login} alt="로그인" />
      </div>
      <h4 htmlFor="phonenum" className={styles.id}>전화번호</h4>
      <input
        type="text"
        id="phonenum"
        className={styles.phonenum}
        onFocus={() => {
          setIdFocused(true);
        }}
        onBlur={() => {
          setIdFocused(false);
        }}
        placeholder={idFocused ? "" : "010-1234-5678"}
        value={phoneNum}
        onChange={(e) => {
          setPhoneNum(e.target.value);
        }}
      />

      <h4 htmlFor="rrnum" className={styles.pw}>주민등록번호</h4>
      <input
        type="password"
        id="rrnum"
        className={styles.rrnum}
        onFocus={() => {
          setPwFocused(true);
        }}
        onBlur={() => {
          setPwFocused(false);
        }}
        placeholder={pwFocused ? "" : "000000-0000000"}
        value={rrNum}
        onChange={(e) => {
          setRrNum(e.target.value);
        }}
      />
      
      <button className={styles.logbtn} onClick={handleLogin}>LOGIN</button>
    </div>
  );
}

export default MemLog;
