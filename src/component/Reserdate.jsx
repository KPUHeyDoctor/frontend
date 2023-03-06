import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { Link } from 'react-router-dom';
import styles from '../component/Reserdate.module.css';

function Reserdate() {
  const [value, onChange] = useState(new Date());

  return(
    <div className={styles.bg}>
      <h2 className={styles.hosname}>병원</h2>
      
      <Calendar onChange={onChange} value={value} />

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

export default Reserdate;