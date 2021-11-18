const firsPlayerRatingFactor = 10;
const secondPlayerRatingFactor = 1;
const twoItemsCombinationCost = 100;
const oneItemsCombinationCost = 10;
const angleOffset = 1;

function checkTurn(arr, firstPlayerValue, secondPlayerValue) {
    const firstPlayerRatштп = [
        checkDiagonalWinCombination(arr, firstPlayerValue, secondPlayerValue, false, firsPlayerRatingFactor),
        checkDiagonalWinCombination(arr, firstPlayerValue, secondPlayerValue, true, firsPlayerRatingFactor),
        checkLineWinCombination(arr, firstPlayerValue, secondPlayerValue, firsPlayerRatingFactor, true),
        checkLineWinCombination(arr, firstPlayerValue, secondPlayerValue, firsPlayerRatingFactor, false)
    ];
    const secondPlayerRating = [
        checkDiagonalWinCombination(arr, secondPlayerValue, firstPlayerValue, false, secondPlayerRatingFactor),
        checkDiagonalWinCombination(arr, secondPlayerValue, firstPlayerValue, true, secondPlayerRatingFactor),
        checkLineWinCombination(arr, secondPlayerValue, firstPlayerValue, secondPlayerRatingFactor, true),
        checkLineWinCombination(arr, secondPlayerValue, firstPlayerValue, secondPlayerRatingFactor, false)
    ]
    const nextTurnVariantsArray = [...firstPlayerRatштп, ...secondPlayerRating].sort((a, b) => {
        return b.rating - a.rating;
    });
    const maxRatingPositionsArray = nextTurnVariantsArray[0].positions;
    const firstRecomendedPosition = maxRatingPositionsArray[0];
    return firstRecomendedPosition;
}

function checkDiagonalWinCombination(arr, firstPlayerValue, secondPlayerValue, isLineAngleGrow = false, ratingFactor = 1, ) {
  const squareSize = 3;
  let rating = 0;
  let nextTurnPositions = [];
  for (let i = 0; i < squareSize; i++) {
    const position = getDiagonalPosition(i, squareSize, isLineAngleGrow);
    const value = arr[position];
    if (value === firstPlayerValue) {
      rating = rating > 0 ? twoItemsCombinationCost * oneItemsCombinationCost : oneItemsCombinationCost;
    } else if (value) {
      rating = 0;
      break;
    } else {
      nextTurnPositions.push(position);
    }
  }
  return {
    rating: rating || 0,
    positions: nextTurnPositions
  };
}

function getDiagonalPosition(i, squareSize, isLineAngleGrow = true) {
  if (isLineAngleGrow) {
    return squareSize * (i + angleOffset) - i - angleOffset;
  } else {
    return i * (squareSize + angleOffset);
  }
}

function checkLineWinCombination(arr, firstPlayerValue, secondPlayerValue, ratingFactor = 1, isCol = true) {
  let maxResult = 0;
  let nextTurnPositions = [];
  const coef = 3;
  let iCoef = 1;
  let jCoef = 1;
  if (isCol) {
    jCoef *= coef;
  } else {
    iCoef *= coef;
  }
  for (let i = 0; i < 3; i++) {
    let localPosition = [];
    let result = 0;
    for (let j = 0; j < 3; j++) {
      const itemPosition = i * iCoef + j * jCoef;
      const itemValue = arr[itemPosition];
      if (itemValue === firstPlayerValue) {
        if (result !== 0) {
          result = twoItemsCombinationCost * ratingFactor;
        } else {
          result = oneItemsCombinationCost;
        }
      } else if (itemValue === secondPlayerValue) {
        result = 0;
        break;
      } else {
        localPosition = [...localPosition, itemPosition];
      }
    }
    if (result > maxResult) {
      maxResult = result;
      nextTurnPositions = [...localPosition];
    }
  }
  return {
    rating: maxResult,
    positions: nextTurnPositions
  };
}

export default checkTurn;
