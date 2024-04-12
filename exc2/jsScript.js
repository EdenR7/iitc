function loops_nested_3(){
    for(let i = 1; i<=10; i++){
        let rowToDisplay = '';
        for (let index = 1; index <= 10; index++) { 
            rowToDisplay += i*index + " ";
        }
        console.log(rowToDisplay);
    }
}
// loops_nested_3();

function function_2_m(num1, num2){
    return num1>num2 ? num1 : num2;
}
// console.log(function_2_m(1,5));

function function_3_m(num1, num2){
    return num1 + num2;
}
// console.log(function_3_m(3,5));

function function_5_m(targetNum){
    let sum = 0;
    while(targetNum>0){
        sum += targetNum;
        targetNum --;
    }
    return sum;
}
// console.log(function_5_m(5));

let num1 = 4, num2 = 7;
function function_6_m(){
    let temporary = num1;
    num1 = num2;
    num2 = temporary;
}
// function_6_m();
// console.log(num1, num2);

function function_7_m(numAstrix){
    for (let index = 1; index <= numAstrix; index++){
        console.log("*".repeat(index));
    }
}
// function_7_m(5);

function function_8_b(num){
    let str = num.toString();
    let sum = 0;
    for(let i = 0; i < str.length; i++){
        sum += Number(str[i]);
    }
    return sum;
}
// console.log(function_8_b(7121));

function function_9_b(num){
    let fibArray = [0,1];
    switch(true){
        case num === 1:
            console.log(fibArray[0]);
            break
        case num === 2:
            console.log(fibArray[0]);
            console.log(fibArray[1]);
            break
        case num > 2:
            console.log(fibArray[0]);
            console.log(fibArray[1]);
            for(let i = 2; i<num; i++){
                let next = fibArray[i-1] + fibArray[i-2];
                console.log(next);
                fibArray.push(next);
            }
            break
        default:
            console.log("Number smaller than 1");
    }
    
}
// function_9_b(10);

let arr = [5, 3, 7, 8, 11];
function array_05_m(arr){
    let sum = 0;
    for (let index = 0; index < arr.length; index++) {
        sum += arr[index];  
    }
    console.log(`Sum is : ${sum}`);
    console.log(`Average is : ${sum/arr.length}`);
}
// array_05_m(arr)

let arrNames = ["E", "Ed", "Ede", "Eden", "EdenR"];
function array_07_m(arrNames){
    for (let index = 0; index < arrNames.length; index++) {
        console.log(arrNames[index]);
    }
}
// array_07_m(arrNames);

function array_1_m(){
    let arr = []
    for(let i = 1; i<= 100; i++){
        arr.push(i);
    }
    console.log(arr);
}
// array_1_m();

function array_2_m(){
    let arr = [];
    for(let i =0; i < 5; i++){
        arr.push(Math.floor(Math.random() * 99)+1);
    }
    console.log(arr);
    array_05_m(arr);
}
// array_2_m();

function array_2_5_m(arr, num){
    for(let i = 0; i < arr.length; i++){
        if (num === arr[i]){
            return true;
        } 
    }
    return false;
}
// console.log(array_2_5_m([1,4,3,5], 4));

function array_2_7_m(arr1, arr2){
    let counterDups = 0;
    for (let index = 0; index < arr1.length; index++) {
        const numToCheck = arr1[index];
        for(let i = 0; i < arr2.length;i ++){
            if (numToCheck === arr2[i]){
                counterDups ++
            }
        }
    }
    return counterDups;
}
// console.log(array_2_7_m([1,2,3,4], [8,1,5,6]));

function array_4_m(arr){
    let arrCopied = arr;
    let unique = 0;
    for(let i = 0; i < arr.length; i++){

        let instancesCounter = 0;
        let numToCheck = arr[i];

        for(let j = 0; j < arr.length; j++){
            if(numToCheck === arr[j]){
                instancesCounter ++;
                if (instancesCounter > 1){
                    break;
                }
            }
        }
        if(instancesCounter === 1){
            unique ++;
        }

    }
    return unique
}
// console.log(array_4_m([1,6,7,6,8,10]))

function js_string_1_b(str){
    return str.toUpperCase();
}
// console.log(js_string_1_b("Hello World"));

function js_string_2_b(strOfNumbers){
    return strOfNumbers.split(",")
}
// console.log(js_string_2_b("1,234,5674,231,1"));

function js_string_3_b(str){
    let maxLength = 0, strArray = str.split(",");
    for (let index = 1; index < strArray.length; index += 2) {
        console.log(strArray[index]);
        if(strArray[index].length > maxLength){
            maxLength = strArray[index].length;
        }
    }
    return maxLength;
}
// console.log(js_string_3_b("key,value,key1,value1,key2,value22"));

let a = 1, b = 2;
function switch1(a1, b1){
    let temp = a1;
    a1 = b1;
    b1 = temp;
}
switch1(a, b);
console.log(a, b);