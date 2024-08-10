import { Flex } from '@mantine/core';
import { useEffect, useState } from 'react';
import './App.css';
import { CardItem } from './components/card-item';
import { CorrectCountry } from './components/correct-country';
import { CountryMap } from './components/country-map';
import { Navbar } from './components/navbar';
import { SelectCountry } from './components/select-country';
import { GameStatus, MAX_GUESSES } from './constants';
import { countries, countriesMap } from './data/data';
import { getRandomCountry } from './helpers/getRandomCountry';

function App() {
  const storedCountryCode = localStorage.getItem('country');
  const initialCountry = storedCountryCode
    ? countriesMap.get(storedCountryCode)!
    : getRandomCountry();

  const [value, setValue] = useState<string>('');
  const [guesses, setGuesses] = useState<string[]>(
    JSON.parse(
      localStorage.getItem('guesses') ||
        JSON.stringify(Array(MAX_GUESSES).fill(''))
    )
  );
  const [guessCount, setGuessCount] = useState<number>(
    JSON.parse(localStorage.getItem('guessCount') || JSON.stringify(0))
  );
  const [gameStatus, setGameStatus] = useState<GameStatus>(
    JSON.parse(
      localStorage.getItem('gameStatus') || JSON.stringify(GameStatus.Playing)
    )
  );

  useEffect(() => {
    localStorage.setItem('country', initialCountry.code);
    localStorage.setItem('guesses', JSON.stringify(guesses));
    localStorage.setItem('guessCount', JSON.stringify(guessCount));
    localStorage.setItem('gameStatus', JSON.stringify(gameStatus));
  }, [guesses, guessCount, gameStatus, initialCountry?.code]);

  return (
    <Flex align="center" direction={'column'} gap={32}>
      <Navbar />
      <CountryMap country={initialCountry} />
      {gameStatus === GameStatus.Playing && (
        <SelectCountry
          countries={countries}
          country={initialCountry}
          value={value}
          setValue={setValue}
          guesses={guesses}
          setGuesses={setGuesses}
          guessCount={guessCount}
          setGuessCount={setGuessCount}
          gameStatus={gameStatus}
          setGameStatus={setGameStatus}
        />
      )}
      {gameStatus !== GameStatus.Playing && (
        <CorrectCountry country={initialCountry} gameStatus={gameStatus} />
      )}
      <Flex direction={'column'} gap={8} w={'100%'} align={'center'}>
        {guesses.length === 0 && <h1>No guesses</h1>}
        {guesses.map((guess, index) => {
          const guessCountry = countries.find(
            (country) => country.name === guess
          );
          if (gameStatus === GameStatus.Won && index >= guessCount) return null;
          return (
            <CardItem
              key={index}
              index={index}
              guessCount={guessCount}
              guess={guess}
              guessCountry={guessCountry}
              country={initialCountry}
            />
          );
        })}
      </Flex>
    </Flex>
  );
}

export default App;
