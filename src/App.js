import React, { useState, useEffect } from 'react';
import './App.css';
import {Cell,World} from './classes/Cell.js';
import styled from 'styled-components';

const Board = styled.div`
  max-width: 90vw;
  max-height: 90vw;
`

const DeadCell = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px dotted green;
  height: 1vw;
  width: 1vw;
  margin: -1px;
`

const LiveCell = styled.div`
  background-color: lightgreen;
  border: 1px solid green;
  border-radius: 20%;
  display: flex;
  flex-direction: column;
  height: 1vw;
  width: 1vw;
  margin: -1px;
`
// margin: 1px;

const CellRow = styled.div`
  display: flex;
  flex-direction: row;
  height: 1vw;
  margin: 2px;
`

function App() {
  const [world, setWorld] = useState(new World(25,25));
  const [rows, setRows] = useState();
  const [ref,setRef] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [speed, setSpeed] = useState(1000);

  useEffect(()=>{
    if (world) {
      setRows(world.cells);
    }
  },[])

  const random = () => {
    world.randomize();
    setRef(ref+1);
  }

  const step = () => {
    world.run(1);
    setRef(ref+1);
  }

  const jump = () => {
    world.run(5);
    setRef(ref+5);
  }

  const reset = () => {
    setIsActive(false);
    setSeconds(0);
    world.reset();
    setRef(0);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
        step();
      }, speed);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, step, speed]);

  const toggle = () => {
    setIsActive(!isActive);
  }

  const resize = (height,width) => {
    world.resize(height,width);
    setRef(0);
    setRows(world.cells);
  }

  const flip = (row,col) => {
    if (!isActive) {
      world.flip(row,col);
      setRef(ref+1);
    }
  }

  if (!world || !rows) {
    return <p>Preparing World...</p>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Conway's Game of Life</h1>
        {/* <>{world.cells.map(row=>{
          return <p>{row.map(cell=>cell.alive?'X':'O')}</p>
          // return <p>{row.map(cell=>cell.show())}</p>
        })}</> */}
        <Board>{rows.map(row=>{
          return <CellRow>{row.map(cell=>cell.alive?<LiveCell key={`${cell.row},${cell.column}`} onClick={()=>flip(cell.row,cell.column)}></LiveCell>:<DeadCell key={`${cell.row},${cell.column}`} onClick={()=>flip(cell.row,cell.column)}></DeadCell>)}</CellRow>
        })}</Board>
        <p>Generation: {world.generation}</p>
        <button onClick={random}>Randomize</button>
        <button onClick={step}>Step</button>
        <button onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={reset}>Reset</button>
        <button onClick={()=>resize(10,10)}>10x10</button>
        <button onClick={()=>resize(20,20)}>20x20</button>
        <button onClick={()=>resize(25,25)}>25x25</button>
        <button onClick={()=>resize(25,50)}>25x50</button>
        <button onClick={()=>resize(50,50)}>50x50</button>
        <button onClick={jump}>Jump Ahead 5 Generations</button>
        <button onClick={()=>setSpeed(1000)}>Slow ></button>
        <button onClick={()=>setSpeed(500)}>Fast >></button>
        <button onClick={()=>setSpeed(250)}>Faster >>></button>
      </header>
    </div>
  );
}

export default App;
