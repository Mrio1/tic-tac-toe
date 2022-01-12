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
const bestFreePositionIndex = 4;
const combinationsCount = winCombinations.length;

function getWinPosition(moveValuesArray, secondValue) {
  for (let i = 0; i < combinationsCount; i++) {
    if (!winCombinations[i].some((el) => moveValuesArray[el] === secondValue)) {
      const nextTurns =  winCombinations[i].filter(el => {
  
        return moveValuesArray[el] === null;
      })
      if (nextTurns.length === 1) {
        
        return nextTurns[0];
      }
   }
  }

 return null
}

function getRandomPosition(moveValuesArray) {
  if (!moveValuesArray[bestFreePositionIndex]) {
    return bestFreePositionIndex;
  }

  return moveValuesArray.indexOf(null);
}

function checkTurn(moveValuesArray, botValue, playerValue) {
  const botWinPosition = getWinPosition(moveValuesArray, playerValue);
  const playerWinPosition = getWinPosition(moveValuesArray, botValue);

  return botWinPosition || playerWinPosition || getRandomPosition(moveValuesArray);
}

export default checkTurn;
