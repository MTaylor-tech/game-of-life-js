import React, { useState, useEffect } from 'react';
import './App.css';
import {Cell,World} from './classes/Cell.js';
import styled from 'styled-components';
import {info} from './info.js';

const c = ['cell-overlay ','alive ','transition200 ','transition400 ','transition600 '];


function App() {
  const [world, setWorld] = useState(new World(25,25));
  const [rows, setRows] = useState();
  const [ref,setRef] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [speed, setSpeed] = useState(500);
  const [size, setSize] = useState(2);
  const [showInfo, setShowInfo] = useState(false);
  const [message, setMessage] = useState(0);
  const [cellClass, setCellClass] = useState(c[0]+c[3]);
  const [cellAliveClass, setCellAliveClass] = useState(c[0]+c[1]+c[3]);

  useEffect(()=>{
    if (world) {
      setRows(world.cells);
    }
  },[])

  useEffect(()=>{
    if (speed===250) {
      setCellClass(c[0]+c[2]);
      setCellAliveClass(c[0]+c[1]+c[2]);
    } else if (speed===500) {
      setCellClass(c[0]+c[3]);
      setCellAliveClass(c[0]+c[1]+c[3]);
    } else {
      setCellClass(c[0]+c[4]);
      setCellAliveClass(c[0]+c[1]+c[4]);
    }
  },[speed])

  const random = () => {
    setMessage(1);
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
    setMessage(0);
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
    if (message>1) {
      setMessage(1);
    } else {
      setMessage(2);
    }
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
      setMessage(1);
      world.flip(row,col);
      setRef(ref+1);
      // document.getElementById(`Cell-${row}-${col}`).style.transform = "rotateY(180deg)";
      // setRef(ref+1);
    }
  }

  if (!world || !rows) {
    return <p>Preparing World...</p>;
  }

  return (
    <div className="App">
        <h1 className="title bungee active strong">Conway's Game of Life</h1>
        {showInfo?<div className="label active" onClick={()=>setShowInfo(false)}>{info}</div>:<div className="label" onClick={()=>setShowInfo(true)}>What is this? <i className="far fa-question-circle" /></div>}
        {message===0?<div className="label-box" onClick={()=>setMessage(1)}><span className="label active">Click the cells to set their status or press the Randomize <i className="fas fa-random" /> button below.</span></div>:<></>}
        {message===1?<div className="label-box"><span className="active">Click the cells to change their status.<br />Press the Play <i className="fas fa-play" /> button below when you're ready to watch your world develop.</span></div>:<></>}
        {message>1?<div className="label-box" />:<></>}
        <div className="button-box">
          <i className={message===0?"fas fa-random active":"fas fa-random label"} onClick={random} title="Randomize" />
          <i className="fas fa-undo label" onClick={reset} title="Reset" />
          {isActive?<i className="fas fa-pause active" onClick={toggle} title="Pause" />:message===0?<i className="fas fa-play label" onClick={toggle} title="Play" />:<i className="fas fa-play active" onClick={toggle} title="Play" />}
          <i className="fas fa-step-forward label" onClick={step} title="Step Forward" />
          <i className="fas fa-fast-forward label" onClick={jump} title="Jump Forward" />
        </div>
        <div className="button-box">
          <span className="fas orbit strong active">Speed: </span>
          <span className="divider" />
          <i className={speed===1000?"fas fa-caret-right active":"fas fa-caret-right label"} onClick={()=>setSpeed(1000)} title="1 Generation/Second" />
          <span className="divider" />
          <i className={speed===500?"fas fa-forward active":"fas fa-forward label"} onClick={()=>setSpeed(500)} title="2 Generations/Second" />
          <span className="divider" />
          <i className={speed===250?"fas fa-forward active":"fas fa-forward label"} onClick={()=>setSpeed(250)} title="4 Generations/Second"><i className="fas fa-forward" /></i>
        </div>
        <div className="button-box">
          <span className="fas orbit active strong">Size: </span>
          <span className="divider" />
          <i className={size===0?"fas fa-expand active":"fas fa-expand label"} onClick={()=>resize(10,10,0)}> <span className="orbit">10x10</span></i>
          <span className="divider" />
          <i className={size===1?"fas fa-expand active":"fas fa-expand label"} onClick={()=>resize(20,20,1)}> <span className="orbit">20x20</span></i>
          <span className="divider" />
          <i className={size===2?"fas fa-expand active":"fas fa-expand label"} onClick={()=>resize(25,25,2)}> <span className="orbit">25x25</span></i>
          <span className="divider" />
          <i className={size===3?"fas fa-expand active":"fas fa-expand label"} onClick={()=>resize(25,50,3)}> <span className="orbit">25x50</span></i>
          <span className="divider" />
          <i className={size===4?"fas fa-expand active":"fas fa-expand label"} onClick={()=>resize(50,50,4)}> <span className="orbit">50x50</span></i>
        </div>
        <div className="board">{rows.map(row=>{
          return <div className="cell-row">{row.map(cell=><div key={`${cell.row}-${cell.column}`} className="cell" onClick={()=>flip(cell.row,cell.column)}><div className={cell.alive?cellAliveClass:cellClass} /></div>)}</div>
        })}</div>
        <div className="italic active strong">Generation: {world.generation}</div>
    </div>
  );
}

export default App;
