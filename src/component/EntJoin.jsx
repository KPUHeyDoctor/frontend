import { useState } from 'react';
import axios from 'axios';
import styles from '../component/EntJoin.module.css';
import join from '../img/join.png';

function EntJoin() {

  const [hospitalName, setHospitalName] = useState('');
  const [hospitalId, setHospitalId] = useState('');
  const [hospitalPw, setHospitalPw] = useState('');
  const [id, setId] = useState(false);
  const [pw, setPw] = useState(false);

  const joinClick = (event) => {
    event.preventDefault();
    axios.post('https://tukdoctor.shop/join/enterprise', { hospitalName, hospitalId, hospitalPw })
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
    <h4 htmlFor="hosname" className={styles.name}>이름</h4>
    <input
      type="name"
      id="name"
      className={styles.hosname}
      onFocus={() => {
        setId(true);
      }}
      onBlur={() => {
        setId(false);
      }}
      placeholder={id === true ? "" : "병원이름"}
      value={hospitalName}
      onChange={(e) => {
        setHospitalName(e.target.value);
      }}
    />

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
    <button className={styles.joinbtn} onClick={joinClick}>JOIN</button>
  </div>
  );
}

export default EntJoin;