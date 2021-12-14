const firsPlayerRatingFactor = 10;
const secondPlayerRatingFactor = 1;
const twoItemsCombinationCost = 100;
const oneItemsCombinationCost = 10;
const angleOffset = 1;

const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const combinationsCount = winCombinations.length;

function getWinPosition(arr, secondValue) {
  for (let i = 0; i < combinationsCount; i++) {
    if (!winCombinations[i].some((el) => arr[el] === secondValue)) {
      const nextTurns =  winCombinations[i].filter(el => {
  
        return arr[el] === null;
      })
      if (nextTurns.length === 1) {
        return nextTurns[0];
      }
   }
  }

 return null
}

function getRandomPosition(arr) {
  if (!arr[4]) {
    return 4;
  }

  return arr.indexOf(null);
}

function checkTurn(arr, botValue, playerValue) {
  const botWinPosition = getWinPosition(arr, playerValue);
  const playerWinPosition = getWinPosition(arr, botValue);

  return botWinPosition || playerWinPosition || getRandomPosition(arr);
}

export default checkTurn;
