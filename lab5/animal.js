class Animal {
  constructor(name, speed) {
    this.name = name;
    this.speed = speed;
  }

  run(increase = 0) {
    this.speed += increase;
    console.log(`${this.name} runs with speed ${this.speed}.`);
  }

  static compareBySpeed(a1, a2) {
    return a1.speed - a2.speed;
  }
}

class Rabbit extends Animal {
  constructor(name, speed) {
    super(name, speed);
  }

  hide() {
    console.log(`${this.name} hides.`);
  }
}

// Example usage
const rabbit = new Rabbit("Bunny", 10);
rabbit.run(5);
rabbit.hide();

let rabbits = [
  new Rabbit("White Rabbit", 10),
  new Rabbit("Black Rabbit", 5)
];
rabbits.sort(Rabbit.compareBySpeed);
rabbits[0].run();
