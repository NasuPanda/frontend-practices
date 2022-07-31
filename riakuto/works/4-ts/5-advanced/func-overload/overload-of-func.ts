// 式主体
{
  class Brooch {
    pentagram = 'Silver Crystal';
  }

  type Compact = {
    silverCrystal: boolean;
  };

  class CosmicCompact implements Compact {
    silverCrystal = true;
    cosmicPower = true;
  }

  class CrisisCompact implements Compact {
    silverCrystal = true;
    moonChalice = true;
  }

  type Transform = {
    (): void;
    (item: Brooch): void;
    (item: Compact): void;
  };

  const transform: Transform = (item?: Brooch | Compact): void => {
    if (item instanceof Brooch) {
      console.log('Moon crystal power💎, make up!!');
    } else if (item instanceof CosmicCompact) {
      console.log('Moon cosmic power💖, make up!!!');
    } else if (item instanceof CrisisCompact) {
      console.log('Moon crisis🏆, make up!');
    } else if (!item) {
      console.log('Moon prisim power🌙, make up!');
    } else {
      console.log('Item is fake...😖');
    }
  };

  transform();
  transform(new Brooch());
  transform(new CosmicCompact());
  transform(new CrisisCompact());
}

// 文主体
{
  class Brooch {
    pentagram = 'Silver';
  }

  type Compact = {
    silver: boolean;
  };

  class CosmicCompact implements Compact {
    silver = true;
    cosmicPower = true;
  }

  class CrisisCompact implements Compact {
    silver = true;
    moonChalice = true;
  }

  function transform(): void;
  function transform(item: Brooch): void;
  function transform(item: Compact): void;
  function transform(item?: Brooch | Compact): void {
    if (item instanceof Brooch) {
      console.log('Mooncrystalpower ,makeup!!'); }
    else if (item instanceof CosmicCompact) {
      console.log('Mooncosmicpower ,makeup!!!');
    } else if (item instanceof CrisisCompact) {
      console.log('Mooncrisis ,makeup!');
    } else if (!item) {
      console.log('Moonprisimpower ,makeup!');
    } else {
      console.log('Itemisfake... ');
    }
  }
  transform();
  transform(new Brooch());
  transform(new CosmicCompact());
  transform(new CrisisCompact());
}
