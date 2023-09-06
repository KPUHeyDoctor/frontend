import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './page/MainPage.jsx';
import EntMainPage from './page/EntMainPage.jsx';
import ChooseLogin from './page/ChooseLogin.jsx';
import ChooseJoin from './page/ChooseJoin.jsx';
import MemberLogin from './page/MemberLogin.jsx';
import EnterLogin from './page/EnterLogin.jsx';
import MemberJoin from './page/MemberJoin.jsx';
import EnterJoin from './page/EnterJoin.jsx';

import Resdoc from './component/Reserdoc.jsx'

import ReserDoc from './page/ReserDoc.jsx';
import ReserTime from './page/ReserTime.jsx';
import MyPage from './page/MyPage.jsx';
// import MapCateAll from './page/MapCateAll.jsx';
// import MapCateNae from './page/MapCateNae.jsx';
// import MapCateEbin from './page/MapCateEbin.jsx';
// import MapCateKids from './page/MapCateKids.jsx';
// import MapCateBone from './page/MapCateBone.jsx';

import DoctorModal from './page/ReserDoc.jsx'
import TimeModal from './page/ReserTime.jsx';

import ChatNaePage from './page/ChatNaePage.jsx';
import ChatEbinPage from './page/ChatEbinPage.jsx';
import ChatKidsPage from './page/ChatKidsPage.jsx';
import ChatBonePage from './page/ChatBonePage.jsx';


function App() {

  return(
    <BrowserRouter>
      <Routes>

        <Route path="/reserdoc" element={<Resdoc />}/>
        <Route path="/doctormodal" element={<DoctorModal />}/>
        <Route path="/timemodal" element={<TimeModal />} />

        <Route path="/" element={<MainPage />}/>
        <Route path="/EntMainPage" element={<EntMainPage/>}/>
        <Route path="/choologin" element={<ChooseLogin />}/>
        <Route path="/choojoin" element={<ChooseJoin />}/>
        <Route path="/memlog" element={<MemberLogin />}/>
        <Route path="/entlog" element={<EnterLogin />}/>
        <Route path="/memjoin" element={<MemberJoin />}/>
        <Route path="/entjoin" element={<EnterJoin />}/>
        <Route path="/reser" element={<ReserDoc />}/>
        <Route path="/date" element={<ReserTime />}/>
        <Route path="/mypage" element={<MyPage />}/>

        {/* <Route path='/categories/all' element={<MapCateAll />} />
        <Route path='/categories/nae' element={<MapCateNae />} />
        <Route path='/categories/ebin' element={<MapCateEbin />} />
        <Route path='/categories/kids' element={<MapCateKids />} />
        <Route path='/categories/bone' element={<MapCateBone />} /> */}

        {/* 챗봇 */}
        <Route path='/categories/nae/sughospital' element={<ChatNaePage />} />
        <Route path='/categories/ebin/sughospital' element={<ChatEbinPage />} />
        <Route path='/categories/kids/sughospital' element={<ChatKidsPage />} />
        <Route path='/categories/bone/sughospital' element={<ChatBonePage />} />

      </Routes>
    </BrowserRouter>
    
  );
}

export default App;