import React, { useState, useEffect } from 'react';
import styles from '../component/Mypage.module.css';
import mypage from '../img/mypage.png';

function Mypage() {
  const [reservations, setReservations] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  useEffect(() => {
    const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
    setReservations(storedReservations.reverse());
  }, []);

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.mypage}>
          <img src={mypage} alt="마이페이지" />
        </div>
        {userName && (
          <>
            <h2 className={styles.userName}>{userName}님의 예약 내역</h2>
            <div className={styles.list}>
              <ul>
                {reservations.map((reservation, index) => (
                  <li key={index}>
                    {reservation.doctorname} - {reservation.historyTime} - {reservation.historyBoolean ? '확인됨' : '미확인'}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Mypage;
