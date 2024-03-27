import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ColorEditForm({ colors, setColors }) {
    const { colorName } = useParams();
    const navigate = useNavigate();

    const colorToEdit = colors.find(color => color.name === colorName) || { name: '', value: '#ffffff' };
    const [name, setName] = useState(colorToEdit.name);
    const [color, setColor] = useState(colorToEdit.value);

    useEffect(() => {
        setName(colorToEdit.name);
        setColor(colorToEdit.value);
    }, [colorToEdit]);

    const handleChange = (e) => {
        const { value } = e.target;
        setColor(value);
    };

    const handleColorRemove = () => {
        const updatedColors = colors.filter(c => c.name !== colorName);
        setColors(updatedColors);
        navigate('/colors');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedColors = colors.map(c => c.name === colorName ? { ...c, name, value: color } : c);
        setColors(updatedColors);
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
                        className="shadow appearance-none border rounded w-16 h-16"
                        id="color"
                        type="color"
                        value={color}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Update Color
                    </button>
                    <button
                        className="text-red-500 hover:text-red-700 font-bold py-2 px-4"
                        onClick={handleColorRemove}
                        aria-label={`Remove ${name}`}
                    >
                        Remove Color
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ColorEditForm;
