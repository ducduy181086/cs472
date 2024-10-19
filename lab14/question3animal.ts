class Animal {
    name: string;
    speed: number;

    constructor(name: string, speed: number) {
        this.name = name;
        this.speed = speed;
    }

    run(increase: number = 0): void {
        this.speed += increase;
        console.log(`${this.name} runs with speed ${this.speed}.`);
    }

    static compareBySpeed(a1: Animal, a2: Animal): number {
        return a1.speed - a2.speed;
    }
}

class Rabbit extends Animal {
    constructor(name: string, speed: number) {
        super(name, speed);
    }

    hide(): void {
        console.log(`${this.name} hides.`);
    }
}

// Example usage
const rabbit = new Rabbit("Bunny", 10);
rabbit.run(5);
rabbit.hide();

let rabbits: Rabbit[] = [
    new Rabbit("White Rabbit", 10),
    new Rabbit("Black Rabbit", 5)
];
rabbits.sort(Rabbit.compareBySpeed);
rabbits[0].run();
