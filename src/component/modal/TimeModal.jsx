import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function TimeModal() {
  const location = useLocation();
  const doctorData = location.state.doctorData;

  const availableTimes = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
  ];

  
  const [selectedTime, setSelectedTime] = useState('');
  const userName = localStorage.getItem('userName');

  const handleTimeClick = (time) => {
    setSelectedTime(time);
  };

  const handleReservation = () => {
    const currentDate = new Date().toLocaleDateString('ko-KR',
    {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'long'
    }).replace(/\//g, '.');

    const message = `${userName}님! '${currentDate} ${selectedTime} ${doctorData.doctorName}의사' 예약이 완료되었습니다.`;
    
    console.log(message);
  };

  return (
    <div>
      <h2>의사 예약 시간 선택</h2>
      <div>
        <p>의사: {doctorData.doctorName}</p>
        <p>전문분야: {doctorData.doctorField}</p>
        <p>진료과: {doctorData.doctorMedical}</p>
        <p>휴진: {doctorData.doctorTime}</p>
      </div>
      <h3>예약 가능한 시간</h3>
      <ul>
        {availableTimes.map((time, index) => (
          <li key={index} onClick={() => handleTimeClick(time)}>
            {time} {selectedTime === time && '(선택됨)'}
          </li>
        ))}
      </ul>
      {selectedTime && (
        <button onClick={handleReservation}>예약하기</button>
      )}
    </div>
  );
}

export default TimeModal;
