import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ColorList, ColorForm, ColorEditForm, ColorDetails } from './components/index.js';


function App() {
    const [colors, setColors] = useState(() => {
        const savedColors = localStorage.getItem('colors');
        return savedColors ? JSON.parse(savedColors) : [];
    });

    useEffect(() => {
        localStorage.setItem('colors', JSON.stringify(colors));
    }, [colors]);

    const addColor = (newColor) => {
        setColors(currentColors => [newColor, ...currentColors]);
    };

    const deleteColor = (colorName) => {
        setColors(currentColors => currentColors.filter(color => color.name !== colorName));
    };

    return (
        <Router>
            <div className="flex h-screen" style={{ backgroundImage: "linear-gradient(90.5deg, rgba(255,207,139,0.50) 1.1%, rgba(255,207,139,1) 81.3%)" }}>
                <div className="w-64 p-5 transition duration-300 ease-in-out" style={{ backgroundImage: "linear-gradient(rgba(255,207,139,0.85), rgba(255,207,139,1))" }}>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/colors" className="block p-3 rounded text-gray-800 hover:bg-orange-600 transition duration-200">
                                Colors
                            </Link>
                        </li>
                        <li>
                            <Link to="/colors/new" className="block p-3 rounded text-gray-800 hover:bg-orange-600 transition duration-200">
                                Add Color
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex-1 p-10 overflow-auto">
                    <Routes>
                        <Route path="/" element={<div className="text-center text-2xl font-bold p-10 text-gray-800">Welcome to the Color App!</div>} />
                        <Route path="/colors" element={<ColorList colors={colors} deleteColor={deleteColor} />} />
                        <Route path="/colors/new" element={<ColorForm addColor={addColor} />} />
                        <Route path="/colors/edit/:colorName" element={<ColorEditForm colors={colors} setColors={setColors} />} />
                        <Route path="/colors/:color" element={<ColorDetails />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;