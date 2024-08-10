import { Flex, Title } from '@mantine/core';
import { IconGlobe } from '@tabler/icons-react';

export function Logo() {
  return (
    <Flex align={'center'} gap={4} justify={'center'}>
      <IconGlobe />
      <Title fw={700} order={2} c="var(--mantine-white)">
        WORLDLE
      </Title>
    </Flex>
  );
}
