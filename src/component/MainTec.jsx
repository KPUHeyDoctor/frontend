import styles from '../component/MainTec.module.css';
import tec1 from '../img/tec1.png';
import tec2 from '../img/tec2.png';
import tec3 from '../img/tec3.png';

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
    <>
    <div className={styles.tec}>
      <div className={styles.tec1}>
        <img src={tec1} alt="챗봇바로가기" ></img>
        <button className={styles.tec1_1} onClick ={()=>{window.open(url)}} >바로가기</button>
      </div>

      <div className={styles.tec2}>
        <img src={tec2} alt="챗봇바로가기"></img>
        <button className={styles.tec2_1}>바로가기</button>
      </div>

      <div className={styles.tec3}>
        <img src={tec3} alt="챗봇바로가기"></img>
        <button className={styles.tec3_1} onClick={handleClick} >바로가기</button>
      </div>
    </div>
    </>
  );
}

export default MainTec;