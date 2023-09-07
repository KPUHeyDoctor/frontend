import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../component/EnterMain.module.css'

function EnterMain() {
  const [dataList, setDataList] = useState([]);
  const enterpriseName = localStorage.getItem('enterpriseName');

  useEffect(() => {
    if (enterpriseName) {
      axios
        .get('https://tukdoctor.shop/api/history/enterprise', {
          params: {
            enterpriseName: enterpriseName,
          },
        })
        .then((response) => {
          const newData = response.data;
          console.log(newData);
          newData.sort((a, b) => (a.historyTime > b.historyTime ? -1 : 1));
          setDataList(newData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [enterpriseName]);

  return (
    <div className={styles.enterdiv}>
      {dataList.length > 0 && (
        <div>
          <h1>{enterpriseName} 예약내역</h1>
          <ul>
            {dataList.map((data, index) => (
              <li className={styles.enterlist}>
                <p>예약환자: {data.username}</p>
                <p>의사: {data.doctorname}</p>
                <p>예약 시간: {data.historyTime}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default EnterMain;
