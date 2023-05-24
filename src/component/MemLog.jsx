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
      const formattedMember = {
        ...member,
        phoneNum: member.phoneNum.replace(/-/g, ''),
        rrNum: member.rrNum.replace(/-/g, '')
      };

      const res = await axios.post('https://tukdoctor.shop/api/login/member', formattedMember);

      if (res.data.userName) {
        console.log(res.data.userName);

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

      <form onSubmit={handleSubmit}>
        <h4 htmlFor="phonenum" className={styles.id}>전화번호</h4>
        <input
          type='tel'
          id='phonenum'
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
          type='tel'
          id='rrnum'
          className={styles.rrnum}
          value={member.rrNum}
          required
          placeholder='000000-0000000'
          onChange={(e) => {
            setMember({...member, rrNum: e.target.value});
          }}
        />
      </form>
      <button className={styles.logbtn} onClick={loginClick}>LOGIN</button>
    </div>
  );
}

export default MemLog;