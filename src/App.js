import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Navbar from './Components/Navbar';
import CharactersList from './Pages/CharactersList';
import CharacterDetail from './Pages/CharacterDetail';
import CharacterByLocation from './Pages/CharacterByLocation';
import Episodes from './Pages/Episodes';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<CharactersList />} />
          <Route path="/characters" element={<CharactersList />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
          <Route path="/locations" element={<CharacterByLocation />} />
          <Route path="/episodes" element={<Episodes />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
