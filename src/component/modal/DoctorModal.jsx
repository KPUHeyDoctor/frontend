import React, { useState } from 'react';
import styles from '../Reserdoc.module.css';
import doc01 from '../../img/doc01.png';
import doc02 from '../../img/doc02.png';

function DoctorModal() {
  const [reservations, setReservations] = useState([]);

  const doctors = [
    {
      name: '박정수',
      specialty: '재활전문의',
      offDay: '수요일',
    },
    {
      name: '이민수',
      specialty: '심장전문의',
      offDay: '목요일',
    },
  ];

  const handleReservation = (doctor) => {
    const currentDate = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'long' }).replace(/\//g, '.');
    const message = `'${currentDate} ${doctor.name}의사' 예약이 완료되었습니다.`;
    
    console.log(message);
    setReservations([...reservations, message]);

    alert(message);
  };

  return (
    <div className={styles.bg}>
      <h2 className={styles.hosname}>병원</h2>
      <div className={styles.container}>
        <div className={styles.doctor}>
          <button className={styles.doc01} onClick={() => handleReservation(doctors[0])}>
            <img src={doc01} alt="의사1" />
            <div className={styles.doctorInfo}>
              <h3>{doctors[0].name}</h3>
              <p>진료과: {doctors[0].specialty}</p>
              <p>휴진: 매주 <b>{doctors[0].offDay}</b></p>
            </div>
          </button>
          <button className={styles.doc02} onClick={() => handleReservation(doctors[1])}>
            <img src={doc02} alt="의사2" />
            <div className={styles.doctorInfo}>
              <h3>{doctors[1].name}</h3>
              <p>진료과: {doctors[1].specialty}</p>
              <p>휴진: 매주 <b>{doctors[1].offDay}</b></p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DoctorModal;
