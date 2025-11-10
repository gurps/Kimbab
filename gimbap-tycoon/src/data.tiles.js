import { ING } from './data.ingredients.js';

export const TILES = [
  { id: 0, type: 'start', label: '본점', icon: '🏠' },
  { id: 1, type: 'market', region: '김천', icon: '🍚', pool: [
    { item: ING.rice[0], chance: 2 },
    { item: ING.rice[1], chance: 1 },
    { item: ING.veg[0], chance: 2 },
    { item: ING.seaweed[0], chance: 2 },
  ]},
  { id: 2, type: 'event', label: '시장 할인', icon: '🎁' },
  { id: 3, type: 'market', region: '부산', icon: '🐟', pool: [
    { item: ING.protein[1], chance: 2 },
    { item: ING.protein[2], chance: 1 },
    { item: ING.veg[3], chance: 1 },
  ]},
  { id: 4, type: 'market', region: '제주', icon: '🏝️', pool: [
    { item: ING.protein[3], chance: 1 },
    { item: ING.seaweed[2], chance: 1 },
    { item: ING.rice[2], chance: 1 },
  ]},
  { id: 5, type: 'danger', label: '위생 점검', icon: '💀' },
  { id: 6, type: 'market', region: '글로벌', icon: '💎', pool: [
    { item: ING.special[2], chance: 1 },
    { item: ING.special[0], chance: 2 },
    { item: ING.seaweed[1], chance: 2 },
  ]},
  { id: 7, type: 'home', label: '귀환', icon: '🏠' },
];
