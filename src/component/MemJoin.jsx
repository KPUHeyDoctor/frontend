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

  const [isPhoneNumValid, setIsPhoneNumValid] = useState(false);
  const [isRrNumValid, setIsRrNumValid] = useState(false);

  const checkPhoneNum = () => {
    const inValid = member.phoneNum === member.phoneNumToCheck;
    setIsPhoneNumValid(inValid);
  };

  const checkRrNum = () => {
    const inValid = member.rrNum === member.rrNumToCheck;
    setIsRrNumValid(inValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 모든 입력값이 정확히 입력되었는지 확인
    for (let key in member) {
      if (!member[key]) {
        alert(`${key}를 입력해주세요.`);
        return;
      }
    }

    // 유효성 검사 통과 여부 확인
    if (isPhoneNumValid && isRrNumValid) {
      joinClick();
    } else {
      if (!isPhoneNumValid) {
        alert('전화번호를 확인해주세요.');
      }
      if (!isRrNumValid) {
        alert('주민등록번호를 확인해주세요.')
      }
    }
  };

  const joinClick = async () => {
    try {
      const formattedMember = {
        ...member,
        phoneNum: member.phoneNum.replace(/-/g, ''),
        rrNum: member.rrNum.replace(/-/g, '')
      };

      const response = await axios.post('https://tukdoctor.shop/api/join/member', formattedMember);
      console.log(response.data);
      if (response.data.message === 'ok') {

        localStorage.setItem('userName', member.userName);
        
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

        <form onSubmit={handleSubmit}>
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

          <h4 htmlFor="phonenum" className={styles.id}>전화번호 확인</h4>
          <input
            type='tel'
            id='phonenum'
            className={styles.phonenum}
            required
            placeholder='동일한 전화번호를 입력해주세요.'
            onChange={(e) => {
              setMember({...member, phoneNumToCheck: e.target.value});
              setIsPhoneNumValid(false);
            }}
            onBlur={checkPhoneNum}
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

          <h4 htmlFor="rrnum" className={styles.pw}>주민등록번호 확인</h4>
          <input 
            type="tel"
            id="rrnum"
            className={styles.rrnum}
            required
            placeholder='동일한 주민등록번호를 입력해주세요.'
            onChange={(e) => {
              setMember({...member, rrNumToCheck: e.target.value});
              setIsRrNumValid(false);
            }}
            onBlur={checkRrNum}
          />
        
          <button type="submit" className={styles.joinbtn}>JOIN</button>
        </form>
      </div>
    </>
  );
}

export default MemJoin;