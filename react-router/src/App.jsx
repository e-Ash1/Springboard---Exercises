import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './NavBar';
import VendingMachine from './VendingMachine';
import Snack from './Snack';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<VendingMachine />} />
        <Route path="/snack/:snackId" element={<Snack />} />
      </Routes>
    </Router>
  );
}

export default App;
