import { countries, Country } from "../data/data";

export function getRandomCountry(): Country {
  return countries[Math.floor(Math.random() * countries.length)];
}
