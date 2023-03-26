import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../component/JHTest.module.css';

function JHTest() {
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
  
  // 전체병원
  const ShowMarkersAll = () => {
    axios.get('http://localhost:5001/api/hospitals/categories/all')
      .then(response => {
        const markers = response.data.map(marker => ({
          name: marker.BIZPLC_NM,
          lat: marker.REFINE_WGS84_LAT,
          lng: marker.REFINE_WGS84_LOGT,
        }));
        setState((prev) => ({
          ...prev,
          showMarkers: true,
          markers: [
            ...prev.markers, // 이전 마커 데이터 유지
            ...markers // 새로운 마커 데이터 추가
          ],
        }));
      })
      .catch(error => console.log(error));
  };
  
  // 내과
  const ShowMarkersNae = () => {
    axios.get('http://localhost:5001/api/hospitals/categories/nae')
      .then(response => {
        const markers = response.data.map(marker => ({
          name: marker.BIZPLC_NM,
          lat: marker.REFINE_WGS84_LAT,
          lng: marker.REFINE_WGS84_LOGT,
        }));
        setState((prev) => ({
          ...prev,
          showMarkers: true,
          markers: [
            ...prev.markers, // 이전 마커 데이터 유지
            ...markers // 새로운 마커 데이터 추가
          ],
        }));
      })
      .catch(error => console.log(error));
  };
  
  //이비인후과
  const ShowMarkersEbin = () => {
    axios.get('http://localhost:5001/api/hospitals/categories/ebin')
      .then(response => {
        const markers = response.data.map(marker => ({
          name: marker.BIZPLC_NM,
          lat: marker.REFINE_WGS84_LAT,
          lng: marker.REFINE_WGS84_LOGT,
        }));
        setState((prev) => ({
          ...prev,
          showMarkers: true,
          markers: [
            ...prev.markers, // 이전 마커 데이터 유지
            ...markers // 새로운 마커 데이터 추가
          ],
        }));
      })
      .catch(error => console.log(error));
  };
  
  //소아과
  const ShowMarkersKids = () => {
    axios.get('http://localhost:5001/api/hospitals/categories/kids')
      .then(response => {
        const markers = response.data.map(marker => ({
          name: marker.BIZPLC_NM,
          lat: marker.REFINE_WGS84_LAT,
          lng: marker.REFINE_WGS84_LOGT,
        }));
        setState((prev) => ({
          ...prev,
          showMarkers: true,
          markers: [
            ...prev.markers, // 이전 마커 데이터 유지
            ...markers // 새로운 마커 데이터 추가
          ],
        }));
      })
      .catch(error => console.log(error));
  };
  
  //정형외과
  const ShowMarkersBone = () => {
    axios.get('http://localhost:5001/api/hospitals/categories/bone')
      .then(response => {
        const markers = response.data.map(marker => ({
          name: marker.BIZPLC_NM,
          lat: marker.REFINE_WGS84_LAT,
          lng: marker.REFINE_WGS84_LOGT,
        }));
        setState((prev) => ({
          ...prev,
          showMarkers: true,
          markers: [
            ...prev.markers, // 이전 마커 데이터 유지
            ...markers // 새로운 마커 데이터 추가
          ],
        }));
      })
      .catch(error => console.log(error));
  };
  
  return (
    <>
      <div className={styles.hoslist}>
        <div className={styles.btns}>
          <button className={'&{styles.btn} &{styles.btn01}'} onClick={ShowMarkersAll}>전체병원</button>
          <button className={'&{styles.btn} &{styles.btn02}'} onClick={ShowMarkersNae}>내과</button>
          <button className={'&{styles.btn} &{styles.btn03}'} onClick={ShowMarkersEbin}>이비인후과</button>
          <button className={'&{styles.btn} &{styles.btn04}'} onClick={ShowMarkersKids}>소아과</button>
          <button className={'&{styles.btn} &{styles.btn05}'} onClick={ShowMarkersBone}>정형외과</button>
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

        {state.showMarkers &&
          state.markers.map((marker, index) => (
            <MapMarker
              key={index}
              position={marker}
              title={marker.name}
              onClick={() => {
                const selectedName = marker.name;
                axios.get('http://localhost:5000', { params: { name: selectedName } })
                  .then(response => {
                    console.log(response.data);
                  })
                  .catch(error => {
                    console.log(error)
                  })
              }}
            />
          ))
        }
      </Map>
    </>
  );
}
export default JHTest;