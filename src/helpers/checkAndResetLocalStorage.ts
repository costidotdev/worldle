import { GameStatus, MAX_GUESSES } from "../constants";

// Check and reset localStorage
function getCurrentDate() {
  const now = new Date();
  return now.toISOString().split("T")[0]; // Returns date in YYYY-MM-DD format
}

export function checkAndResetLocalStorage() {
  const lastResetDate = localStorage.getItem("lastResetDate");
  const currentDate = getCurrentDate(); // Assume getCurrentDate() returns YYYY-MM-DD format

  if (lastResetDate !== currentDate) {
    localStorage.setItem(
      "guesses",
      JSON.stringify(Array(MAX_GUESSES).fill(""))
    );
    localStorage.setItem("guessCount", JSON.stringify(0));
    localStorage.setItem("gameStatus", JSON.stringify(GameStatus.Playing));
    localStorage.setItem("lastResetDate", currentDate); // Update last reset date
  }
}
