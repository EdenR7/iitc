export class Person {
    constructor(name, age, height) {
      this.name = name;
      this.age = age;
      this.height = height;
    }
    write = () => {
      console.log(
        `${this.name} is a ${this.age} yeras old. His height is ${this.height} cm`
      );
    };
  }
export class Student extends Person {
avg = 0;
university = "";

displayStudent = () => {
    this.write();
    console.log(`Learn at ${this.university}, his avg is ${this.avg}`);
};
}
//   const student1 = new Student((name = "Eden"), (age = 23), (height = 171));
//   student1.displayStudent();