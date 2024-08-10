import { ActionIcon, Flex } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import { Logo } from "./logo";
import { ModeToggle } from "./mode-toggle";
import { Rules } from "./rules";
import { Statistics } from "./statistics";

export function Navbar() {
  return (
    <Flex justify={"space-between"} align="center" w={"100%"}>
      <Flex gap={16}>
        <Rules />
        <Statistics />
      </Flex>
      <Logo />
      <Flex gap={16}>
        <ActionIcon
          size={"lg"}
          variant="default"
          onClick={() =>
            window.open("https://github.com/costelnr1/worldle", "_blank")
          }
        >
          <IconBrandGithub stroke={1.5} />
        </ActionIcon>
        <ModeToggle />
      </Flex>
    </Flex>
  );
}
