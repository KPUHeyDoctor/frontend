import styles from '../component/EntJoin.module.css';
import join from '../img/join.png';

function EntJoin() {
  return(
  <div className={styles.bg}>
    <div className={styles.join}>
      <img src={join} alt="회원가입입"></img>
    </div>
  </div>
  );
}

export default EntJoin;