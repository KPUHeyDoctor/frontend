import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EnterMain() {
  const [dataList, setDataList] = useState([]);
  const enterpriseName = localStorage.getItem('enterpriseName');

  useEffect(() => {
    if (enterpriseName) {
      axios.get('https://tukdoctor.shop/api.example.com/api/history/enterprise', {
        params: {
          enterpriseName: enterpriseName
        }
      })
      .then(response => {
        const newData = response.data;
        console.log(newData);
        setDataList(prevDataList => [newData, ...prevDataList]);
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, [enterpriseName]);

  return (
    <div>
      {dataList.length > 0 && (
        <div>
          <h1>{enterpriseName} 예약내역</h1>
          <ul>
            {dataList.map((data, index) => (
              <li key={index}>
                <p>사용자: {data.username}</p>
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
