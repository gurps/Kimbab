export const TIERS = { 1: '★', 2: '★★', 3: '★★★', 4: '★★★★', 5: '★★★★★' };

export const ING = {
  rice: [
    { id: 'rice.basic', name: '백미', tier: 1, effect: { score: 0 } },
    { id: 'rice.gimcheon', name: '김천쌀', tier: 2, effect: { score: +5 } },
    { id: 'rice.jeju.organic', name: '제주 유기농쌀', tier: 4, effect: { vip: +0.2 } },
  ],
  seaweed: [
    { id: 'nori.basic', name: '일반 김', tier: 1, effect: {} },
    { id: 'nori.roasted', name: '구운 김', tier: 2, effect: { craftEase: +0.1 } },
    { id: 'nori.gamtae', name: '감태', tier: 3, effect: { score: +8 } },
  ],
  protein: [
    { id: 'pro.ham', name: '햄', tier: 1, effect: {} },
    { id: 'pro.tuna', name: '참치', tier: 2, effect: { pop: +0.05 } },
    { id: 'pro.bulgogi', name: '불고기', tier: 3, effect: { price: +15 } },
    { id: 'pro.jeju.pork', name: '제주 흑돼지', tier: 4, effect: { price: +25 } },
  ],
  veg: [
    { id: 'veg.danmuji', name: '단무지', tier: 1, effect: {} },
    { id: 'veg.cucumber', name: '오이', tier: 1, effect: {} },
    { id: 'veg.spinach', name: '시금치', tier: 2, effect: { score: +3 } },
    { id: 'veg.carrot', name: '당근', tier: 1, effect: {} },
  ],
  special: [
    { id: 'sp.cheese', name: '치즈', tier: 2, effect: { price: +5 } },
    { id: 'sp.mayo', name: '마요네즈', tier: 2, effect: { pop: +0.05 } },
    { id: 'sp.truffle', name: '트러플', tier: 5, effect: { vip: +0.4, price: +50 } },
  ],
};

export function pickFrom(pool, rnd) {
  const sum = pool.reduce((a, p) => a + (p.chance ?? 1), 0);
  let x = rnd() * sum;
  for (const p of pool) {
    const w = p.chance ?? 1;
    if ((x -= w) <= 0) return p;
  }
  return pool[pool.length - 1];
}
