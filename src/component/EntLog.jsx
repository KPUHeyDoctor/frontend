import { useState } from 'react';
import axios from 'axios';
import styles from '../component/EntLog.module.css';
import login from '../img/login.png';

function EntLog() {

  const [enter, setEnter] = useState({
    enterpriseId: '',
    enterprisePw: '',
  })

  const loginClick = async () => {
    try {
      const url = 'https://tukdoctor.shop/api/login/enterprise';
      const data = {
        enterpriseId: enter.enterpriseId,
        enterprisePw: enter.enterprisePw,
      };

      const res = await axios.post(url, data);

      if ('enterpriseName' in res.data) {
        console.log('로그인 성공:', res.data.enterpriseName);

        // 토큰을 로컬 스토리지에 저장
        localStorage.setItem('token', res.data.token);

        // 로그인 상태를 true로 설정
        // 로그인된 페이지로 리디렉션
        window.location.replace('/EntMainPage');
      } else if ('message' in res.data && res.data.message === 'Invalid credentials!') {
        console.log('로그인 실패');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.bg}>
      <div className={styles.log}>
        <img src={login} alt="로그인">
        </img>
      </div>
      <h4 htmlFor="hosid" className={styles.id}>병원아이디</h4>
      <input
        type="id"
        id="id"
        className={styles.hosid}
        value={enter.enterpriseId}
        required
        placeholder='HeyDoctor'
        onChange={(e) => {
          setEnter({...enter, enterpriseId: e.target.value});
        }}
      />

      <h4 htmlFor="hospw" className={styles.pw}>병원비밀번호</h4>
      <input
        type="pw"
        id="pw"
        className={styles.hospw}
        value={enter.enterprisePw}
        required
        placeholder='비밀번호'
        onChange={(e) => {
          setEnter({...enter, enterprisePw: e.target.value});
        }}
      />
      <button className={styles.logbtn} onClick={loginClick}>LOGIN</button>
    </div>
  );
}

export default EntLog;