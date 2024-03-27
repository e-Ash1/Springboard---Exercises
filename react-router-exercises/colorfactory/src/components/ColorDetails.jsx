import React from 'react';
import { useParams, Navigate } from 'react-router-dom';

function ColorDetails() {
    const { color } = useParams();
    const colorStyle = { backgroundColor: color, width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' };

    //Thank you StackOverFlow!!!
    if (!/^#[0-9A-F]{6}$/i.test(color)) {
        return <Navigate to="/colors" replace />;
    }

    return (
        <div style={colorStyle}>
            <span className="text-white text-4xl font-bold">{color}</span>
        </div>
    );
}

export default ColorDetails;
