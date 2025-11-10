export const EVENTS = {
  positive: [
    {
      id: 'festival.start',
      title: '김천 김밥 축제 개막!',
      text: '다음 제작 라운드 매출 +50%',
      apply(g) {
        g._buff_sale = 0.5;
      },
    },
    {
      id: 'truck.arrive',
      title: '식자재 트럭 도착',
      text: '원하는 재료 1개를 고를 수 있습니다.',
      choose: true,
    },
  ],
  negative: [
    {
      id: 'storm',
      title: '폭우로 시장 휴무',
      text: '이번 턴 이동 불가',
      apply(g) {
        g._skip = true;
      },
    },
    {
      id: 'fridge',
      title: '냉장고 고장',
      text: '무작위 재료 1개 손실',
      apply(g) {
        if (g.bag.length) g.bag.splice((Math.random() * g.bag.length) | 0, 1);
      },
    },
  ],
};
