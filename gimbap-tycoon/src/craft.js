import { game, setState, STATES, syncHud } from './state.js';
import { showPopup } from './ui.js';

const RECIPES = [
  { id: 'basic', name: '기본 김밥', need: ['rice', 'seaweed', 'veg.danmuji', 'veg.cucumber'], base: 50 },
  { id: 'tuna', name: '참치마요 김밥', need: ['rice', 'seaweed', 'pro.tuna', 'sp.mayo'], base: 90 },
  { id: 'bulgogi', name: '불고기 김밥', need: ['rice', 'seaweed', 'pro.bulgogi', 'veg.carrot', 'veg.spinach'], base: 140 },
];

function hasNeed(need) {
  const bagIds = game.bag.map((x) => x.id);
  return need.every((req) => bagIds.some((id) => id.includes(req)));
}

export function startCraft() {
  const options = RECIPES.filter((r) => hasNeed(r.need));
  if (!options.length) {
    showPopup({ title: '제작 실패', html: '재료가 부족합니다. (MVP: 아무 김밥이나 만들어 20G 획득)' });
    game.gold += 20;
  } else {
    const r = options[0];
    let price = r.base;
    for (const it of game.bag) {
      if (it.effect?.price) price += it.effect.price;
      if (it.effect?.score) price += it.effect.score;
    }
    if (game._buff_sale) {
      price = Math.floor(price * (1 + game._buff_sale));
      game._buff_sale = 0;
    }
    game.gold += price;
    const repGain = Math.min(10, Math.floor(price / 50));
    game.rep += repGain;
    showPopup({ title: `${r.name} 완성!`, html: `판매: <b>${price}G</b> / 평판 +${repGain}` });
  }
  game.bag = [];
  game.round += 1;
  setState(STATES.BOARD);
  syncHud();
}
