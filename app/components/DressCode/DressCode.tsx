import { Box, Group, Stack, Text, Tooltip } from "@mantine/core";
import { ReactNode } from "react";

interface DressCodeProps {
  // to?: string;
  // image?: ReactNode;
  dressCode: {
    color: string;
    name: string
    delay: number;
  }[];
}

export function DressCode({  dressCode }: DressCodeProps) {
  return (
    <Stack
      className="swatch"
      gap={8}
      align="center"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      {/* <Box className="gold-divider" /> */}
      {/* <Text ta="center" className="swatch-title">
        {to}
      </Text> */}

      <Text className="footer-thanks" ta="center">
        We kindly encourage our guests to choose from our wedding color palette.
        Whether you wear one shade or mix and match, we’d love to see you bring
        these colors to life on our special day.
      </Text>

      <Group gap="xs" justify="center">
        {dressCode.map((item, index) => (
            <Tooltip
            key={index}
            label={item.name}
            withArrow
            position="top"
            classNames={{
              tooltip: "dress-code-tooltip",
            }}
          >
            <Box
              className="swatch-color"
              data-aos="zoom-in"
              data-aos-delay={item.delay}
              style={{
                backgroundColor: item.color,
                margin: "0 auto",
              }}
            />
          </Tooltip>
        ))}
      </Group>
    </Stack>
  );
}
