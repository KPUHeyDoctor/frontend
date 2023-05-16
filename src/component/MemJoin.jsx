import { useState } from 'react';
import axios from 'axios';
import styles from '../component/MemJoin.module.css';
import join from '../img/join.png';

function MemJoin() {

  const [member, setMember] = useState({
    userName: '',
    phoneNum: '',
    rrNum: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let key in member) {
      if (!member[key]) {
        alert(`${key}를 입력해주세요.`);
        return;
      }
    }
    await joinClick();
  };
  
  const joinClick = async () => {
    try {
      const response = await axios.post('https://tukdoctor.shop/api/join/member', member);
      console.log(response.data);
      if (response.data.message === 'ok') {
        alert('회원가입이 완료되었습니다.');
        window.location.replace('/memlog');
      } else {
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <div className={styles.bg}>
      <div className={styles.join}>
      <img src={join} alt="회원가입"></img>
    </div>

    <form onSubmit={handleSubmit} />
      <h4 htmlFor="username" className={styles.name}>이름</h4>
      <input 
        type="name"
        id="username"
        className={styles.username}
        value={member.userName}
        required
        placeholder="이름"
        onChange={(e) => {
          setMember({...member, userName: e.target.value});
        }}  
      />

      <h4 htmlFor="phonenum" className={styles.id}>전화번호</h4>
      <input 
        type="tel"
        id="phonenum"
        className={styles.phonenum}
        value={member.phoneNum}
        required
        placeholder='010-0000-0000'
        onChange={(e) => {
          setMember({...member, phoneNum: e.target.value});
        }}
      />

      <h4 htmlFor="rrnum" className={styles.pw}>주민등록번호</h4>
      <input 
        type="tel"
        id="rrnum"
        className={styles.rrnum}
        value={member.rrNum}
        required
        placeholder='000000-0000000'
        onChange={(e) => {
          setMember({...member, rrNum: e.target.value});
        }}
      />
      
    <button type="submit" className={styles.joinbtn} onClick={joinClick}>JOIN</button>
  </div>
    </>
  );
}

export default MemJoin;