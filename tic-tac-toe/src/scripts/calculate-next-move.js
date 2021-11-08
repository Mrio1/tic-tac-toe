function checkTurn(arr, own, opossit) {
    const ownRate = [
        checkDiagonal(arr, own, opossit,false, 10),
        checkDiagonal(arr, own, opossit,true, 10),
        checkLine(arr, own, opossit,10, true),
        checkLine(arr, own, opossit,10, false)
    ];
    const opossitRate = [
        checkDiagonal(arr, opossit, own, false, 1),
        checkDiagonal(arr, opossit, own, true, 1),
        checkLine(arr, opossit, own, 1, true),
        checkLine(arr, opossit, own, 1, false)
    ]
    const nextTurn = [...ownRate, ...opossitRate].sort((a, b) => {
        return b.rate - a.rate;
    })[0].positions[0];
    return nextTurn;
}

function checkDiagonal(arr, own, opossit, isLineGrow = false, rateMult = 1, ) {
  const squareSize = 3;
  let rate = 0;
  let recomPosition = [];
  for (let i = 0; i < squareSize; i++) {
    const position = getDiagonalPosition(i, squareSize, isLineGrow);
    const value = arr[position];
    if (value === own) {
      rate = rate > 0 ? 100 * 10 : 10;
    } else if (value) {
      rate = 0;
      break;
    } else {
      recomPosition = [...recomPosition, position];
    }
  }
  return {
    rate: rate || 0,
    positions: recomPosition
  };
}

function getDiagonalPosition(i, squareSize, isGrow = true) {
  if (isGrow) {
    return squareSize * (i + 1) - i - 1;
  } else {
    return i * (squareSize + 1);
  }
}

function checkLine(arr, own, opossit, rateMult = 1, isCol = true) {
  let myRes = 0;
  let recomPosition = null;
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
      if (itemValue === own) {
        if (my !== 0) {
          my = 100 * rateMult;
        } else {
          my = 10;
        }
      } else if (itemValue === opossit) {
        my = 0;
        break;
      } else {
        localPosition = [...localPosition, itemPosition];
      }
    }
    if (my > myRes) {
      myRes = my;
      recomPosition = [...localPosition];
    }
  }
  return {
    rate: myRes,
    positions: recomPosition
  };
}

export default checkTurn;
