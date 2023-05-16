import { useState } from 'react';
import axios from 'axios';
import styles from '../component/MemLog.module.css';
import login from '../img/login.png';

function MemLog() {

  const [member, setMember] = useState({
    phoneNum: '',
    rrNum: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const loginClick = async () => {
    try {
      const res = await axios.post('https://tukdoctor.shop/api/login/member', member);
      console.log(res.data);
      if (res.data.message === 'Login successful!') {
        console.log('로그인 성공');

        //save token to local storage
        localStorage.setItem('token', res.data.token);

        //set logged in state to true
        //redirect to logged in page
        window.location.replace('/');
      } else if (res.data.message === 'Invalid credentials!') {
        console.log('로그인 실패');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.bg}>
      <div className={styles.log}>
        <img src={login} alt="로그인"></img>
      </div>

      <form onSubmit={handleSubmit} />
        <h4 htmlFor="phonenum" className={styles.id}>전화번호</h4>
        <input
          type='tel'
          id='phonenum'
          className={styles.phonenum}
          value={member.phoneNum}
          required
          placeholder='010-0000-0000'
          onFocus={() => {
            setMember({...member, phoneNum: '' });
          }}
        />

        <h4 htmlFor="rrnum" className={styles.pw}>주민등록번호</h4>
        <input
          type='tel'
          id='rrnum'
          className={styles.rrnum}
          value={member.rrNum}
          required
          placeholder='000000-0000000'
          onFocus={() => {
            setMember({...member, rrNum: '' });
          }}
        />
      <button className={styles.logbtn} onClick={loginClick}>LOGIN</button>
    </div>
  );
}

export default MemLog;