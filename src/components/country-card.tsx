import { Box, Divider, Flex, Text } from '@mantine/core';
import { motion } from 'framer-motion';
import { convertDistance, getCompassDirection, getDistance } from 'geolib';
import { Country } from '../data/data';
import CountUp from 'react-countup';

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
    <Text lineClamp={1}>{text}</Text>
  </TextWithAnimation>
);

type CountryCardProps = {
  guessCountry: Country;
  country: Country;
};

const directionMap = {
  N: '⬆️',
  NE: '↗️',
  E: '➡️',
  SE: '↘️',
  S: '⬇️',
  SW: '↙️',
  W: '⬅️',
  NW: '↖️',
  NNE: '⬆️', // North-North-East
  ENE: '➡️', // East-North-East
  ESE: '↘️', // East-South-East
  SSE: '⬇️', // South-South-East
  SSW: '⬇️', // South-South-West
  WSW: '⬅️', // West-South-West
  WNW: '⬅️', // West-North-West
  NNW: '⬆️', // North-North-West
};

export function CountryCard({ guessCountry, country }: CountryCardProps) {
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
    'km'
  );

  const direction = getCompassDirection(
    guessCountryLatAndLong,
    countryLatAndLong
  );

  const proximity = 100 - (distance / 20000) * 100;

  return (
    <Flex justify={'space-between'} align={'center'} w={'100%'}>
      {guessCountry && (
        <>
          <Box w={'35%'}>
            <AnimatedText text={guessCountry.name} />
          </Box>
          <Divider orientation="vertical" />
          <Text w={'20%'}>
            <CountUp start={0} end={distance} duration={1} /> km
          </Text>
          <Divider orientation="vertical" />
          <Box w={'15%'}>
            <AnimatedText
              text={
                guessCountry === country
                  ? '🎉'
                  : directionMap[direction] || '🧭'
              }
            />
          </Box>
          <Divider orientation="vertical" />
          <Text w={'15%'}>
            <CountUp start={0} end={Math.floor(proximity)} duration={1} /> %
          </Text>
        </>
      )}
    </Flex>
  );
}
