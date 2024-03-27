import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ColorForm({ addColor }) {
    const [name, setName] = useState('');
    const [color, setColor] = useState('#ffffff');
    const [colorList, setColorList] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { value } = e.target;
        setColor(value);
        if (!colorList.includes(value)) {
            setColorList([...colorList, value]);
        }
    };

    const handleColorRemove = (colorToRemove) => {
        const updatedColorList = colorList.filter((c) => c !== colorToRemove);
        setColorList(updatedColorList);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (addColor) {
            addColor({ name, value: color });
        }
        navigate('/colors');
    };

    return (
        <div className="max-w-xs mx-auto mt-10">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Color Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Color name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">
                        Color
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="color"
                        type="color"
                        value={color}
                        onChange={handleChange}
                        required
                    />
                    <div className="mt-2 w-10 h-10 rounded-full" style={{ backgroundColor: color }}></div>
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded transition duration-200" type="submit">
                        Add Color
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ColorForm;
