import { useState } from 'react'

function Square({value, onSquareClick}) {

  return <button className='square' onClick={onSquareClick}>{value}</button>
}

function Board({isXnext, square, currentMove, onPlay}) {
  const[win, setWin] = useState(false);
  const[winner, setWinner] = useState('');
  let status = !win ? (isXnext ? 'Next turn X' : 'Next turn O') : winner; 

  function handleClick(params) {
    if (currentMove < 1) setWin(false);

    if (square[params] || win && currentMove > 0) return;

    const newArray = square.slice();
    newArray[params] = isXnext ? 'X' : 'O';

    onPlay(newArray, !isXnext);

    calculateWinner(newArray, params);
  }

  function calculateWinner(array, i) {
    const arrWin = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]

    let fill = arrWin.filter(el => el.includes(i));

    if (fill.length > 0) {
      for (let index = 0; index < fill.length; index++) {
        const [a,b,c] = fill[index];
        if (array[a] && array[a] === array[b] && array[a] === array[c]) {
          setWin(true);
          setWinner(`Winner : ${array[a]}`)
          return array[a];
        }
        
      }

    }
    return false
    
  }
    
  return (
    <div>
      {win ? (
        <div>
          <h1>{winner}</h1>
        </div>
      ) : (
        <div className='status'>{status}</div>
      )}
      <div className='board'>
        <Square value={square[0]} onSquareClick={()=>handleClick(0)}></Square>
        <Square value={square[1]} onSquareClick={()=>handleClick(1)}></Square>
        <Square value={square[2]} onSquareClick={()=>handleClick(2)}></Square>
        <Square value={square[3]} onSquareClick={()=>handleClick(3)}></Square>
        <Square value={square[4]} onSquareClick={()=>handleClick(4)}></Square>
        <Square value={square[5]} onSquareClick={()=>handleClick(5)}></Square>
        <Square value={square[6]} onSquareClick={()=>handleClick(6)}></Square>
        <Square value={square[7]} onSquareClick={()=>handleClick(7)}></Square>
        <Square value={square[8]} onSquareClick={()=>handleClick(8)}></Square>
      </div>
    </div>
  )
}

function Info({arr, onMoveClick}) {
  return (
    <div>
      <ol>
       {arr.map((item,i) => (
          <li key={item}>
              <button className='move' onClick={()=>onMoveClick(i)}>{i > 0 ? (
                `Pindah ke move #${i}`
              ) : (
                'Mulai permainan!'
              )}</button>
          </li>
        ))} 
      </ol> 
    </div>
  )
}

function App() {

  const[history, setHistory] = useState([Array(9).fill(null)]);
  const[isXnext, setIsXnext] = useState(true);
  const[currentMove, setCurrentMove] = useState((history.length-1))
  

  
  function handlePlay(arr, val) {
    const newArr = [...history.slice(0, currentMove + 1), arr]
    setHistory(newArr);
    setCurrentMove(newArr.length-1);
    setIsXnext(val);
  }

  function handleMove(index) {
    setCurrentMove(index);
    setIsXnext(index % 2 === 0 ? true : false);
  }

  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board isXnext={isXnext} square={history[currentMove]} onPlay={(arr, val)=>handlePlay(arr, val) } currentMove={currentMove}/>
        </div>
        <div className="game-info">
          <Info arr={history} onMoveClick={(index)=>handleMove(index)}/>
        </div>
      </div>
    </>
  )
}

export default App
