function checkTurn(arr, mineValue, rivalValue) {
    const mineRate = [
        checkDiagonal(arr, mineValue, rivalValue, false, 10),
        checkDiagonal(arr, mineValue, rivalValue, true, 10),
        checkLine(arr, mineValue, rivalValue, 10, true),
        checkLine(arr, mineValue, rivalValue, 10, false)
    ];
    const rivalRate = [
        checkDiagonal(arr, rivalValue, mineValue, false, 1),
        checkDiagonal(arr, rivalValue, mineValue, true, 1),
        checkLine(arr, rivalValue, mineValue, 1, true),
        checkLine(arr, rivalValue, mineValue, 1, false)
    ]
    const nextTurn = [...mineRate, ...rivalRate].sort((a, b) => {
        return b.rate - a.rate;
    })[0].positions[0];
    return nextTurn;
}

function checkDiagonal(arr, mineValue, rival, isLineGrow = false, rateMult = 1, ) {
  const squareSize = 3;
  let rate = 0;
  let nextTurnPosition = [];
  for (let i = 0; i < squareSize; i++) {
    const position = getDiagonalPosition(i, squareSize, isLineGrow);
    const value = arr[position];
    if (value === mineValue) {
      rate = rate > 0 ? 100 * 10 : 10;
    } else if (value) {
      rate = 0;
      break;
    } else {
      nextTurnPosition = [...nextTurnPosition, position];
    }
  }
  return {
    rate: rate || 0,
    positions: nextTurnPosition
  };
}

function getDiagonalPosition(i, squareSize, isGrow = true) {
  if (isGrow) {
    return squareSize * (i + 1) - i - 1;
  } else {
    return i * (squareSize + 1);
  }
}

function checkLine(arr, mineValue, rival, rateMult = 1, isCol = true) {
  let myRes = 0;
  let nextTurnPosition = null;
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
    let my = 0;
    for (let j = 0; j < 3; j++) {
      const itemPosition = i * iCoef + j * jCoef;
      const itemValue = arr[itemPosition];
      if (itemValue === mineValue) {
        if (my !== 0) {
          my = 100 * rateMult;
        } else {
          my = 10;
        }
      } else if (itemValue === rival) {
        my = 0;
        break;
      } else {
        localPosition = [...localPosition, itemPosition];
      }
    }
    if (my > myRes) {
      myRes = my;
      nextTurnPosition = [...localPosition];
    }
  }
  return {
    rate: myRes,
    positions: nextTurnPosition
  };
}

export default checkTurn;
