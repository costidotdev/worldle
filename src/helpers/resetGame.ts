export function resetGame() {
  localStorage.removeItem('country');
  localStorage.removeItem('guesses');
  localStorage.removeItem('guessCount');
  localStorage.removeItem('gameStatus');
  window.location.reload();
}
