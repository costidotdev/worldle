import { Badge, Button, Flex } from '@mantine/core';
import { GameStatus } from '../constants';
import { Country } from '../data/data';
import { resetGame } from '../helpers/resetGame';

type CorrectCountryProps = {
  country: Country;
  gameStatus: GameStatus;
};

export function CorrectCountry({ country, gameStatus }: CorrectCountryProps) {
  return (
    <Flex direction={'column'} gap={16} align={'center'}>
      <Badge
        color={gameStatus === GameStatus.Won ? 'green' : 'red'}
        variant="filled"
      >
        Country: {country.name}
      </Badge>
      <Flex
        w={'100%'}
        justify={'center'}
        align={'center'}
        gap={8}
        direction={'row'}
      >
        <Button
          size="md"
          onClick={() => {
            window.open(
              `https://en.wikipedia.org/wiki/${country.name}`,
              '_blank'
            );
          }}
        >
          Wikipedia
        </Button>
        <Button
          size="md"
          onClick={() => {
            window.open(
              `https://www.google.com/maps/place/${country.name}`,
              '_blank'
            );
          }}
        >
          Google Maps
        </Button>
        <Button size="md" onClick={resetGame}>
          Play again
        </Button>
      </Flex>
    </Flex>
  );
}
