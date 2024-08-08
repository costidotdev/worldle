import { Card, Text } from "@mantine/core";
import { MAX_GUESSES } from "../constants";
import { Country } from "../data/data";
import { CountryCard } from "./country-card";

type PaperItemProps = {
  index: number;
  guessCount: number;
  guess: string;
  guessCountry?: Country;
  country: Country;
};

export const CardItem = ({
  index,
  guessCount,
  guess,
  guessCountry,
  country,
}: PaperItemProps) => {
  const isActive = index === guessCount;
  const borderColor = isActive ? "var(--mantine-color-blue-6)" : "";
  const displayText = guess === "" ? `Guess ${index + 1} / ${MAX_GUESSES}` : "";

  return (
    <Card
      key={index}
      w={"100%"}
      shadow="xs"
      withBorder
      h={24}
      px={24}
      style={{
        borderColor: borderColor,
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {guess === "" ? (
        <Text>{index === guessCount ? displayText : ""}</Text>
      ) : (
        <CountryCard guessCountry={guessCountry!} country={country} />
      )}
    </Card>
  );
};
