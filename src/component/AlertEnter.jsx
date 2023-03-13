import { useState, useEffect } from 'react';
import axios from 'axios';

function AlertEnter() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/hospitals');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    setData([]);
    fetchData();
  }

  return (
    <>
      <div>
        <button onClick={handleClick}>데이터 가져오기</button>
        {data.length > 0 && (
          <ul>
            {data.map((item, index) => (
              <li key={index}>
                <h2>{item.name}</h2>
                <p>이름: {item.name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default AlertEnter;
