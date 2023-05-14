import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoImg from '../img/heydoctor.png';
import styles from '../component/Header.module.css';
import axios from 'axios';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');

  const handleLogout = () => {
    axios.post('/logout', { phoneNum: phoneNum })
      .then((res) => {
        setIsLoggedIn(false);
        setUserName('');
        setPhoneNum('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios.get('/protected')
      .then((res) => {
        if (res.data && res.data.phoneNum) {
          setIsLoggedIn(true);
          setUserName(res.data.userName);
        }
      })
      .catch((err) => {
        setIsLoggedIn(false);
        setUserName('');
      });
  }, []);

  return (
    <>
      <div className={styles.header}>
        <Link to="/choologin">
          <img src={LogoImg} alt='logo' className={styles.logo}></img>
        </Link>

        {/* USERLIST */}
        <ul className={styles.userlist}>
          {isLoggedIn ? (
            <>
              <li>
                <span className={styles.login}>{userName}</span>
              </li>
              <li>
                <Link to="/logout" className={styles.logout} onClick={handleLogout}>LogOut</Link>
              </li>
              <li>
                <Link to="/mypage" className={styles.mypage}>MyPage</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/choologin" className={styles.login}>Login</Link>
              </li>
              <li>
                <Link to="/choojoin" className={styles.join}>Join</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default Header;