import React, { useState, useEffect } from 'react';
import './App.css';
import {World} from './classes/Cell.js';
import styled from 'styled-components';

const DeadCell = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px dotted green;
  border-radius: 20px;
  height: 2vw;
  width: 2vw;
  margin: 1px;
`

const LiveCell = styled.div`
  background-color: lightgreen;
  border: 2px solid green;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  height: 2vw;
  width: 2vw;
  margin: 1px;
`

const CellRow = styled.div`
  display: flex;
  flex-direction: row;
  height: 2vw;
  margin: 2px;
`

function App() {
  const [world, setWorld] = useState(new World(5,10));
  const [rows, setRows] = useState();
  const [ref,setRef] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);

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
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, step]);

  const toggle = () => {
    setIsActive(!isActive);
  }

  const resize = () => {
    world.resize(20,20);
    setRef(0);
    setRows(world.cells);
  }

  if (!world || !rows) {
    return <p>Preparing World...</p>;
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <>{world.cells.map(row=>{
          return <p>{row.map(cell=>cell.alive?'X':'O')}</p>
          // return <p>{row.map(cell=>cell.show())}</p>
        })}</> */}
        <>{rows.map(row=>{
          return <CellRow>{row.map(cell=>cell.alive?<LiveCell key={`${cell.row},${cell.column}`}></LiveCell>:<DeadCell key={`${cell.row},${cell.column}`}></DeadCell>)}</CellRow>
        })}</>
        <p>Generation: {world.generation}</p>
        <button onClick={random}>Randomize</button>
        <button onClick={step}>Step</button>
        <button onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={reset}>Reset</button>
        <button onClick={resize}>Resize</button>
      </header>
    </div>
  );
}

export default App;
