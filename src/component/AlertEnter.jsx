import React, { useState } from 'react'
import axios from 'axios';

function AlertEnter() {
  const [data, setData] = useState(null);

  function handleApiSuccess() {
    axios.get('http://localhost:5000/api/hospitals', { responseType: 'json'})
      .then(response => {
        const confirmed = window.confirm("'안윤주'님이 4시에 예약하셨습니다.");
        if(confirmed) {
          setData(response.data);
        } else {
          console.log("예약이 취소되었습니다.");
        }
      })
      .catch(error => {
        console.log(error);
      });
    }

    return(
      <div>
        {data ? (
          <div>
            <h2>API</h2>
            <p>{data}</p>
          </div>
        ) : (
          <button onClick={handleApiSuccess}>예약</button>
        )}
      </div>
    );
}


export default AlertEnter;