import { useState } from 'react';
import axios from 'axios';
import styles from '../component/EntLog.module.css';
import login from '../img/login.png';

function EntLog() {
  const [hospitalId, setHospitalId] = useState('');
  const [hospitalPw, setHospitalPw] = useState('');
  const [id, setId] = useState(false);
  const [pw, setPw] = useState(false);

  const loginClick = (event) => {
    event.preventDefault();
    axios.post('https://tukdoctor.shop/login/enterprise', { hospitalId, hospitalPw })
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
      <h4 htmlFor="hosid" className={styles.id}>병원아이디</h4>
      <input
        type="id"
        id="id"
        className={styles.hosid}
        onFocus={() => {
          setId(true);
        }}
        onBlur={() => {
          setId(false);
        }}
        placeholder={id === true ? "" : "heydoctor"}
        value={hospitalId}
        onChange={(e) => {
          setHospitalId(e.target.value);
        }}
      />

      <h4 htmlFor="hospw" className={styles.pw}>병원비밀번호</h4>
      <input
        type="pw"
        id="pw"
        className={styles.hospw}
        onFocus={() => {
          setPw(true);
        }}
        onBlur={() => {
          setPw(false);
        }}
        placeholder={pw === true ? "" : "password"}
        value={hospitalPw}
        onChange={(e) => {
          setHospitalPw(e.target.value);
        }}
      />
      <button className={styles.logbtn} onClick={loginClick}>LOGIN</button>
    </div>
  );
}

export default EntLog;