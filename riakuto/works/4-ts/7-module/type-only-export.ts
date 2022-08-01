type Species = 'rabbit' | 'bear' | 'dog';

class Resident {
  name = '';
  age = 0;
  species: Species | null = null;
}

export type { Species, Resident }
