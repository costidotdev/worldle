import { countries, Country } from "../data/data";

export function getCountryForToday(): Country {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.valueOf() - new Date(today.getFullYear(), 0, 0).valueOf()) / 86400000
  );
  const index = dayOfYear % countries.length;
  return countries[index];
}
