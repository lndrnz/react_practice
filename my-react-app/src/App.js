import './App.css';
import { useState } from 'react';

function App() {
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [addedSquares, setAddedSquares] = useState([]);

  const handleAddButtonClick = () => {
    if (selectedSquare !== null) {
      setAddedSquares([...addedSquares, selectedSquare]); //Sets added squares array to added squares and the selected square
    }
  };

  const handleDeleteButtonClick = () => {
    if (addedSquares.length > 0) {
      setAddedSquares(addedSquares.slice(0, -1)); // Removes the last number from the squares array
    }
  };

  const handleSquareClick = (index) => {
    if (selectedSquare === index) {
      setSelectedSquare(null);
    } else {
      setSelectedSquare(index); // sets selectedSquare to whatever index is in context of ternary operator
    }
  };

  const renderAddedSquares = () => {
    return addedSquares.map((squareIndex, index) => (
      <div
        key={index}
        className={`square ${squareIndex === 0 ? 'red' : squareIndex === 1 ? 'blue' : squareIndex === 2 ? 'green' : squareIndex === 3 ? 'yellow' : 'purple'}`}
      ></div>
    ));
  };

  return (
    <>
        <button onClick={handleAddButtonClick}>Add</button>
        <button onClick={handleDeleteButtonClick}>Delete</button>
      <div className='flex'>
        <div
          className={`red ${selectedSquare === 0 ? 'selected' : ''}`}
          onClick={() => handleSquareClick(0)} // sets selected Square to 0
        ></div>
        <div
          className={`blue ${selectedSquare === 1 ? 'selected' : ''}`}
          onClick={() => handleSquareClick(1)} // sets selectedSquare to 1
        ></div>
        <div
          className={`green ${selectedSquare === 2 ? 'selected' : ''}`}
          onClick={() => handleSquareClick(2)}
        ></div>
        <div
          className={`yellow ${selectedSquare === 3 ? 'selected' : ''}`}
          onClick={() => handleSquareClick(3)}
        ></div>
        <div
          className={`purple ${selectedSquare === 4 ? 'selected' : ''}`}
          onClick={() => handleSquareClick(4)}
        ></div>
      </div>
      <div className='flex'>
        {renderAddedSquares()}
        {/* {console.log(addedSquares)} */}
      </div>
    </>
  );
}

export default App;
