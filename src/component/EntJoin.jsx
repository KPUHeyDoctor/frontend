import { useState } from 'react';
import axios from 'axios';
import styles from '../component/EntJoin.module.css';
import join from '../img/join.png';

function EntJoin() {
  const [enter, setEnter] = useState({
    enterpriseName: '',
    enterpriseId: '',
    enterprisePw: '',
    enterprisePwToCheck: '',
  });

  const checkPw = () => {
    const invalid = enter.enterprisePw === enter.enterprisePwToCheck;
    // isPwValid 상태 변수를 제거하고 대신에 invalid 값을 사용
    // setIsPwValid(invalid);
    return invalid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 모든 필드가 정확히 입력되었는지 확인
    for (let key in enter) {
      if (!enter[key]) {
        alert(`${key}를 입력해주세요.`);
        return;
      }
    }

    // 비밀번호 일치 여부 확인
    if (enter.enterprisePw !== enter.enterprisePwToCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    joinClick();
  };

  const joinClick = async () => {
    try {
      const url = 'https://tukdoctor.shop/api/join/enterprise';
      const data = {
        enterpriseName: enter.enterpriseName,
        enterpriseId: enter.enterpriseId,
        enterprisePw: enter.enterprisePw,
      };

      const res = await axios.post(url, data);

      if (res.data.message === 'ok') {
        localStorage.setItem('enterpriseName', enter.enterpriseName);

        alert('회원가입이 완료되었습니다.');
        window.location.replace('/entlog');
      } else {
        alert('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.bg}>
      <div className={styles.join}>
        <img src={join} alt="회원가입" />
      </div>

      <form onSubmit={handleSubmit}>
        <h4 htmlFor="hosname" className={styles.name}>이름</h4>
        <input
          type="name"
          id="name"
          className={styles.hosname}
          value={enter.enterpriseName}
          required
          placeholder="병원 이름"
          onChange={(e) => {
            setEnter({ ...enter, enterpriseName: e.target.value });
          }}
        />

        <h4 htmlFor="hosid" className={styles.id}>병원아이디</h4>
        <input
          type="id"
          id="id"
          className={styles.hosid}
          value={enter.enterpriseId}
          required
          placeholder="HeyDoctor"
          onChange={(e) => {
            setEnter({ ...enter, enterpriseId: e.target.value });
          }}
        />

        <h4 htmlFor="hospw" className={styles.pw}>병원비밀번호</h4>
        <input
          type="pw"
          id="pw"
          className={styles.hospw}
          value={enter.enterprisePw}
          required
          placeholder="비밀번호"
          onChange={(e) => {
            setEnter({ ...enter, enterprisePw: e.target.value });
          }}
        />

        <h4 htmlFor="hospwToCheck" className={styles.pw}>병원비밀번호 확인</h4>
        <input
          type="pw"
          id="pwToCheck"
          className={styles.hospw}
          value={enter.enterprisePwToCheck}
          required
          placeholder="동일한 비밀번호를 입력해주세요."
          onChange={(e) => {
            setEnter({ ...enter, enterprisePwToCheck: e.target.value });
          }}
          onBlur={checkPw}
        />

        <button type="submit" className={styles.joinbtn}>
          JOIN
        </button>
      </form>
    </div>
  );
}

export default EntJoin;