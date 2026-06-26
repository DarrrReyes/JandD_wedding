import { Box, Stack, Text, Title } from "@mantine/core";


interface CelebrationCardProps {
  type: string;
  venue: string;
  details: string[];
  description: string;
  aosDelay?: number;
}

export function CelebrationCard({
  type,
  venue,
  details,
  description,
  aosDelay = 0,
}: CelebrationCardProps) {

  return (
    <Box
      className="celebration-card"
      data-aos="fade-up"
      data-aos-delay={aosDelay}
    >
      <Text className="card-type">{type}</Text>

      <Title order={3} className="card-venue">
        {venue}
      </Title>

      <Stack className="card-details" gap={0}>
        {details.map((detail) => (
          <Text key={detail} className="card-detail">
            <Box component="span" className="card-detail-dot" />
            {detail}
          </Text>
        ))}
      </Stack>

      <Box className="card-footer">
        <Text className="card-description">{description}</Text>
      </Box>

      
    </Box>
  );
}
