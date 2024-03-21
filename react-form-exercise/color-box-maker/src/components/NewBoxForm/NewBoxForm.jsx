import React, { useState } from 'react';


function NewBoxForm({ addBox }) {
  const [formData, setFormData] = useState({
    width: '',
    height: '',
    backgroundColor: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addBox({ ...formData});
    setFormData({ width: '', height: '', backgroundColor: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="width">Width:</label>
        <input
          id="width"
          name="width"
          value={formData.width}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="height">Height:</label>
        <input
          id="height"
          name="height" 
          value={formData.height}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="backgroundColor">Background Color:</label>
        <input
          id="backgroundColor"
          name="backgroundColor"
          value={formData.backgroundColor}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Add Box</button>
    </form>
  );
}

export default NewBoxForm;
