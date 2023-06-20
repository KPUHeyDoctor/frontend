import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoImg from '../img/heydoctor.png';
import styles from '../component/Header.module.css';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
        const storedUserName = localStorage.getItem('userName');
        setUserName(storedUserName);
      }
    };
  
    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.replace('/');
  };

  return (
    <>
      <div className={styles.header}>
        <Link to="/">
          <img src={LogoImg} alt="logo" className={styles.logo}></img>
        </Link>

        {/* USERLIST */}
        <ul className={styles.userlist}>
          {isLoggedIn ? (
            <>
              <li>
                <span className={styles.login}>{userName}</span>
              </li>
              <li>
                <Link to="/mypage" className={styles.mypage}>
                  MyPage
                </Link>
              </li>
              <li>
                <Link to="/logout" className={styles.logout} onClick={handleLogout}>
                  LogOut
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/choologin" className={styles.login}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/choojoin" className={styles.join}>
                  Join
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default Header;
