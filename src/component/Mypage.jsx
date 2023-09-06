import React, { useState, useEffect } from 'react';
import styles from '../component/Mypage.module.css';
import mypage from '../img/mypage.png';
import axios from 'axios';

function Mypage() {
  const [reservations, setReservations] = useState([]);
  const [reservationMessage, setReservationMessage] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);

      axios.get(`api/history/user?userName=${storedUserName}`)
        .then((response) => {
          const sortedReservations = response.data.reverse();
          setReservations(sortedReservations);
        })
        .catch((error) => {
          console.error('API 요청 에러:', error);
        });
    }
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
                {reservations && reservations.map((reservation, index) => (
                  <li key={index}>{reservation.doctorname} - {reservation.historyTime} - {reservation.historyBoolean ? '확인됨' : '미확인'}</li>
                ))}
              </ul>
            </div>
            {reservationMessage && <p className={styles.reservationMessage}>{reservationMessage}</p>}
          </>
        )}
      </div>
    </>
  );
}

export default Mypage;
