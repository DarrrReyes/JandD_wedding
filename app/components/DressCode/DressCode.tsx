import { Box, Group, Stack, Text } from "@mantine/core";
import { ReactNode } from "react";

interface DressCodeProps {
  to: string;
  image?: ReactNode;
  dressCode: {
    color: string;
    delay: number;
  }[];
}

export function DressCode({ to, image, dressCode }: DressCodeProps) {
  return (
    <Stack
      className="swatch"
      gap={8}
      align="center"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      {image}

      <Box className="gold-divider" />
      <Text ta="center" className="swatch-title">
        {to}
      </Text>

      <Group gap="xs" justify="center">
        {dressCode.map((item, index) => (
          <Box
            key={index}
            className="swatch-color"
            data-aos="zoom-in"
            data-aos-delay={item.delay}
            style={{
              backgroundColor: item.color,
              margin: "0 auto",
            }}
          />
        ))}
      </Group>
    </Stack>
  );
}
