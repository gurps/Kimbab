export const STATES = { BOARD: 'BOARD', CRAFT: 'CRAFT', RESULT: 'RESULT' };

export const game = {
  state: STATES.BOARD,
  round: 1,
  pos: 0,
  bag: [],
  rep: 0,
  gold: 0,
  seed: 12345,
};

export function setState(s) {
  game.state = s;
  document.getElementById('state').textContent = s;
  document.getElementById('craftBtn').style.display = s === STATES.BOARD ? 'none' : 'inline-block';
}

export function syncHud() {
  document.getElementById('round').textContent = game.round;
  document.getElementById('bagCount').textContent = game.bag.length;
  document.getElementById('rep').textContent = game.rep;
  document.getElementById('gold').textContent = game.gold;
}
