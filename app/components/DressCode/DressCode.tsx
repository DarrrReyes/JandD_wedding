import { Box, Text, Stack } from "@mantine/core";

interface DressCodeProps {
  color: string;
  label: string;
  delay?: number;
}

export function DressCode({ color, label, delay = 0 }: DressCodeProps) {
  return (
    <Stack
      className="swatch"
      gap={8}
      align="center"
      data-aos="zoom-in"
      data-aos-delay={delay}
    >
      <Box
        className="swatch-color"
        style={{
          backgroundColor: color,
          margin: "0 auto",
        }}
      />

      <Text ta="center" className="swatch-label">
        {label}
      </Text>
    </Stack>
  );
}
