import { Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';
import Nav from './components/Nav';

const Layout = () => {
  return (
    <div>
      <Nav />

      <Outlet />
    </div>
  )
}


function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path = "/" element={<Layout />}> 
          <Route index element = {<LoginPage />} /> {/* 기본설정 페이지 */}
          <Route path = "main" element={<MainPage />} /> {/* path가 main이라면 main page로 이동 */}
          <Route path = ":movieId" element={<DetailPage/>} /> {/* path가 main이라면 main page로 이동 */}
          <Route path = "search" element={<SearchPage/>} /> {/* path가 main이라면 main page로 이동 */}
        </Route>

      </Routes>
    </div>
  );
}

export default App;
