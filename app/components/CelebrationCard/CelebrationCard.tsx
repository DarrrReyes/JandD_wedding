import { Box, Flex, Stack, Text, Title } from "@mantine/core";
import dayjs from "dayjs";

interface CelebrationCardProps {
  type: string;
  when: string;
  whenSub?: string[];
  venue: string;
  location: string;
  img: string;
  details: string[];
  aosDelay?: number;
  remarks?: string;
}

export function CelebrationCard({
  type,
  when,
  whenSub,
  venue,
  location,
  img,
  details,
  remarks,
  aosDelay = 0,
}: CelebrationCardProps) {
  return (
    <Box
      className="celebration-card"
      data-aos="fade-up"
      data-aos-delay={aosDelay}
    >
      <Text className="card-type">{type}</Text>
      <Stack>
        <Title order={3} className="card-venue">
          {venue}
        </Title>

        <Stack>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              location
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="map-link"
          >
            <img
              src={img}
              alt={`View ${venue} on Google Maps`}
              className="map-image"
            />
            <div className="location-label">{venue}</div>
          </a>
        </Stack>
      </Stack>

      <Stack className="card-details" gap="md">
        <Box className="detail-row">
          <Text className="detail-label">WHEN</Text>

          <Box className="detail-content">
            <Text className="detail-main">
              {dayjs(when).format("(dddd), MMMM DD, YYYY")}
            </Text>
            {whenSub?.map((sub) => (
              <Text key={sub} className="detail-sub">
                {sub}
              </Text>
            ))}
          </Box>
        </Box>

        <Box className="detail-row">
          <Text className="detail-label">WHERE</Text>

          <Box className="detail-content">
            <Text className="detail-main">{venue}</Text>

            {details.map((line) => (
              <Text key={line} className="detail-sub">
                {line}
              </Text>
            ))}
          </Box>
        </Box>

        <Box className="detail-row">
          <Text className="detail-label">REMINDERS</Text>

          <Box className="detail-content">
            <Text className="detail-sub">{remarks}</Text>
          </Box>
        </Box>
      </Stack>

      {/* <Box className="card-footer">
        <Text className="card-description">{description}</Text>
      </Box> */}
    </Box>
  );
}
