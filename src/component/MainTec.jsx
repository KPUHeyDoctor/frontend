import { Link } from 'react-router-dom';
import styles from '../component/MainTec.module.css';
import chatimg from '../img/chat.png';
import myreser from '../img/myreser.png';

function MainTec() {
  // const url = "http://pf.kakao.com/_xoxlxdrxj"
  const url = "http://pf.kakao.com/_xoxlxdrxj/chat" //바로 채팅방
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
    </div>
  );
}

export default MainTec;