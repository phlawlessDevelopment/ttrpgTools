type Gender = 'male' | 'female';
interface StatBlock {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}
interface Npc {
  id: number;
  name: string;
  race: string;
  gender: Gender;
  statblock: StatBlock;
}

export type { Gender, StatBlock, Npc }