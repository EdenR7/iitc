const NUM_DIGITS = 4;
let pcDigits; // -- array of unique 0-9 digits that the pc create randomally
let userDigits; // -- array of unique 0-9 digits that the user need to guess
let currentUserDigitIndex;

const elemPcDigitFirst = document.querySelector("#pc_digit_index_0");
const elemPcDigitSecond = document.querySelector("#pc_digit_index_1");
const elemPcDigitThird = document.querySelector("#pc_digit_index_2");
const elemPcDigitFourth = document.querySelector("#pc_digit_index_3");
const elemGuessResult = document.querySelector("#guessResult");

let numBulls = 0,
  numCows = 0;

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function computeRandInteger0to9() {
  return randomIntFromInterval(0, 9);
}

function isUserDuplicate() {
  const setUserDigits = new Set();
  userDigits.forEach((userDigit) => {
    setUserDigits.add(userDigit);
  });

  return setUserDigits.size != NUM_DIGITS;
}

function computeRandUnique() { // return random numbers
  let numberExist, randNum;
  do {
    randNum = computeRandInteger0to9();
    // --- if found - return . otherwise return undefined
    // --- you can also find using for loop
    const numberFound = pcDigits.find((num) => num == randNum);
    numberExist = numberFound != undefined;
  } while (numberExist);
  return randNum;
}

function pcFillNewUniqueRandomNumbers() {
  for (let index = 0; index < NUM_DIGITS; index++) {
    const uniqueNumberInPcNumberArray = computeRandUnique();
    pcDigits[index] = uniqueNumberInPcNumberArray;
  }
}

function putUserDigitsOnTheDom() {
  userDigits.forEach((userDigit, i) => {
    getElemUserDigit(i).innerText = userDigit;
  });
}

function putPcDigitsOnTheDom() { // put the ? if there the value is undefined
  elemPcDigitFirst.innerText = pcDigits[0] != undefined ? pcDigits[0] : "?";
  elemPcDigitSecond.innerText = pcDigits[1] != undefined ? pcDigits[1] : "?";
  elemPcDigitThird.innerText = pcDigits[2] != undefined ? pcDigits[2] : "?";
  elemPcDigitFourth.innerText = pcDigits[3] != undefined ? pcDigits[3] : "?";
}

function goClickHandler() {
  const elemDuplicateError = document.querySelector("#duplicateError");
  if (isUserDuplicate()) {
    elemDuplicateError.innerText = "Duplicates";
  } else {
    elemDuplicateError.innerText = "";
    computeBullsAndCows();
    addBullsCowsResultToDom();
  }
}

function computeBullsAndCows() {
  numBulls = 0;
  numCows = 0;

  for (
    let indexUserDigit = 0;
    indexUserDigit < userDigits.length;
    indexUserDigit++
  ) {
    const userDigit = userDigits[indexUserDigit];
    const indexPcDigitFound = pcDigits.findIndex((pcDigit) => {
      return userDigit == pcDigit;
    });
    if (indexPcDigitFound == indexUserDigit) {
      numBulls++;
    } else if (indexPcDigitFound != -1) {
      numCows++;
    }
  }
}

function addBullsCowsResultToDom() {
  // -- you can use also for loop for shorter code and less bug prone code
  const userDigitsString =
    `<span class="digit_in_number">${userDigits[0]}</span>` +
    `<span class="digit_in_number">${userDigits[1]}</span>` +
    `<span class="digit_in_number">${userDigits[2]}</span>` +
    `<span class="digit_in_number">${userDigits[3]}</span>`;
  const leftDiv = `<div style=flex:1;>${userDigitsString}</div>`;
  const rightDiv = `<div style=flex:1;><span class='bulls bulls_cows'>${numBulls}</span><span class='cows bulls_cows'>${numCows}</span></div>`;
  elemGuessResult.innerHTML += `<div class='number'>${leftDiv}${rightDiv}</div>`;
}

function getElemUserDigit(indexUserDigit) { // update the last index selected
    return document.querySelector(`#user_digit_index_${indexUserDigit}`);
}




/**
 * cyclic increment , but at 9 go to 0
 * @param {*} indexUserDigit 
 */
function userDigitClickHandler(indexUserDigit) {
    // add one onclick
  currentUserDigitIndex = indexUserDigit;
  userDigits[indexUserDigit] =
    userDigits[indexUserDigit] == 9 ? 0 : userDigits[indexUserDigit] + 1;

  const elemUserDigit = getElemUserDigit(indexUserDigit);// return the button object
  elemUserDigit.innerText = userDigits[indexUserDigit]; // update
  updateSelectedDigitClass();
}

function startNewGame() {
  numBulls = 0;
  numCows = 0;
  currentUserDigitIndex = 0;
  getElemUserDigit(currentUserDigitIndex).classList.add(
    "selected_class_user_digit"
  );
  pcDigits = [undefined, undefined, undefined, undefined];
  putPcDigitsOnTheDom();
  userDigits = [0, 1, 2, 3];
  putUserDigitsOnTheDom();
  elemGuessResult.innerHTML = "";
  pcFillNewUniqueRandomNumbers();
}

function showHistory() {
  alert("not implemented");
}

function keyboardDigitClickHandler(digit) {
  getElemUserDigit(currentUserDigitIndex).innerText = digit;
  userDigits[currentUserDigitIndex] = digit; /// The answer
  // --- increment currentUserDigitIndex for better UX
  const lastIndex = NUM_DIGITS - 1;
  currentUserDigitIndex =
    currentUserDigitIndex == lastIndex ? 0 : currentUserDigitIndex + 1;
    
  updateSelectedDigitClass();
  console.log(userDigits);
}

startNewGame();
function updateSelectedDigitClass() {
  for (let index = 0; index < NUM_DIGITS; index++) {
    getElemUserDigit(index).classList.remove("selected_class_user_digit");
  }
  // add selected class
  getElemUserDigit(currentUserDigitIndex).classList.add(
    "selected_class_user_digit"
  );
}