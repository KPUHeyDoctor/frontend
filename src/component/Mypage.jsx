import React, { useState } from 'react';
import styles from '../component/Mypage.module.css';
import mypage from '../img/mypage.png';

function Mypage({ reservations }) {
  
  return (
    <>
      <div className={styles.bg}>
        <div className={styles.mypage}>
          <img src={mypage} alt="마이페이지" />
        </div>
        <div className={styles.list}>
          <ul>
            {reservations.map((reservation, index) => (
              <li key={index}>{reservation}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
  }

export default Mypage;