import './App.scss';
import Header from './components/Header/Header';
import { Link, Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';

const App = () => {
  return (
    <div className="app-container">
      <PerfectScrollbar>
        <div className='header-container'>
          <Header />
        </div>

        <div className='main-container'>
          <div className='app-content'>
            <Outlet />
          </div>
        </div>
      </PerfectScrollbar>
    </div>
  );
}

export default App;
