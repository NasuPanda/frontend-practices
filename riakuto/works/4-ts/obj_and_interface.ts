// インライン
const red: {rgb: string, opacity: number} = {rgb: 'ff0000', opacity: 1}

// インターフェースの利用
interface Color{
  readonly rgb: string;
  opacity: number;
  name?: string;
}
const turquoise: Color = {rgb: '00afcc', opacity: 1};
turquoise.name = 'Turquoise Blue';
// turquoise.rgb = '03c1ff'; => error


// 柔軟に
interface Status {
  level: number;
  maxHP: number;
  maxMP: number;
  [attr: string]: number;
}

const myStatus: Status = {
  level: 99,
  maxHP: 999,
  maxMP: 999,
  attack: 999,
  defense: 999,
}
