import Header from '../component/Header';
import ChatNae from '../component/ChatNae';

export default function ChatNaePage() {
  return(
    <>
    <Header />
    <div style={{ marginTop: '60px' }}>
      <ChatNae />
    </div>
    </>
  );
}