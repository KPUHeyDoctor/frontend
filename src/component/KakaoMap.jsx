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

    axios.get('http://localhost:5000/api/hospitals')
      .then(response => {
        const markers = response.data.map(marker => {
          const isOpen = checkOpen(marker.time);
          return {
            name: marker.name,
            lat: marker.lat,
            lng: marker.lng,
            isOpen,
          };
        });

        setState((prev) => ({
          ...prev,
          markers,
        }));
      })
      .catch(error => console.log(error));
  }, []);

    // 영업 여부를 확인하는 함수
    const checkOpen = (timeStr) => {
      // 문자열을 ":"을 기준으로 분리하여 시간과 분으로 나눔
      const [startHour, startMinute, endHour, endMinute] = timeStr.split(/[:~-]/);
      // 현재 시간을 가져옴
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
  
      // 현재 시간이 startHour와 endHour 사이에 있는 경우 영업중으로 판단
      if (currentHour >= startHour && currentHour <= endHour) {
        // startHour와 endHour가 같은 경우, startMinute과 endMinute을 비교하여 판단
        if (currentHour === startHour && currentHour === endHour) {
          return currentMinute >= startMinute && currentMinute < endMinute;
        }
        // startHour와 endHour가 다른 경우, startHour와 endHour을 비교하여 판단
        if (currentHour === startHour) {
          return currentMinute >= startMinute;
        }
        if (currentHour === endHour) {
          return currentMinute < endMinute;
        }
        return true;
      }
      return false;
    };
  
    const handleShowMarkers = () => {
      if (state.showMarkers) {
        setState((prev) => ({
          ...prev,
          showMarkers: false,
          markers: [],
        }));
      } else {
        axios.get('http://localhost:5000/api/hospitals/categories/all')
        .then(response => {
          const markers = response.data.map(marker => {
            const isOpen = checkOpen(marker.time);
            return {
              name: marker.name,
              lat: marker.lat,
              lng: marker.lng,
              isOpen,
              time: marker.time,
            };
          });
  
          setState((prev) => ({
            ...prev,
            showMarkers: true,
            markers,
          }));
        })
        .catch(error => console.log(error));
      }
    };
  
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
                image={{
                  src: checkOpen(marker.time) ? "../img/cloca.gif" : "../img/cloca.png",
                  size: {
                    width: 50,
                    height: 50,
                  },
                }}
              />
            ))
          }
        </Map>
      </>
    );
  }

export default KakaoMap;