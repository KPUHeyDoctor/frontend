import React, { useState } from 'react';
import styles from '../Resertime.module.css';
import { useLocation } from 'react-router-dom';

function TimeModal() {
  const location = useLocation();
  const doctorData = location.state.doctorData;
  const [selectedTime, setSelectedTime] = useState('');
  const userName = localStorage.getItem('userName');

  const availableTimes1 = [
    '09:00', '09:30',
    '10:00', '10:30',
    '11:00', '11:30',
  ];

  const availableTimes2 = [
    '13:00', '13:30',
    '14:00', '14:30',
    '15:00', '15:30',
  ];

  const availableTimes3 = [
    '16:00', '16:30',
    '17:00', '17:30'
  ];

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handleReservation = () => {
    const currentDate = new Date().toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'long'
    }).replace(/\//g, '.');

    const message = `${userName}님! \n'${currentDate} ${selectedTime} ${doctorData.doctorName}의사' 예약이 완료되었습니다.`;
    alert(message);

    const reservation = {
      doctorname: doctorData.doctorName,
      historyTime: selectedTime,
      historyBoolean: true,
    };

    saveReservationToLocalStorage(reservation);

    window.location.reload();
  };
  
  const saveReservationToLocalStorage = (reservation) => {
    const storedReservations = JSON.parse(localStorage.getItem('reservations')) || [];
    storedReservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(storedReservations));
  };
  
  
  return (
    <div className={styles.bg}>
    <h2 className={styles.hosname}>{doctorData.selectedName}</h2>
    <div className={styles.container}>
      <div className={styles.doctor}>
        <h3>예약 가능한 시간</h3>
        <ul className={styles.ull}>
          <h4>오전</h4>
          {availableTimes1.map((time, index) => (
            <li
              key={index}
              onClick={() => handleTimeClick(time)}
              className={`${styles.timeSlot} ${
                selectedTime === time ? styles.selectedTime : ''
              }`}
            >
              {time} {selectedTime === time}
            </li>
          ))}
          <br /><br />
          <h4>오후</h4>
          {availableTimes2.map((time, index) => (
            <li
              key={index}
              onClick={() => handleTimeClick(time)}
              className={`${styles.timeSlot} ${
                selectedTime === time ? styles.selectedTime : ''
              }`}
            >
              {time} {selectedTime === time}
            </li>
          ))}
          <br /><br />
          {availableTimes3.map((time, index) => (
            <li
              key={index}
              onClick={() => handleTimeClick(time)}
              className={`${styles.timeSlot} ${
                selectedTime === time ? styles.selectedTime : ''
              }`}
            >
              {time} {selectedTime === time}
            </li>
          ))}
        </ul>
        {selectedTime && (
          <div className={styles.center}>
            <button className={styles.buton} onClick={handleReservation}>
              예약하기
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
  );
}

export default TimeModal;
