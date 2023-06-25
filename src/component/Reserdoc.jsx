import { useEffect, useState } from 'react';
import styles from '../component/Reserdoc.module.css';
import doc01 from '../img/doc01.png';
import doc02 from '../img/doc02.png';

function Reserdoc() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorInfo, setDoctorInfo] = useState(null);

  useEffect(() => {
    if (selectedDoctor) {
      fetchDoctorInfo(selectedDoctor);
    }
  }, [selectedDoctor]);

  const fetchDoctorInfo = async (doctorName) => {
    try {
      const response = await fetch(`/api/reservation/doctor?doctorName=${doctorName}`);
      const data = await response.json();
      setDoctorInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDoctorSelect = (doctorName) => {
    setSelectedDoctor(doctorName);
  };

  return (
    <div className={styles.bg}>
      <h2 className={styles.hosname}>병원</h2>
      <div className={styles.doctor}>
        <button className={styles.doc01} onClick={() => handleDoctorSelect('장인')}>
          <img src={doc01} alt="의사1" />
        </button>
        <button className={styles.doc02} onClick={() => handleDoctorSelect('장인2')}>
          <img src={doc02} alt="의사2" />
        </button>
      </div>
      {doctorInfo && (
        <div className={styles.doctorInfo}>
          <h3>{doctorInfo[0].doctorName}</h3>
          <p>진료과: {doctorInfo[0].doctorMedical}</p>
          <p>전문 분야: {doctorInfo[0].doctorField}</p>
          <p>진료 시간: {doctorInfo[0].doctorTime}</p>
        </div>
      )}
    </div>
  );
}

export default Reserdoc;
