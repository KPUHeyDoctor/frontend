import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styles from '../component/MapBone.module.css';
import modallocation from '../img/modallocation.png';
import modalphone from '../img/modalphone.png';

function ChatBone() {
  const [state, setState] = useState({
    center: {
      lat: 37.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
    showMarkers: false,
    markers: [],
    nearestMarkerIndex: null, // 가장 가까운 위치의 마커
  });

  // 정형외과
  const ShowMarkersBone = useCallback(() => {
    axios
      .get('https://tukdoctor.shop/api/hospitals/categories/bone')
      .then((response) => {
        const markers = response.data.map((marker) => {
          const isOpen = checkOpen(marker.time);
          return {
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
      .catch((error) => console.log(error));
  }, []);

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
    ShowMarkersBone();
  }, [ShowMarkersBone]);

  const checkOpen = (timeStr) => {
    if (!timeStr) {
      return true;
    }

    const [startHour, startMinute, endHour, endMinute] = timeStr.split(/[:~-]/);
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    if (currentHour >= startHour && currentHour <= endHour) {
      if (currentHour === startHour && currentHour === endHour) {
        return currentMinute >= startMinute && currentMinute < endMinute;
      }
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

  const getNearestLocation = useCallback(() => {
    const getDistance = (lat1, lng1, lat2, lng2) => {
      const earthRadius = 6371; // 지구의 반지름 (단위: km)
    
      // 각도를 라디안으로 변환
      const toRadians = (degrees) => {
        return degrees * (Math.PI / 180);
      };
    
      // 위도 및 경도 차이 계산
      const deltaLat = toRadians(lat2 - lat1);
      const deltaLng = toRadians(lng2 - lng1);
    
      // Haversine 공식 적용
      const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(toRadians(lat1)) *
          Math.cos(toRadians(lat2)) *
          Math.sin(deltaLng / 2) *
          Math.sin(deltaLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = earthRadius * c;
    
      return distance;
    };

    const { markers, center } = state;
    let nearestDistance = Infinity;
    let nearestIndex = null;

    markers.forEach((marker, index) => {
      const { lat, lng } = marker;
      const distance = getDistance(center.lat, center.lng, lat, lng);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setState((prev) => ({
      ...prev,
      nearestMarkerIndex: nearestIndex,
    }));
  }, [state]);

  useEffect(() => {
    if (!state.isLoading) {
      getNearestLocation();
    }
  }, [state.isLoading, getNearestLocation]);

  const [showModal, setShowModal] = useState(false);
  const [hospitalInfo, setHospitalInfo] = useState(null);

  function HospitalModal({ hospitalInfo, onClose }) {
    return (
      <div className={styles.modal}>
        <div className={styles.modalcontent}>
          <button className={styles.close} onClick={onClose}>X</button>

          <span className={styles.modalname}>
            <h1>{hospitalInfo[0].BIZPLC_NM}</h1>
          </span>

          <span className={styles.modaladdr}>
            <img src={modallocation} alt="" className={styles.modal2} />
            <p>{hospitalInfo[0].REFINE_ROADNM_ADDR}</p>
          </span>

          <span className={styles.modalphone}>
            <img src={modalphone} alt="" className={styles.modal3} />
            <p>{hospitalInfo[0].LOCPLC_FACLT_TELNO_DTLS}</p>
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Map
        center={state.center}
        className={styles.map}
        level={3}
      >
        {!state.isLoading && (
          <MapMarker
            position={state.center}
            image={{
              src: "../img/cloca.gif",
              size: {
                width: 50,
                height: 50,
              },
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
                axios
                  .get('https://tukdoctor.shop/api/hospitals/categories/findName', {
                    params: { hospital_name: selectedName },
                  })
                  .then((response) => {
                    setHospitalInfo(response.data);
                    setShowModal(true);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
              image={{
                src:
                  index === state.nearestMarkerIndex
                    ? "../img/ambulance.gif"
                    : checkOpen(marker.time)
                    ? "../img/start1.png"
                    : "../img/end1.png",
                size: {
                  width: 30,
                  height: 30,
                },
              }}
            />
          ))}
        {showModal && <HospitalModal hospitalInfo={hospitalInfo} onClose={closeModal} />}
      </Map>
    </>
  );

  function closeModal() {
    setShowModal(false);
    setHospitalInfo(null);
  }
}

export default ChatBone;
