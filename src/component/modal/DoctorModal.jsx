import { useLocation } from 'react-router-dom';
import styles from '../Reserdoc.module.css';
import doc01 from '../../img/doc01.png';
import doc02 from '../../img/doc02.png';

function DoctorModal() {
  const location = useLocation();
  const doctorData = location.state.doctorData;

  const handleReservation = (doctor) => {
    const currentDate = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'long' }).replace(/\//g, '.');
    const message = `'${currentDate} ${doctor.doctorName}의사' 예약이 완료되었습니다.`;
    
    console.log(message);

    alert(message);
  };

  return (
    <div className={styles.bg}>
      <h2 className={styles.hosname}>병원</h2>
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