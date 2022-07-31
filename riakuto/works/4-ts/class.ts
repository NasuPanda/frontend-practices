// class
{
  class Rectangle {
    // プロパティ初期化子(Property Initializer)
    readonly name = 'rectangle';
    sideA: number;
    sideB: number;
    constructor(sideA: number, sideB: number) {
      this.sideA = sideA;
      this.sideB = sideB;
    }
    getArea = (): number => this.sideA * this.sideB;
  }
}

// class type definition by interface
{
  interface Shape {
    readonly name: string;
    getArea: () => number;
  }

  interface Quadrangle {
    sideA: number;
    sideB?: number;
    sideC?: number;
    sideD?: number;
  }

  class Rectangle implements Shape, Quadrangle {
    readonly name = 'rectangle';
    sideA: number;
    sideB: number;

    constructor(sideA: number, sideB: number) {
      this.sideA = sideA;
      this.sideB = sideB;
    }

    getArea = (): number => this.sideA * this.sideB;
  }
}

// dual faces of class in TypeScript
// 1. definition of type definition of interface
// 2. definition of constructor
{
  class Point {
    x: number = 0;
    y: number = 0;
  }

  const pointA = new Point();
  const pointB: Point = { x: 2, y: 4 };

  interface Point3d extends Point {
    z: number;
  }

  const pointC: Point3d = { x: 5, y: 5, z: 10 }
}

// supplement: extension of interface
{
  interface Point {
    x: number;
    y: number;
  }
  interface Point3d extends Point {
    z: number
  }
  const point: Point3d = { x: 5, y: 5, z: 10 }
}
