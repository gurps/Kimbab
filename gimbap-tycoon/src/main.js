import { renderBoard, rollAndMove } from './board.js';
import { startCraft } from './craft.js';
import { STATES, game, setState, syncHud } from './state.js';

renderBoard();
syncHud();

document.getElementById('rollBtn').onclick = () => {
  if (game.state !== STATES.BOARD) return;
  rollAndMove();
};

document.getElementById('craftBtn').onclick = () => {
  if (game.state === STATES.CRAFT) startCraft();
};
