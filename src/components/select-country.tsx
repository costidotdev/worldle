import { Autocomplete, Button, Flex } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconSearch } from '@tabler/icons-react';
import { useCallback, useEffect, useRef } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import { GameStatus, MAX_GUESSES } from '../constants';
import { Country } from '../data/data';
import useFocusOnKey from '../hooks/useFocusOnKey';

type SelectCountryProps = {
  countries: Country[];
  country: Country;
  value: string;
  setValue: (value: string) => void;
  guesses: string[];
  setGuesses: (guesses: string[]) => void;
  guessCount: number;
  setGuessCount: (guessCount: number) => void;
  gameStatus: GameStatus;
  setGameStatus: (gameStatus: GameStatus) => void;
};

export function SelectCountry({
  countries,
  country,
  value,
  setValue,
  guesses,
  setGuesses,
  guessCount,
  setGuessCount,
  gameStatus,
  setGameStatus,
}: SelectCountryProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const autoCompleteRef = useRef<HTMLInputElement>(null);

  const handleCountrySubmit = useCallback(() => {
    if (!value) {
      notifications.show({
        color: 'red',
        title: 'No country selected',
        message: 'Please select a country',
      });
      return;
    }
    if (!countries.map((c) => c.name).includes(value)) {
      notifications.show({
        color: 'red',
        title: 'Country not found',
        message: 'Please select a valid country',
      });
      return;
    }
    if (guesses.includes(value)) {
      notifications.show({
        color: 'red',
        title: 'Already guessed',
        message: 'Please select a different country',
      });
      return;
    }
    if (guessCount < MAX_GUESSES) {
      const newGuesses = [...guesses];
      newGuesses[guessCount] = value;
      setGuesses(newGuesses);
      setGuessCount(guessCount + 1);
      setValue('');
    }
    // this is a guess so we need to add minus one
    if (country.name === value) {
      setGameStatus(GameStatus.Won);
      notifications.show({
        color: 'green',
        message: 'Nice job!',
        position: 'top-center',
      });
      return;
    }
    if (guessCount === MAX_GUESSES - 1) {
      setGameStatus(GameStatus.Lost);
      notifications.show({
        color: 'red',
        message: 'Game over, try again tomorrow!',
        position: 'top-center',
      });
    }
  }, [
    value,
    countries,
    guesses,
    guessCount,
    country,
    setGameStatus,
    setGuessCount,
    setValue,
    setGuesses,
  ]);

  useEffect(() => {
    const autoComplete = autoCompleteRef.current;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        if (countries.map((c) => c.name).includes(value)) {
          handleCountrySubmit();
        }
      }
    };

    autoComplete?.addEventListener('keydown', handleKeyDown);
    return () => {
      autoComplete?.removeEventListener('keydown', handleKeyDown);
    };
  }, [value, countries, autoCompleteRef, handleCountrySubmit]);

  useFocusOnKey('/', autoCompleteRef);

  function handleKeyboardOptionSubmit(newValue: string) {
    setValue(newValue);
  }

  return (
    <>
      {gameStatus === GameStatus.Won && <ConfettiExplosion />}
      <Flex
        gap={16}
        align={'center'}
        justify={'center'}
        direction={'row'}
        w={'100%'}
      >
        <Autocomplete
          data={countries.map((country) => country.name)}
          aria-label="Country"
          placeholder="Select country"
          radius="md"
          size="md"
          onOptionSubmit={handleKeyboardOptionSubmit}
          value={value}
          onChange={setValue}
          ref={autoCompleteRef}
          withScrollArea={false}
          styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
          flex={2}
          inputSize="md"
          leftSection={<IconSearch size={18} />}
        />
        <Button size="md" ref={btnRef} onClick={handleCountrySubmit}>
          Submit
        </Button>
      </Flex>
    </>
  );
}
