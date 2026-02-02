import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage, Groups, Group } from './pages';


const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/group/:groupid" element={<Group />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;