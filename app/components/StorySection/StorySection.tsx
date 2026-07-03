import { Stack, Text, Title } from "@mantine/core";
import { ReactNode } from "react";

interface StorySectionProps {
  chapter: string;
  title: string;
  aosDelay?: number;
  children: ReactNode;
}

export default function StorySection({
  chapter,
  title,
  aosDelay = 0,
  children,
}: StorySectionProps) {
  return (
    <Stack gap="md" data-aos="fade-up" data-aos-delay={aosDelay}>
      <Text className="story-chapter">{chapter}</Text>

      <Title order={3} className="story-title">
        {title}
      </Title>

      {children}
    </Stack>
  );
}