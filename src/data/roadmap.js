const cards = Array.from({ length: 5 }, (_, index) => ({
  id: `card-${index + 1}`,
  number: 1,
  title: '시작과 기본 문법',
  items: Array.from({ length: 9 }, (_, itemIndex) => ({
    id: `card-${index + 1}-item-${itemIndex + 1}`,
    title: '컴파일·링크·실행 과정',
    completed: false,
  })),
}));

export default cards;
