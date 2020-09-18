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

const NumberInput = styled.input`
  width: 30px;
`

const ButtonBox = styled.div`
  margin: 4px;
  display: flex;
  flex-direction: row;
`

const Label = styled.span`
  margin-left: 5px;
  margin-right: 5px;
  color: green;
`

const ActiveLabel = styled.span`
  margin-left: 5px;
  margin-right: 5px;
  color: lightgreen;
`

const Icon = styled.i`
  margin-left: 5px;
  margin-right: 5px;
  color: green;
`

const ActiveIcon = styled.i`
  margin-left: 5px;
  margin-right: 5px;
  color: lightgreen;
`

function App() {
  const [world, setWorld] = useState(new World(25,25));
  const [rows, setRows] = useState();
  const [ref,setRef] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [speed, setSpeed] = useState(1000);
  const [size, setSize] = useState(2);

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

  const resize = (height,width,size) => {
    setSize(size);
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
        {ref===0?<ActiveLabel>I recommend you start with the Randomize <i className="fas fa-random" /> button below.</ActiveLabel>:<></>}
        {ref===1?<><ActiveLabel>Click the cells to change their status.</ActiveLabel><ActiveLabel>Press the Play <i className="fas fa-play" /> button below when you're ready to watch your world develop.</ActiveLabel></>:<></>}
        <Board>{rows.map(row=>{
          return <CellRow>{row.map(cell=>cell.alive?<LiveCell key={`${cell.row},${cell.column}`} onClick={()=>flip(cell.row,cell.column)}></LiveCell>:<DeadCell key={`${cell.row},${cell.column}`} onClick={()=>flip(cell.row,cell.column)}></DeadCell>)}</CellRow>
        })}</Board>
        <ActiveIcon className="fas">Generation: {world.generation}</ActiveIcon>
        <ButtonBox>
          <Icon className="fas fa-undo" onClick={reset} title="Reset" />
          {ref===0?<ActiveIcon className="fas fa-random" onClick={random} title="Randomize" />:<Icon className="fas fa-random" onClick={random} title="Randomize" />}
          {isActive? <ActiveIcon className="fas fa-pause" onClick={toggle} title="Pause" />:ref===0?<Icon className="fas fa-play" onClick={toggle} title="Play" />:<ActiveIcon className="fas fa-play" onClick={toggle} title="Play" />}
          <Icon className="fas fa-step-forward" onClick={step} title="Step Forward" />
          <Icon className="fas fa-fast-forward" onClick={jump} title="Jump Forward">
             {/* <NumberInput type="text" defaultValue="5"></NumberInput> */}
           </Icon>
        </ButtonBox>
        <ButtonBox>
          <ActiveIcon className="fas">Speed: </ActiveIcon>
          {speed===1000?<ActiveIcon className="fas fa-caret-right" onClick={()=>setSpeed(1000)} title="1 Generation/Second" />:<Icon className="fas fa-caret-right" onClick={()=>setSpeed(1000)} title="1 Generation/Second" />}
          {speed===500?<ActiveIcon className="fas fa-forward" onClick={()=>setSpeed(500)} title="2 Generations/Second" />:<Icon className="fas fa-forward" onClick={()=>setSpeed(500)} title="2 Generations/Second" />}
          {speed===250?<ActiveIcon className="fas fa-forward" onClick={()=>setSpeed(250)} title="4 Generations/Second"><i className="fas fa-forward" /></ActiveIcon>:<Icon className="fas fa-forward" onClick={()=>setSpeed(250)} title="4 Generations/Second"><i className="fas fa-forward" /></Icon>}
        </ButtonBox>
        <ButtonBox>
          {size===0?<ActiveIcon className="fas fa-expand" onClick={()=>resize(10,10,0)}> 10x10</ActiveIcon>:<Icon className="fas fa-expand" onClick={()=>resize(10,10,0)}> 10x10</Icon>}
          {size===1?<ActiveIcon className="fas fa-expand" onClick={()=>resize(20,20,1)}> 20x20</ActiveIcon>:<Icon className="fas fa-expand" onClick={()=>resize(20,20,1)}> 20x20</Icon>}
          {size===2?<ActiveIcon className="fas fa-expand" onClick={()=>resize(25,25,2)}> 25x25</ActiveIcon>:<Icon className="fas fa-expand" onClick={()=>resize(25,25,2)}> 25x25</Icon>}
          {size===3?<ActiveIcon className="fas fa-expand" onClick={()=>resize(25,50,3)}> 25x50</ActiveIcon>:<Icon className="fas fa-expand" onClick={()=>resize(25,50,3)}> 25x50</Icon>}
          {size===4?<ActiveIcon className="fas fa-expand" onClick={()=>resize(50,50,4)}> 50x50</ActiveIcon>:<Icon className="fas fa-expand" onClick={()=>resize(50,50,4)}> 50x50</Icon>}
        </ButtonBox>
      </header>
    </div>
  );
}

export default App;
