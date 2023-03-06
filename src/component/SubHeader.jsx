import { Link } from 'react-router-dom'
import LogoImg from '../img/heydoctor.png'
import styles from '../component/SubHeader.module.css'

function SubHeader() {
  return (
    <div className={styles.subheader}>
      <Link to="/">
        <img src={LogoImg} alt='logo' className={styles.logo}></img>
      </Link>
    </div>
  );
}

export default SubHeader;