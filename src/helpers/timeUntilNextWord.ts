export function timeUntilNextWord(): string {
  const now: Date = new Date();
  const midnight: Date = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0,
    0
  );

  const timeDifference: number = midnight.getTime() - now.getTime(); // Difference in milliseconds

  const hours: number = Math.floor(timeDifference / (1000 * 60 * 60)); // Hours
  const minutes: number = Math.floor(
    (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
  ); // Minutes
  const seconds: number = Math.floor((timeDifference % (1000 * 60)) / 1000); // Seconds

  return `${hours} hours, ${minutes} minutes, and ${seconds} seconds until the next word.`;
}