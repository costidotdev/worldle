import { ActionIcon, Anchor, Divider, Flex, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconQuestionMark } from '@tabler/icons-react';
import { countries } from '../data/data';
import { ExampleCountryCard } from './example-country-card';
import { getCompassDirection, getDistance } from 'geolib';
import { directionMap } from '../helpers/directionMap';

export function Rules() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="How to play"
        size={'lg'}
        styles={{
          title: {
            fontWeight: 500,
          },
        }}
      >
        <Flex direction={'column'} gap={16}>
          <Text size="sm">
            Guess the <span>WORLDLE</span> in 6 guesses.
          </Text>

          <Text size="sm">
            Each guess must be a valid country or territory.
          </Text>
          <Text size="sm">
            After each guess, you will have the distance, the direction and the
            proximity from your guess to the target location.
          </Text>
          <Divider />
          <Text fw={500} size="sm">
            Examples:
          </Text>
          <Flex direction={'column'} gap={24}>
            <ExampleCountryCard
              guessCountry={countries[2]}
              country={countries[0]}
            />
            <Text size="sm">
              Your guess {countries[2].name} is{' '}
              {getDistance(
                {
                  latitude: countries[2].latitude,
                  longitude: countries[2].longitude,
                },
                {
                  latitude: countries[0].latitude,
                  longitude: countries[0].longitude,
                }
              ).toFixed(2)}{' '}
              km away from the target location, the target location is in the
              {
                directionMap[
                  getCompassDirection(
                    {
                      latitude: countries[2].latitude,
                      longitude: countries[2].longitude,
                    },
                    {
                      latitude: countries[0].latitude,
                      longitude: countries[0].longitude,
                    }
                  )
                ]
              }{' '}
              direction and you have 71% of proximity!
            </Text>
          </Flex>

          <ExampleCountryCard
            guessCountry={countries[5]}
            country={countries[0]}
          />
          <Text size="sm">
            Your second guess <Text span fw={500} />
            {countries[5].name} is getting closer!
            {getDistance(
              {
                latitude: countries[5].latitude,
                longitude: countries[5].longitude,
              },
              {
                latitude: countries[0].latitude,
                longitude: countries[0].longitude,
              }
            ).toFixed(2)}{' '}
            km away,{' '}
            {
              directionMap[
                getCompassDirection(
                  {
                    latitude: countries[5].latitude,
                    longitude: countries[5].longitude,
                  },
                  {
                    latitude: countries[0].latitude,
                    longitude: countries[0].longitude,
                  }
                )
              ]
            }{' '}
            and 92%!
          </Text>

          <ExampleCountryCard
            guessCountry={countries[0]}
            country={countries[0]}
          />
          <Text size="sm">
            Next guess,{' '}
            <Text span fw={500}>
              {countries[0].name}
            </Text>
            , it's the location to guess! Congrats! 🎉
          </Text>
          <Text>
            Inspired by{' '}
            <Anchor href="https://www.nytimes.com/games/wordle/index.html">
              Wordle{' '}
            </Anchor>
            and{' '}
            <Anchor href="https://worldle.teuteuf.fr/">
              {' '}
              Worldle by Teuteuf
            </Anchor>
          </Text>
        </Flex>
      </Modal>
      <ActionIcon onClick={open} size={'lg'} variant="default">
        <IconQuestionMark stroke={1.5} />
      </ActionIcon>
    </>
  );
}
