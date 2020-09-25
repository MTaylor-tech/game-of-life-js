import React from 'react';

function Info(props) {
  return (
    <div className="label info-box">
      <h2 className='strong active orbit'>About the Game of Life</h2>
      <p className='label'>
        The Game of Life was invented in 1970 by British mathematician John Conway.
        The individual boxes on the board are called 'cells'. Bright cells are called 'alive' and dark, 'dead'.
        Following simple rules, the cells on the board are born and die, creating intriquing patterns.
      </p>
      <p className='label'>You can interact with the Game of Life by creating an initial configuration
      by clicking cells or randomizing the board. Then you observe how it evolves over time.</p>
      <p className='label'>Between each generation (or step), the following rules determine what the next board will look like:</p>
      <ul className='label'>
        <li>Any live cell with fewer than two live neighbors dies, as if by underpopulation.</li>
        <li>Any live cell with two or three live neighbors lives on to the next generation.</li>
        <li>Any live cell with more than three live neighbors dies, as if by overpopulation.</li>
        <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
      </ul>
      <div className="divider" />
      <h2 className='strong active orbit' id="infoBox">The Controls</h2>
      <p className='label'>Clicking a square will turn that square from dead to alive or alive to dead.</p>
      <p className='label'><i className="fas fa-random" /> The Randomizer will give you a random pattern.</p>
      <p className='label'><i className="fas fa-undo" /> The Reset button will clear the board.</p>
      <p className='label'><i className="fas fa-play" /> The Play button will start the simulation. The simulation will end automatically when all cells are dead or when it reaches a stable state. If you wish to end it earlier (or if you end up in an endlessly repeating loop), use the <i className="fas fa-pause" /> Pause button. The Play button switches to a Pause button when the simulation is running.</p>
      <p className='label'><i className="fas fa-step-forward" /> The Step Forward button steps the simulation forward by one generation.</p>
      <p className='label'><i className="fas fa-fast-forward" /> The Jump Forward button moves the simulation forward by 5 generations.</p>
      <p className='label'>The <span className='orbit strong'>Speed</span> selector allows you to choose the speed of the simulation. <i className="fas fa-caret-right" /> will run the simulation at roughly 1 generation per second. <i className="fas fa-forward" /> will run it at double that speed (roughly 2 generations per second). <i className="fas fa-forward"><i className="fas fa-forward" /></i> will double that, running the simulation at about 4 generations per second.</p>
      <p className='label'>The <span className='orbit strong'>Size</span> selector will change the size of the board.</p>
      <p className='label'>The <span className='orbit strong'>Edge</span> selector will pick whether the edges of the board <span className='orbit strong'>Wrap</span> around, so that cells on the right side of the board affect cells on the left and cells on the top of the board affect cells on the bottom, or if they are <span className='orbit strong'>Solid</span>.</p>
      <p className='label'>The <span className='orbit strong'>Generation</span> counter below the board tells you which generation the simulation is in.</p>
    </div>
)};

export default Info;
