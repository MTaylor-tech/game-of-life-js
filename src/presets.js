const s = (size,x) => {
  switch (size) {
    case 1:
      return 10-(x/2);
    case 2:
      return 12-(x/2);
    case 3:
    case 4:
      return 25-(x/2);
    default:
      return 0;
  }
}

let p = [];

p[0] = `
OOOOOOOOOO.
OOOXXXXOOO.
OOOOOOOOOO.
OXOOXXOOXO.
OXOXOOXOXO.
OXOXOOXOXO.
OXOOXXOOXO.
OOOOOOOOOO.
OOOXXXXOOO.
OOOOOOOOOO
`; //circle inside square turns into linked rings

p[1] = `
OOOOOOOOOO.
OXXXOOOOOO.
OXXOOOOOOO.
OXOXOOOOOO.
OOOOXOOOOO.
OOOOOXXXOO.
OOOOOXXOOO.
OOOOOXOOOO.
OOOOOOOOOO.
OOOOOOOOOO
`; //arrow plays out interestingly

p[2] = `
OOOOOOOOOO.
OOOOXOOOOO.
OOOXOXOOOO.
OOXOOOXOOO.
OOOXOXOOOO.
OOOOXOOOOO.
OOOOOOOOOO.
OOOOOOOOOO.
OOOOOOOOOO.
OOOOOOOOOO
`; // circle expands, ends in rotators

p[3] = `
OOOOOOOOXO.
OOOOOOOOXX.
OOOOOOOOXO
`; // simple pattern that expands (solid edges)

export {p,s};
