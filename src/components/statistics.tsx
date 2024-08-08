import { ActionIcon, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChartBar } from "@tabler/icons-react";

export function Statistics() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Coming Soon" centered>
        {/* <Flex direction={"row"} gap={48} align={"center"} justify={"center"}>
          <Text size="xs" ta={"center"}>
            <Text size="xl" fw={700} span>
              2 
            </Text>{" "}
            <br /> Played
          </Text>
          <Text size="xs" ta={"center"}>
            <Text size="xl" fw={700} span>
              100%
            </Text>{" "}
            <br /> Win
          </Text>
          <Text size="xs" ta={"center"}>
            <Text size="xl" fw={700} span>
              2
            </Text>{" "}
            <br /> Current Streak
          </Text>
          <Text size="xs" ta={"center"}>
            <Text size="xl" fw={700} span>
              2
            </Text>{" "}
            <br /> Max Streak
          </Text>
        </Flex> */}
      </Modal>
      <ActionIcon onClick={open} size={"lg"} variant="default">
        <IconChartBar stroke={1.5} />
      </ActionIcon>{" "}
    </>
  );
}
