import { Badge, Button, Flex } from "@mantine/core";
import { Country } from "../data/data";
import { GameStatus } from "../constants";

type CorrectCountryProps = {
  country: Country;
  gameStatus: GameStatus;
};

export function CorrectCountry({ country, gameStatus }: CorrectCountryProps) {
  return (
    <>
      <Badge
        color={gameStatus === GameStatus.Won ? "green" : "red"}
        variant="filled"
      >
        Country: {country.name}
      </Badge>
      <Flex
        w={"100%"}
        justify={"center"}
        align={"center"}
        gap={8}
        direction={"row"}
      >
        <Button
          size="md"
          onClick={() => {
            window.open(
              `https://en.wikipedia.org/wiki/${country.name}`,
              "_blank"
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
              "_blank"
            );
          }}
        >
          Google Maps
        </Button>
      </Flex>
    </>
  );
}
