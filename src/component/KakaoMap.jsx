import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../component/KakaoMap.module.css';

function KakaoMap() {
  const [state, setState] = useState({
    center: {
      lat: 37.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
    showMarkers: false,     // 전체병원 마커 보이기 여부 상태값
    markers: [],            // 전체병원 마커 위치 정보 배열
  });

  useEffect(() => {
    if (navigator.geolocation) {
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
    }
  }, []);

  const handleShowMarkers = () => {
    if (state.showMarkers) {
      setState((prev) => ({
        ...prev,
        showMarkers: false,
        markers: [],
      }));
    } else {
      axios.get('http://localhost:5000/api/hospitals')
        .then(response => {
          const markers = response.data.map(marker => ({
            name: marker.name,
            lat: marker.position_x,
            lng: marker.position_y,
          }));

          setState((prev) => ({
            ...prev,
            showMarkers: true,
            markers: markers,
          }));
        })
        .catch(error => console.log(error));
    }
  }

  return (
    <>
      <div className={styles.hoslist}>
        <div className={styles.btns}>
          <button className={styles.btn01} onClick={handleShowMarkers}>전체병원</button>
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
          <MapMarker
            position={state.center}    // 현재위치
            image={{
              src: "../img/cloca.gif",
              size: {
                width: 50,
                height: 50,
              }
            }}
           />
        )}

        {/* 전체병원 마커 표시 */}
        {state.showMarkers &&
          state.markers.map((marker, index) => (
            <MapMarker
              key={index}
              position={marker}
              title={marker.name}
            />
          ))
        }
      </Map>
    </>
  );
}

export default KakaoMap;
