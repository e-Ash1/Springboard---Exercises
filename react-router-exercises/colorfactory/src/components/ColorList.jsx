import React from 'react';
import { Link } from 'react-router-dom';

function ColorList({ colors, deleteColor }) {
    return (
        <div className="p-4">
            <Link to="/colors/new" className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded transition duration-200">
                Add a Color
            </Link>
            <div className="grid grid-cols-3 gap-4 mt-4">
                {colors.map((color, index) => (
                    <div key={index} className="block p-4 rounded-lg shadow-lg bg-white">
                        <div className="w-full h-20 rounded-full" style={{ backgroundColor: color.value }}></div>
                        <h2 className="mt-2 font-bold">{color.name}</h2>
                        <button onClick={() => deleteColor(color.name)} className="text-sm bg-red-500 hover:bg-red-700 text-white font-bold mr-2 py-1 px-2 rounded">
                            Delete
                        </button>
                        <Link to={`/colors/edit/${color.name}`} className="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                            Edit
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ColorList;
