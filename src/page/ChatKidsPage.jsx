import Header from '../component/Header';
import ChatKids from '../component/ChatKids';

export default function ChatKidsPage() {
  return(
    <>
    <Header />
    <div style={{ marginTop: '60px' }}>
      <ChatKids />
    </div>
    </>
  );
}