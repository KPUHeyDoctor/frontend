import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LogoImg from '../img/heydoctor.png';
import styles from '../component/Header.module.css';
import axios from 'axios';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
        fetchUserInfo(); // 사용자 정보를 가져오는 로직을 useEffect 내에서 호출
      }
    };
  
    checkLoginStatus();
  }, []);
  
  const fetchUserInfo = async () => {
    try {
      const res = await axios.get('https://tukdoctor.shop/api/userinfo', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (res.data.userName) {
        // 로그인된 사용자 이름이 localStorage에 저장되어 있다면 가져와서 설정
        const storedUserName = localStorage.getItem('userName');
        setUserName(storedUserName);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    axios
      .post('https://tukdoctor.shop/api/logout', { phoneNum: phoneNum })
      .then((res) => {
        setIsLoggedIn(false);
        setUserName('');
        setPhoneNum('');
        window.location.replace('/');
      })
      .catch((err) => {
        console.log(err);
      });
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
                <Link to="/logout" className={styles.logout} onClick={handleLogout}>
                  LogOut
                </Link>
              </li>
              <li>
                <Link to="/mypage" className={styles.mypage}>
                  MyPage
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
