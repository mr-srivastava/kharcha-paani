import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage, GroupPage } from "./pages";
import { Groups } from "./pages/Groups";

import "./App.scss";

const App = () => {
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
