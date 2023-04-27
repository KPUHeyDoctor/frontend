import { Link } from 'react-router-dom'
import LogoImg from '../img/heydoctor.png'
import styles from '../component/MemLogHeader.module.css'

function MemLogHeader() {
  return (
    <>
    <div className={styles.header}>
        <Link to="/">
          <img src={LogoImg} alt='logo' className={styles.logo}></img>
        </Link>

        {/* USERLIST */}
        <ul className={styles.userlist}>
          <li>이름</li>
          <li>
            <Link to="/mypage" className={styles.mypage}>MyPage</Link>
          </li>
          <li>
            <Link to="/" className={styles.logout}>LogOut</Link>
          </li>
        </ul>
    </div>
    </>
  );
}

export default MemLogHeader;