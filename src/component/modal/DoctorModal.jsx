import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../Reserdoc.module.css';
import doc01 from '../../img/doctorF.png';
import doc02 from '../../img/doctorM.png';

function DoctorModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const doctorData = location.state.doctorData;

  const handleReservation = (doctor) => {

    navigate('/timemodal', { state: { doctorData: doctor } });
  };

  return (
    <div className={styles.bg}>
      <h2 className={styles.hosname}>{doctorData.selectedName}</h2>
      <div className={styles.container}>
        <div className={styles.doctor}>
          {doctorData.map((doctor, index) => (
            <button key={index} onClick={() => handleReservation(doctor)}>
              <img src={index === 0 ? doc01 : doc02} alt={`의사${index + 1}`} />
              <div className={styles.doctorInfo}>
                <h3>{doctor.doctorName}</h3>
                <p>전문분야: {doctor.doctorField}</p>
                <p>진료과: {doctor.doctorMedical}</p>
                <p>휴진: {doctor.doctorTime}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DoctorModal;