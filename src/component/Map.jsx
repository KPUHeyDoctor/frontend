import axios from 'axios';
import { Map, MapMarker} from 'react-kakao-maps-sdk';
import { useState, useEffect} from 'react';
import styles from '../component/Map.module.css';

function KakaoMap() {
  const [state, setState] = useState({
    center: {
      lat: 37.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

  useEffect(() => {
    if(navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다.
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, //경도
            },
            isLoading: false,
          }));

        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }))
        }
      );
    } else {
    }
  }, []);

  const [buttonText, setButtonText] = useState('전체병원')

  function btn01Click() {
    axios.get('http://localhost:5000/api/hospitals')
      .then(response => {
        setButtonText(console.log(response.data));
      })
      .catch(error => error);
  } 

  return (
    <>
    <div className={styles.hoslist}>
      <div className={styles.btns}>
        <button onClick={btn01Click} className={styles.btn01}>
          {buttonText}</button>
        <button className={styles.btn02}>내과</button>
        <button className={styles.btn03}>이비인후과</button>
        <button className={styles.btn04}>소아과</button>
        <button className={styles.btn05}>정형외과</button>
      </div>
    </div>
    <Map // 지도를 표시할 Container
      center={state.center}
      className={styles.map}
      level={3} // 지도의 확대 레벨
    >
      {!state.isLoading && (
        <MapMarker position={state.center}    // 현재위치
          image={{src: "../img/cloca.gif",
          size: {
            width: 50,
            height: 50,
          }}}>
        </MapMarker>
      )}
    </Map>
    </>
  );
}



export default KakaoMap;