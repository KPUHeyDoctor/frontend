import { useState } from 'react';
import axios from 'axios';
import styles from '../component/MemJoin.module.css';
import join from '../img/join.png';

function MemJoin() {

  const [userName, setUserName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [rrNum, setRrNum] = useState('');
  const [id, setId] = useState(false);
  const [pw, setPw] = useState(false);

  const joinClick = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5001/join/member', { userName, phoneNum, rrNum })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return(
  <div className={styles.bg}>
    <div className={styles.join}>
      <img src={join} alt="회원가입"></img>
    </div>

    <h4 htmlFor="username" className={styles.name}>이름</h4>
    <input
      type="name"
      id="name"
      className={styles.username}
      onFocus={() => {
        setId(true);
      }}
      onBlur={() => {
        setId(false);
      }}
      placeholder={id === true ? "" : "홍길동"}
      value={userName}
      onChange={(e) => {
        setUserName(e.target.value);
      }}
    />

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
    <button className={styles.joinbtn} onClick={joinClick}>JOIN</button>

  </div>
  
  );
}

export default MemJoin;