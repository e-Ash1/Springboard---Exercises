import React from 'react';

function Box({ index, width, height, backgroundColor, removeBox }) {
  const style = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: `${backgroundColor}`
  };

  return (
    <div>
      <div style={style}></div>
      <button onClick={() => removeBox(index)}>X</button>
    </div>
  );
}

export default Box;
