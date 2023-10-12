class Vehicle{
    constructor(make,model,year){
        this.make=make;
        this.model=model;
        this.year=year;
    };

    honk(){
        return 'Beep.';
    };

    toString(){
        return `The vehicle is a ${this.make} ${this.model} from ${this.year}.`;
    }
};

let myFirstVehicle= new Vehicle('Honda','Monster Truck', 1999);
console.log(myFirstVehicle.honk());
console.log(myFirstVehicle.toString());

class Car extends Vehicle{
    constructor(make,model,year,numWheels){
        super(make,model,year);
        this.numWheels=4;
        
    };
};

let myFirstCar=new Car(4);
console.log(myFirstCar.numWheels);

class Motorcycle extends Vehicle{
    constructor(make,model,year,numWheels){
        super(make,model,year,numWheels)
        this.numWheels=2;
    };

    revEngine(){
        return 'VROOM!!!';
    };
};

let myFirstMotorCycle = new Motorcycle('Honda','Nighthawk', 2000);
console.log(myFirstMotorCycle.toString());
console.log(myFirstMotorCycle.revEngine());
console.log(myFirstMotorCycle.numWheels);

class Garage{
    constructor(vehicles,capacity){
        this.vehicles=[];
        this.capacity=capacity;
    };

    add(newVehicle){
        if(!(newVehicle instanceof Vehicle)){
            return 'Only vehicles are allowed in here';
        }
        if(this.vehicles.length>=this.capacity){
            return 'Sorry, we\'re full.';
        }
        this.vehicles.push(newVehicle);
        return 'Vehicle added!';
    }
};

let garage = new Garage(2);
console.log(garage.vehicles); // []
console.log(garage.add(new Car("Hyundai", "Elantra", 2015))); // "Vehicle added!"
console.log(garage.vehicles); // [Car]
console.log(garage.add("Taco")); // "Only vehicles are allowed in here!"

console.log(garage.add(new Motorcycle("Honda", "Nighthawk", 2000)));
// "Vehicle added!"
console.log(garage.vehicles); // [Car, Motorcycle]

console.log(garage.add(new Motorcycle("Honda", "Nighthawk", 2001)));
// "Sorry, we're full."