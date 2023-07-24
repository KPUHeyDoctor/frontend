import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from '../component/Reserdoc.module.css';
import doc01 from '../img/doc01.png';
import doc02 from '../img/doc02.png';

function Reserdoc() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [enterpriseName, setEnterpriseName] = useState('');

  const location = useLocation();
  const { hospitalInfo } = location.state || {};

  useEffect(() => {
    if (hospitalInfo && hospitalInfo.length > 0) {
      setSelectedDoctor(hospitalInfo[0]);
      setEnterpriseName(hospitalInfo[0].BIZPLC_NM);
    }
  }, [hospitalInfo]);

  return (
    <div className={styles.bg}>
      <h2 className={styles.hosname}>{enterpriseName}</h2>
      <div className={styles.container}>
        <div className={styles.doctor}>
          <button className={styles.doc01}>
            <img src={doc01} alt="의사1" />
            {selectedDoctor && (
              <div className={styles.doctorInfo}>
                <h3>{selectedDoctor.doctorName}</h3>
                <p>진료과: {selectedDoctor.doctorMedical}</p>
                <p>학력: {selectedDoctor.doctorField}</p>
                <p>휴진: {selectedDoctor.doctorTime}</p>
              </div>
            )}
          </button>
          <button className={styles.doc02}>
            <img src={doc02} alt="의사2" />
            {selectedDoctor && (
              <div className={styles.doctorInfo}>
                <h3>{selectedDoctor.doctorName}</h3>
                <p>진료과: {selectedDoctor.doctorMedical}</p>
                <p>학력: {selectedDoctor.doctorField}</p>
                <p>휴진: {selectedDoctor.doctorTime}</p>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Reserdoc;
