import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PageLoader } from './components';

const LandingPage = lazy(() =>
  import('./pages/LandingPage').then((m) => ({ default: m.LandingPage }))
);
const Groups = lazy(() =>
  import('./pages/Groups').then((m) => ({ default: m.Groups }))
);
const Group = lazy(() =>
  import('./pages/Group').then((m) => ({ default: m.Group }))
);

const App = () => {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<PageLoader page="page" />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/group/:groupid" element={<Group />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;