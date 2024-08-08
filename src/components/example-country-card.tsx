import { Box, Divider, Flex, Paper, Text } from "@mantine/core";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Country } from "../data/data";
import { convertDistance, getCompassDirection, getDistance } from "geolib";

type TextWithAnimationProps = {
  children: React.ReactNode;
};

const TextWithAnimation = ({ children }: TextWithAnimationProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

type AnimatedTextProps = {
  text: string;
};

const AnimatedText = ({ text }: AnimatedTextProps) => (
  <TextWithAnimation>
    <Text>{text}</Text>
  </TextWithAnimation>
);

type CountryCardProps = {
  guessCountry: Country;
  country: Country;
};

export function ExampleCountryCard({
  guessCountry,
  country,
}: CountryCardProps) {
  const guessCountryLatAndLong = {
    latitude: guessCountry.latitude,
    longitude: guessCountry.longitude,
  };

  const countryLatAndLong = {
    latitude: country.latitude,
    longitude: country.longitude,
  };

  const distance = convertDistance(
    getDistance(guessCountryLatAndLong, countryLatAndLong),
    "km"
  );

  const direction = getCompassDirection(
    guessCountryLatAndLong,
    countryLatAndLong
  );

  const proximity = (distance / 20000) * 100;
  return (
    <Paper
      w={"100%"}
      shadow="xs"
      withBorder
      h={36}
      px={24}
      style={{
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Flex justify={"space-between"} align={"center"} w={"100%"}>
        {guessCountry && (
          <>
            <Box w={"35%"}>
              <AnimatedText text={guessCountry.name} />
            </Box>
            <Divider orientation="vertical" />
            <Text w={"20%"}>
              <CountUp start={0} end={distance} duration={1} /> km
            </Text>
            <Divider orientation="vertical" />{" "}
            <Box w={"15%"}>
              <AnimatedText text={direction} />
            </Box>
            <Divider orientation="vertical" />
            <Text w={"15%"}>
              <CountUp start={0} end={Math.floor(proximity)} duration={1} /> %
            </Text>
          </>
        )}
      </Flex>
    </Paper>
  );
}
