import React, { useState, useEffect } from 'react';
import './newapp.css';
import {World} from './classes/Cell.js';
import Info from './info.jsx';
import {p,s} from './presets.js';

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
  const [cellRowClass, setCellRowClass] = useState('cell-row height2');
  const [cellClass, setCellClass] = useState('cell height2 width2');
  const [overlayClass, setOverlayClass] = useState('cell-overlay transition500');
  const [aliveClass, setAliveClass] = useState('cell-overlay transition500 alive');

  useEffect(()=>{
    if (world) {
      setRows(world.cells);
    }
  },[world])

  useEffect(()=>{
    let cc = `cell height${size} width${size}`;
    let crc = `cell-row height${size}`;
    let coc = `cell-overlay transition${speed}`;
    let cac = coc+` alive`;

    setCellRowClass(crc);
    setCellClass(cc);
    setOverlayClass(coc);
    setAliveClass(cac)
  },[speed,size])

  const random = () => {
    setMessage(1);
    world.randomize();
    setRef(ref+1);
  }

  const step = () => {
    world.run(1);
    setRef(ref+1);
    if (!world.anyLiving || !world.didChange) {
      setIsActive(false);
    }
  }

  const edges = () => {
    world.wrapIt(!world.wrap);
    setRef(ref+1);
  }

  const preset = () => {
    world.preset(p[2],s(size,10),s(size,10));
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
  }, [isActive, seconds, speed, step]);

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
    }
  }

  useEffect(()=>{
    if (showInfo) {
      const infoBox = document.getElementById('infoBox');
      if (infoBox) infoBox.scrollIntoView();
    }
  },[showInfo])

  if (!world || !rows) {
    return <p>Preparing World...</p>;
  }

  return (
    <div className="container">
    <div className="App">
        <h1 className="title stronger">Conway's Game of Life</h1>
        {false?<div className="label" onClick={()=>setShowInfo(false)}>See information below.</div>:<div className="label active" onClick={()=>setShowInfo(true)}>What is this? <i className="far fa-question-circle" /></div>}
        {message===0?<div className="label-box" onClick={()=>setMessage(1)}><span className="label active">Click the cells to set their status or press the Randomize <i className="fas fa-random" /> button below, or <span onClick={()=>setShowInfo(true)}>check out the information and instructions below</span>.</span></div>:<></>}
        {message===1?<div className="label-box"><span className="active">Click the cells to change their status.<br />Press the Play <i className="fas fa-play" /> button below when you're ready to watch your world develop.</span></div>:<></>}
        {message>1?<div className="label-box" />:<></>}
        <div className="button-box embiggen">
          <i className={message===0?"fas fa-random active embiggen":"fas fa-random inactive embiggen"} onClick={random} title="Randomize" />
          <i className="fas fa-undo inactive embiggen" onClick={reset} title="Reset" />
          {isActive?<i className="fas fa-pause active embiggen" onClick={toggle} title="Pause" />:message===0?<i className="fas fa-play inactive embiggen" onClick={toggle} title="Play" />:<i className="fas fa-play active embiggen" onClick={toggle} title="Play" />}
          <i className="fas fa-step-forward inactive embiggen" onClick={step} title="Step Forward" />
          <i className="fas fa-fast-forward inactive embiggen" onClick={jump} title="Jump Forward" />
          {/* <i className="fas fa-th inactive embiggen" onClick={preset} title="Preset" /> */}
        </div>
        <div className="button-box embiggen">
          <span className="orbit strong active">Speed: </span>
          <span className="divider" />
          <i className={speed===1000?"fas fa-caret-right active":"fas fa-caret-right inactive"} onClick={()=>setSpeed(1000)} title="1 Generation/Second" />
          <span className="divider" />
          <i className={speed===500?"fas fa-forward active":"fas fa-forward inactive"} onClick={()=>setSpeed(500)} title="2 Generations/Second" />
          <span className="divider" />
          <i className={speed===250?"fas fa-forward active":"fas fa-forward inactive"} onClick={()=>setSpeed(250)} title="4 Generations/Second"><i className="fas fa-forward" /></i>
        </div>
        <div className="button-box embiggen">
          <span className="orbit active strong">Size: </span>
          <span className="divider" />
          <i className={size===0?"fas fa-expand active":"fas fa-expand inactive"} onClick={()=>resize(10,10,0)}> <span className="orbit">10x10</span></i>
          <span className="divider" />
          <i className={size===1?"fas fa-expand active":"fas fa-expand inactive"} onClick={()=>resize(20,20,1)}> <span className="orbit">20x20</span></i>
          <span className="divider" />
          <i className={size===2?"fas fa-expand active":"fas fa-expand inactive"} onClick={()=>resize(25,25,2)}> <span className="orbit">25x25</span></i>
          <span className="divider" />
          <i className={size===3?"fas fa-expand active":"fas fa-expand inactive"} onClick={()=>resize(25,50,3)}> <span className="orbit">25x50</span></i>
          <span className="divider" />
          <i className={size===4?"fas fa-expand active":"fas fa-expand inactive"} onClick={()=>resize(50,50,4)}> <span className="orbit">50x50</span></i>
        </div>
        <div className="button-box embiggen">
          <span className="orbit active strong">Edges: </span>
          <span className="divider" />
          <span className={world.wrap?"orbit active":"orbit inactive"} onClick={edges}>Wrap</span>
          <span className="divider" />
          <span className={world.wrap?"orbit inactive":"orbit active"} onClick={edges}>Solid</span>
        </div>

        <div className="board">{rows.map(row=>{
          return <div key={row[0].row} className={cellRowClass}>{row.map(cell=><div key={`${cell.row}-${cell.column}`} className={cellClass} onClick={()=>flip(cell.row,cell.column)}><div className={cell.alive?aliveClass:overlayClass} /></div>)}</div>
        })}</div>

        <div className="orbit active strong embiggen">Generation: {world.generation}</div>
        {showInfo?<Info />:<Info />}
    </div>
  </div>
  );
}

export default App;
