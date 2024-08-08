import { Flex, Title } from "@mantine/core";
import { IconGlobeFilled } from "@tabler/icons-react";

export function Logo() {
  return (
    <Flex align={"center"} gap={4} justify={"center"}>
      <IconGlobeFilled />
      <Title fw={700} order={2} c="var(--mantine-white)">
        WORLDLE
      </Title>
    </Flex>
  );
}
