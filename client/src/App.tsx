import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage, GroupPage } from './pages';
import { Groups } from './pages/Groups';
import { useAppDispatch } from './state/stateHooks';

import './App.scss';
import { useEffect } from 'react';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: 'SET_APP_STATE',
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/group/:groupid" element={<GroupPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
