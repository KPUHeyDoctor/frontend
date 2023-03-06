import { Link } from 'react-router-dom'
import LogoImg from '../img/heydoctor.png'
import styles from '../component/Header.module.css'

function Header() {
  return (
    <>
    <div className={styles.header}>
        <Link to="/">
          <img src={LogoImg} alt='logo' className={styles.logo}></img>
        </Link>

        {/* USERLIST */}
        <ul className={styles.userlist}>
          <li>
            <Link to="/choologin" className={styles.login}>Login</Link>
          </li>
          <li>
            <Link to="/choojoin" className={styles.join}>Join</Link>
          </li>
          <li>
            <Link to="/mypage" className={styles.mypage}>MyPage</Link>
          </li>
        </ul>
    </div>
    </>
  );
}

export default Header;