import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import styles from '../component/KakaoMap.module.css';
import modallocation from '../img/modallocation.png';
import modalphone from '../img/modalphone.png';
import nearMarkerImage from '../img/near01.gif';

function KakaoMap() {
  const [state, setState] = useState({
    center: {
      lat: 37.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
    showMarkers: false,
    markers: [],
    nearestMarkerIndex: null, // 가장 가까운 마커의 인덱스
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    }
  }, []);

  // 영업 여부를 확인하는 함수
  const checkOpen = (timeStr) => {
    if (!timeStr) {
      return true;
    }

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

  // 내과
  const ShowMarkersNae = () => {
    axios.get('https://tukdoctor.shop/api/hospitals/categories/nae')
      .then(response => {
        const markers = response.data.map(marker => {
          const isOpen = checkOpen(marker.time);
          return{
            name: marker.BIZPLC_NM,
            lat: marker.REFINE_WGS84_LAT,
            lng: marker.REFINE_WGS84_LOGT,
            isOpen,
            time: marker.HOS_TIME,
          };
        });

        setState((prev) => ({
          ...prev,
          showMarkers: true,
          markers: markers,
        }));
      })
      .catch(error => console.log(error));
  };

  const findNearestMarker = React.useCallback(() => {
    const { markers, center } = state;
  
    let nearestMarkerIndex = null;
    let minDistance = Number.MAX_VALUE;
  
    for (let i = 0; i < markers.length; i++) {
      const marker = markers[i];
      const distance = getDistance(center.lat, center.lng, marker.lat, marker.lng);
  
      if (distance < minDistance) {
        minDistance = distance;
        nearestMarkerIndex = i;
      }
    }
  
    setState((prev) => ({
      ...prev,
      nearestMarkerIndex,
    }));
  }, [state]);
  

  const getDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // 지구의 반지름 (단위: km)
  
    const degToRad = (deg) => {
      return deg * (Math.PI / 180);
    };
  
    const dLat = degToRad(lat2 - lat1);
    const dLng = degToRad(lng2 - lng1);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
      
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
  
    return distance;
  };
  

  const [showModal, setShowModal] = useState(false);
  const [hospitalInfo, setHospitalInfo] = useState(null);     // 받아온 병원 정보를 저장할 상태

  function HospitalModal({ hospitalInfo, onClose }) {
    console.log(hospitalInfo);
    console.log(onClose);

    return (
      <div className={styles.modal}>
        <div className={styles.modalcontent}>
          <button className={styles.close} onClick={onClose}>X</button>

          <span className={styles.modalname}>
            {/* <img src={modalhospital} alt="" className={styles.modal1}/> */}
            <h1>{hospitalInfo[0].BIZPLC_NM}</h1>
          </span>

          <span className={styles.modaladdr}>
            <img src={modallocation} alt="" className={styles.modal2}/>
            <p>{hospitalInfo[0].REFINE_ROADNM_ADDR}</p>
          </span>

          <span className={styles.modalphone}>
            <img src={modalphone} alt="" className={styles.modal3}/>
            <p>{hospitalInfo[0].LOCPLC_FACLT_TELNO_DTLS}</p>
          </span>

          {/* <button className={styles.reserbtn}>예약하기</button> */}
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (state.markers.length > 0) {
      findNearestMarker();
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.markers.length]);  

  return (
    <>
      <div className={styles.hoslist}>
        <div className={styles.btns}>
          <button className={'&{styles.btn} &{styles.btn02}'} onClick={ShowMarkersNae}>가까운 내과 확인하기</button>
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
              src: "/img/cloca.gif",
              size: {
                width: 30,
                height: 30,
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
                axios.get('https://tukdoctor.shop/api/hospitals/categories/findName', { params: { hospital_name: selectedName } })
                  .then(response => {
                    setHospitalInfo(response.data);
                    // console.log(hospitalInfo);
                    setShowModal(true);
                    // console.log(showModal);
                  })
                  .catch(error => {
                    console.log(error)
                  })
              }}
              
              image={{
                src: index === state.nearestMarkerIndex ? nearMarkerImage : checkOpen(marker.time) ? "/img/start1.png" : "/img/end1.png",
                size: {
                  width: index === state.nearestMarkerIndex ? 60 : 30,
                  height: index === state.nearestMarkerIndex ? 60 : 30,
                },
              }}
            />
          ))
        }
        {showModal && <HospitalModal hospitalInfo={hospitalInfo} onClose={closeModal} />}
      </Map>
    </>
  );

  function closeModal() {
    setShowModal(false);
    setHospitalInfo(null);
  }

}
export default KakaoMap;