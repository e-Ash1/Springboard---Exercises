import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Duke, Perry, Whiskey } from './images/index';
import DogList from './components/DogList';
import DogDetails from './components/DogDetails';
import Nav from './components/Nav';

const dogs = [
  {
    name: "Whiskey",
    age: 5,
    src: Whiskey,
    facts: [
      "Whiskey loves eating popcorn.",
      "Whiskey is a terrible guard dog.",
      "Whiskey wants to cuddle with you!"
    ]
  },
  {
    name: "Duke",
    age: 3,
    src: Duke,
    facts: [
      "Duke believes that ball is life.",
      "Duke likes snow.",
      "Duke enjoys pawing other dogs."
    ]
  },
  {
    name: "Perry",
    age: 4,
    src: Perry,
    facts: [
      "Perry loves all humans.",
      "Perry demolishes all snacks.",
      "Perry hates the rain."
    ]
  }
];

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/dogs" element={<DogList dogs={dogs} />} />
        <Route path="/dogs/:name" element={<DogDetails dogs={dogs} />} />
        <Route path="*" element={<Navigate replace to="/dogs" />} />
      </Routes>
    </Router>
  );
}

export default App;
