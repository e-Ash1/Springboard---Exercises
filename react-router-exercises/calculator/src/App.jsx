import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Calculator } from './Calculator';

import './App.css'

function App() {
  return (
    <>
    <BrowserRouter>
      <Route path="/add/:num1/:num2" element={<Calculator operation="add" />} />
      <Route path="/subtract/:num1/:num2" element={<Calculator operation="subtract" />} />
      <Route path="/multiply/:num1/:num2" element={<Calculator operation="multiply" />} />
      <Route path="/divide/:num1/:num2" element={<Calculator operation="divide" />} />  
    </BrowserRouter>

    <li>
      <Link to="/add/1/2" className="block p-3 rounded hover:bg-gray-700 transition duration-200">
          Calculator
      </Link>
    </li>
    </>
  )
}

export default App
