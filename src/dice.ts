function createDice(size: number) {
  return () => Math.floor(Math.random() * size) + 1
}

const d6 = createDice(6);
const d8 = createDice(8);
const d10 = createDice(10);
const d12 = createDice(12);
const d20 = createDice(20);

export { d6, d8, d10, d12, d20 }
