import React, { useState } from 'react';
import styles from '../component/Mypage.module.css';
import mypage from '../img/mypage.png';

import DoctorModal from '../component/modal/DoctorModal.jsx';

function Mypage() {
  const [reservations, setReservations] = useState([]);
  
  const addReservation = (message) => {
    setReservations([...reservations, message]);
  };

  return (
    <>
      <div className={styles.bg}>
        <div className={styles.mypage}>
          <img src={mypage} alt="마이페이지" />
        </div>
        <div className={styles.list}>
          <ul>
            {reservations.map((reservation, index) => (
              <li key={index}>
                <p>{reservation}</p>
              </li>
            ))}
          </ul>
        </div>
        <DoctorModal onReservation={addReservation} />
      </div>
    </>
  );
  }

export default Mypage;