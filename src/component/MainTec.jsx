import { Link } from 'react-router-dom';
import styles from '../component/MainTec.module.css';
import chatimg from '../img/chat.png';
import myreser from '../img/myreser.png';

function MainTec() {
  // const url = "http://pf.kakao.com/_xoxlxdrxj"
  const url = "http://pf.kakao.com/_xoxlxdrxj/chat" //바로 채팅방

  function handleClick() {
    window.scroll({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    })
  }

  return (
    <div className={styles.tec}>
      <button onClick ={()=>{window.open(url)}}
      className={styles.chat}>
        <img src={chatimg} alt="챗봇바로가기"></img>
      </button>
      <Link to="/reser">
        <button className={styles.myreser}>
          <img src={myreser} alt="내예약내역"></img>
        </button>
      </Link>
      <button 
      onClick={handleClick}
      className={styles.map}>
        <img src={myreser} alt="내에약내역"></img>
      </button>
    </div>
  );
}

export default MainTec;