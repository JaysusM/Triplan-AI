import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SuggestedPlaces from './pages/PlacesPlanning';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/suggested-places/:city" element={<SuggestedPlaces />} />
      </Routes>
    </Router>
  );
};

export default App;
