import './App.css';
import { useState, useEffect } from 'react';
import { collection, db, getDoc, getDocs, doc, updateDoc, runTransaction } from './config/firebase';


function App() {
  const [selectedSquare, setSelectedSquare] = useState(null);
  
  const [addedSquares, setAddedSquares] = useState([]);

  useEffect(() => {
    console.log("Rendering")
    const fetchSquares = async () => {
      const squaresCollection = collection(db, 'squares');
      const squaresSnapshot = await getDocs(squaresCollection);
      const squaresList = squaresSnapshot.docs.map(doc => ({id: doc.id, color: doc.data().color}));
      console.log("Squares", squaresList);
      setAddedSquares(squaresList);
    }
    fetchSquares();
  },[])

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

  const handleSquareClick = (color) => {
    if (selectedSquare === color) {
      setSelectedSquare(null);
    } else {
      setSelectedSquare(color); // sets selectedSquare to whatever index is in context of ternary operator
    }
  };

 

  const renderAddedSquares = () => {
    return addedSquares.map(({id, color}, index) => (
      <div
        key={index}
        onClick={async () => {
          const squareRef = doc(db, "squares", id);
          console.log("squareref", squareRef)
          await updateDoc(squareRef, {
            color: selectedSquare
          });
          await getDoc(squareRef);
          // Fetch the document using its reference
          const squareSnapshot = await getDoc(squareRef);

          if (squareSnapshot.exists()) {
            // The document exists, update its color
            console.log(squareSnapshot.data())
            await updateDoc(squareRef, {
              color: selectedSquare
            });
            console.log("Updated Square");
            const updatedSquare = await getDoc(squareRef)
            const updatedSquareData = updatedSquare.data();
            const newSquares = addedSquares.map(square => {
              console.log("square", square)
              if(square.id === updatedSquare.id){
                return {
                  id: updatedSquare.id,
                  color: updatedSquareData.color
                }
              }
              return square;
            })
            console.log("New Squares", newSquares)
            setAddedSquares(newSquares);
          } else {
            console.log("Document does not exist");
          }
        }}
        // onClick={async () => {
        //   const squareRef = doc(db, "squares", id);
        //   console.log("squareRef", squareRef);
  
        //   try {
        //     const updatedSquareSnapshot = await runTransaction(db, async (transaction) => {
        //       const squareSnapshot = await transaction.get(squareRef);
  
        //       if (!squareSnapshot.exists()) {
        //         console.log("Document does not exist");
        //         return null;
        //       }
  
        //       // Get the current color
        //       const currentColor = squareSnapshot.data().color;
  
        //       // Update the color to a new value
        //       transaction.update(squareRef, { color: selectedSquare });

        //       const updated = await transaction.get(squareRef)
  
        //       return updated; // Return the snapshot of the updated document
        //     });
  
        //     if (updatedSquareSnapshot !== null) {
        //       const updatedSquareData = updatedSquareSnapshot.data();
        //       console.log("Updated Square Data:", updatedSquareData);
        //       console.log("Updated Square", updatedSquareSnapshot.id);
        //       const newSquares = addedSquares.map(square => {
        //         console.log("square", square)
        //         if(square.id === updatedSquareSnapshot.id){
        //           return {
        //             id: updatedSquareSnapshot.id,
        //             color: updatedSquareData.color
        //           }
        //         }
        //         return square;
        //       })
        //       console.log("New Squares", newSquares)
        //       setAddedSquares(newSquares);
        //     }
        //   } catch (error) {
        //     console.error("Transaction failed: ", error);
        //   }
        // }}
        className={`square ${color}`}
        // {...console.log(squareIndex)}
      ></div>
    ));
  };

  
  return (
    <>
        <button onClick={handleAddButtonClick}>Add</button>
        <button onClick={handleDeleteButtonClick}>Delete</button>
      <div className='flex'>
        <div
          className={`red ${selectedSquare === "red" ? 'selected' : ''}`}
          onClick={() => handleSquareClick("red")} // sets selected Square to 0
        ></div>
        <div
          className={`blue ${selectedSquare === "blue" ? 'selected' : ''}`}
          onClick={() => handleSquareClick("blue")} // sets selectedSquare to 1
        ></div>
        <div
          className={`green ${selectedSquare === "green" ? 'selected' : ''}`}
          onClick={() => handleSquareClick("green")} // sets selectedSquare to 2
        ></div>
        <div
          className={`yellow ${selectedSquare === "yellow" ? 'selected' : ''}`}
          onClick={() => handleSquareClick("yellow")} // sets selectedSquare to 3
        ></div>
        <div
          className={`purple ${selectedSquare === "purple" ? 'selected' : ''}`}
          onClick={() => handleSquareClick("purple")} // sets selectedSquare to 4
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
