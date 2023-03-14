import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './page/MainPage.jsx';
import ChooseLogin from './page/ChooseLogin.jsx';
import ChooseJoin from './page/ChooseJoin.jsx';
import MemberLogin from './page/MemberLogin.jsx';
import EnterLogin from './page/EnterLogin.jsx';
import MemberJoin from './page/MemberJoin.jsx';
import EnterJoin from './page/EnterJoin.jsx';
import ReserDoc from './page/ReserDoc.jsx';
import ReserDate from './page/ReserDate.jsx';
import ReserTime from './page/ReserTime.jsx';
import MyPage from './page/MyPage.jsx';

function App() {

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/choologin" element={<ChooseLogin />}/>
        <Route path="/choojoin" element={<ChooseJoin />}/>
        <Route path="/memlog" element={<MemberLogin />}/>
        <Route path="/entlog" element={<EnterLogin />}/>
        <Route path="/memjoin" element={<MemberJoin />}/>
        <Route path="/entjoin" element={<EnterJoin />}/>
        <Route path="/reser" element={<ReserDoc />}/>
        <Route path="/date" element={<ReserDate />}/>
        <Route path="/time" element={<ReserTime />}/>
        <Route path="/mypage" element={<MyPage />}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;