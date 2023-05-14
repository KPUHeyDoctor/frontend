import { useState } from 'react';
import axios from 'axios';
import styles from '../component/MemLog.module.css';
import login from '../img/login.png';

function MemLog() {
  const [phoneNum, setPhoneNum] = useState('');
  const [rrNum, setRrNum] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState(false);
  const [pw, setPw] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    axios.post('https://tukdoctor.shop//login/member', { phoneNum, rrNum })
      .then((response) => {
        if (response.data.message === 'Login successful!') {
          console.log('로그인 성공');
          // save token to local storage
          localStorage.setItem('token', response.data.token);
          // set logged in state to true
          setIsLoggedIn(true);
          // redirect to logged in page
          window.location.replace('/loggedin');
        } else if (response.data.message === 'Invalid credentials!') {
          console.log('로그인 실패');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleLogout = () => {
    axios.post('https://tukdoctor.shop/logout', { phoneNum })
      .then((response) => {
        if (response.data.message === 'Logout successful!') {
          console.log('로그아웃 성공');
          // clear token from local storage
          localStorage.removeItem('token');
          // set logged in state to false
          setIsLoggedIn(false);
          // redirect to login page
          window.location.replace('/memlog');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (isLoggedIn) {
    return (
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
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
        className={styles.rrnum}
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
      <button className={styles.logbtn} onClick={handleLogin}>LOGIN</button>
      <button className={styles.logoutbtn} onClick={handleLogout}>LOGOUT</button>
    </div>
  );
}

export default MemLog;