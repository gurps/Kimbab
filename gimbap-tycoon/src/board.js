import { TILES } from './data.tiles.js';
import { STATES, game, setState, syncHud } from './state.js';
import { mulberry32 } from './rng.js';
import { showPopup } from './ui.js';
import { EVENTS } from './data.events.js';

const rnd = mulberry32(game.seed);
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const P = { cx: canvas.width / 2, cy: canvas.height / 2, r: 220 };

export function renderBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const n = TILES.length;
  const step = (Math.PI * 2) / n;

  for (let i = 0; i < n; i++) {
    const a = i * step - Math.PI / 2;
    const x = P.cx + Math.cos(a) * P.r;
    const y = P.cy + Math.sin(a) * P.r;
    const isHere = i === game.pos;

    ctx.save();
    ctx.fillStyle = isHere ? '#58ffd188' : '#243a6a88';
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#cfe1ff';
    ctx.font = '18px system-ui';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(TILES[i].icon || '·', x, y);

    if (TILES[i].type === 'market') {
      ctx.font = '10px system-ui';
      ctx.fillText('•', x, y - 22);
    }
    ctx.restore();
  }

  const a = game.pos * step - Math.PI / 2;
  const px = P.cx + Math.cos(a) * P.r;
  const py = P.cy + Math.sin(a) * P.r;
  ctx.fillStyle = '#58ffd1';
  ctx.beginPath();
  ctx.arc(px, py, 10, 0, Math.PI * 2);
  ctx.fill();
}

export function rollAndMove() {
  if (game.state !== STATES.BOARD) return;
  if (game._skip) {
    game._skip = false;
    return afterMove();
  }

  const dice = 1 + Math.floor(rnd() * 6);
  game.pos = (game.pos + dice) % TILES.length;
  renderBoard();
  handleTile(TILES[game.pos], dice);
}

function handleTile(tile) {
  if (tile.type === 'market') {
    const pool = tile.pool;
    const sum = pool.reduce((a, p) => a + (p.chance ?? 1), 0);
    let x = rnd() * sum;
    let pick = pool[0];
    for (const p of pool) {
      const w = p.chance ?? 1;
      if ((x -= w) <= 0) {
        pick = p;
        break;
      }
    }
    game.bag.push(pick.item);
    syncHud();
    showPopup({
      title: `${tile.region} 시장에서 재료 획득`,
      html: `<b>${pick.item.name}</b> (${pick.item.id}) 을(를) 얻었습니다.`,
    });
  } else if (tile.type === 'event') {
    const set = rnd() < 0.5 ? EVENTS.positive : EVENTS.negative;
    const ev = set[(rnd() * set.length) | 0];
    if (ev.choose) {
      showPopup({
        title: ev.title,
        html: `${ev.text}<br><small>(MVP: 랜덤 재료 1개 획득)</small>`,
        buttons: [
          {
            label: '좋아!',
            onClick: () => {
              if (game.bag[0]) game.bag.push(game.bag[0]);
              syncHud();
            },
          },
        ],
      });
    } else {
      ev.apply && ev.apply(game);
      showPopup({ title: ev.title, html: ev.text });
      syncHud();
    }
  } else if (tile.type === 'danger') {
    showPopup({ title: '위생 점검!', html: '무작위 재료 1개 소실' });
    if (game.bag.length) game.bag.splice((rnd() * game.bag.length) | 0, 1);
    syncHud();
  } else if (tile.type === 'home') {
    setState(STATES.CRAFT);
    document.getElementById('craftBtn').style.display = 'inline-block';
    showPopup({ title: '귀환', html: '주방으로 돌아갑니다. 이제 🍙 제작을 시작하세요.' });
  }
  afterMove();
}

function afterMove() {
  renderBoard();
}
