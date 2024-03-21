import React, { useState } from 'react';
import Box from './Box/Box';
import NewBoxForm from './NewBoxForm/NewBoxForm';

function BoxList() {
  const [boxes, setBoxes] = useState([]);

  const addBox = (newBox) => {
    setBoxes(oldBoxes => [...oldBoxes, newBox]);
  };

  const removeBox = (index) => {
    setBoxes(boxes.filter((_, i) => i !== index));
  };

  return (
    <div>
      {boxes.map((box, index) => (
        <Box
          key={index}
          index={index}
          width={box.width}
          height={box.height}
          backgroundColor={box.backgroundColor}
          removeBox={removeBox}
        />
      ))}
      <NewBoxForm addBox={addBox} />
    </div>
  );
}

export default BoxList;
