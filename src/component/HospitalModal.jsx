import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../component/KakaoMap.module.css';
import modallocation from '../img/modallocation.png';
import modalphone from '../img/modalphone.png';

function HospitalModal({ hospitalInfo, onClose }) {
  const navigate = useNavigate();

  const handleReserveClick = () => {
    const enterpriseName = hospitalInfo[0].BIZPLC_NM;
    axios
      .get(`https://tukdoctor.shop/api/reservation?enterpriseName=${enterpriseName}`)
      .then((response) => {
        const hospitalInfo = response.data;
        navigate('/ReserDoc', { state: { hospitalInfo } });
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

        <button className={styles.reserbtn} onClick={handleReserveClick}>예약하기</button>
      </div>
    </div>
  );
}

export default HospitalModal;
