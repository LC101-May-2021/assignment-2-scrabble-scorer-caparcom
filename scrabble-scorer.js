// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

/*const vowelPointStructer = {
  1:['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Z' ],
  3:['A', 'E', 'I', 'O', 'U', 'Y']
}*/

let firstWord;

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
  let total = 0
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
      total += (Number(`${pointValue}`))
		 }
	  }
	}
	return (letterPoints + `Total points: ${total}`);
 }

function simpleScore(word) {
  //word = word.toUpperCase();
  let counter = 0;
  for (let i=0; i<word.length; i++) {
    counter++;
  }
  return (`In simpleScore... Each letter is worth 1 point, so ${word} is worth ${counter} points! `);
}

function vowelBonusScore(word) {
  let score = 0;
  let vowels = "AEIOU";
  for (let i=0; i<word.length; i++) {
    if(vowels.includes(word[i].toUpperCase())) {
        score+=3;
    } else {
      score+=1;
    }
  }
  return (`${word} is worth ${score} points!`);
}

const scoringAlgorithms = [simpleScore, vowelBonusScore, oldScrabbleScorer];


// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
// const enteredWord = [];
function initialPrompt() {
   firstWord = input.question("Let's play some scrabble! Please enter a word: \t\n");
  //  enteredWord.push(firstWord);
   return firstWord;
};
// initialPrompt();
let scrabbleScore;

//const listOfAlgorithms = [simpleScore(), vowelBonusScore(), oldScrabbleScorer()];

const itsSimp = {
  name: "Simple Score",
  description: "Each letter is worth 1 point ",
  scorerFunction: scoringAlgorithms[0]
}
const veryVowely = {
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scorerFunction: scoringAlgorithms[1]
}
const oldieButAGoodie = {
  name: "Scrabble",
  description: "The traditional scoring algorithm.",
  scorerFunction: scoringAlgorithms[2]
}


//Hold on to the word entered, then we need to hold on to the object chosen, then return the object, then use the function to return the word.

function scorerPrompt(num) {
  let whichPrompt = Number(input.question("Which scoring algorithm would you like to use? \n\n" + "\n Please select from the following...\n\t0 - Simple Score - Each letter is worth 1 point. \n\t 1 - Bonus Vowels - Vowels are worth an extra 2 points! \n\t 2 - Scrabble - The traditional scoring algorithm! "));
  if (whichPrompt === 0) {
    console.log(simpleScore(firstWord));
    return;
  } else if (whichPrompt === 1) {
    console.log(vowelBonusScore(firstWord));
    return;
  } else if (whichPrompt === 2) {
    console.log(oldScrabbleScorer(firstWord));
    return;
  } else {
  console.log("Please input either of the 3 choices listed... ");
  scorerPrompt();
  }
};
let newPointStructure;

function transform(obj) {
  newPointStructure = {};
  for (const oldKeys in obj) {
    for (let i=0; i<obj[oldKeys].length; i++) {
    newPointStructure[obj[oldKeys][i].toLowerCase()] = Number(oldKeys);
  }
  }
  return newPointStructure
};


function runProgram() {
 initialPrompt();
 scorerPrompt();
}

runProgram();

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};