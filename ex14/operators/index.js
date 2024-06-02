const fruits = ["Apple", "Orange", "Banana"]
const vegetables = ["Cucumber", "Tomato", "Lettuce"]
const groceries = [...fruits, ...vegetables];
// console.log(groceries);

const numbers = [1,2,3,4,5];
const moreNumbers = [0,...numbers, 6];
// console.log(moreNumbers);

const person = {
    name:"Eden",
    age:23
};
// console.log(...Object.entries(person));
const personWithJob = {
    ...person,
    job : "web Developer"
}
// console.log(personWithJob);

sumAll = (...args)=>{
    let sum = 0;
    args.forEach((element)=>{
        sum += element
    })
    return sum;
} 

console.log(sumAll(1,2,3,4,5,6,7,8,9,10));