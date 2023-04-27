import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../component/Resertime.module.css';
import TimePicker from 'react-time-picker';

function Resertime() {
  const [time, setTime] = useState('10:00');

  const handleTimeChange = (time) => {
    setTime(time);
  };

  return(
    <div className={styles.bg}>
      <h2 className={styles.hosname}>병원</h2>
      <TimePicker
        onChange = {handleTimeChange}
        value={time}
      />
      <span className={styles.pass}>
        <Link to ="/reser">
          <button className={styles.before}>이전</button>
        </Link>
        <Link to ="/time">
          <button className={styles.next}>다음</button>
        </Link>
      </span>
      
    </div>
  );
}

export default Resertime;