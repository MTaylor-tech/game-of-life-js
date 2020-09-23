const info = `
  <h2 class='strong active orbit'>About the Game of Life</h2>
  <p class='label'>The Game of Life was invented in 1970 by British mathematician John Conway.
  The individual boxes on the board are called 'cells'. Bright cells are called 'alive' and dark, 'dead'.
  Following simple rules, the cells on the board are born and die, creating intriquing patterns.</p>
  <p class='label'>You can interact with the Game of Life by creating an initial configuration
  by clicking cells or randomizing the board. Then you observe how it evolves over time.</p>
  <p class='label'>Between each generation (or step), the following rules determine what the next board will look like:</p>
  <ul class='label'>
    <li>Any live cell with fewer than two live neighbors dies, as if by underpopulation.</li>
    <li>Any live cell with two or three live neighbors lives on to the next generation.</li>
    <li>Any live cell with more than three live neighbors dies, as if by overpopulation.</li>
    <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
  </ul>
  `;

export {info};
