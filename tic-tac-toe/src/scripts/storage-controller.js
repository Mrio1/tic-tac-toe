const storageName = "ticTacToe"
const gameData = localStorage.getItem(storageName);

const getGameData = () => {
  return JSON.parse(gameData);
}

const updateGameData = (data) => {
  localStorage.setItem(storageName, data)
}

export {getGameData, updateGameData};
