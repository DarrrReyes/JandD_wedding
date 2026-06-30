import { RSVPFormValues } from "@/app/schema/ISchemaRSVP";
import {
  Box,
  Button,
  Flex,
  Radio,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

type RSVPCardProps = {
  submitted: boolean;
  form: UseFormReturnType<RSVPFormValues>;
  handleSubmit: () => void;
};

export default function RSVPCard({
  submitted,
  form,
  handleSubmit,
}: RSVPCardProps) {
  return (
    <Box className="rsvp-card" data-aos="fade-up" data-aos-delay="150">
      {submitted ? (
        <Stack align="center" py={40}>
          <Box className="gold-divider" />

          <Title order={3} className="rsvp-thank-you">
            Thank You
          </Title>

          <Text className="rsvp-message">
            We have received your response and can't wait to celebrate with you.
          </Text>

          <Box className="gold-divider" />
        </Stack>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(form.values);
            handleSubmit?.();
          }}
        >
          <Stack gap={28}>
            <Box>
              <Text component="label" htmlFor="name" className="form-label">
                Full Name
              </Text>

              <TextInput
                id="name"
                variant="unstyled"
                className="form-input"
                placeholder="Your name as it appears on your invitation"
                {...form.getInputProps("name")}
              />
            </Box>

            <Flex direction={'column'} gap={20} >
              <Text className="form-label">Will you be joining us?</Text>

              <Radio.Group {...form.getInputProps("attendance")}>
                <Box className="radio-group">
                  <Radio
                    value="attending"
                    label="Joyfully accepts"
                    color="yellow"
                  />

                  <Radio
                    value="declining"
                    label="Regretfully declines"
                    color="yellow"
                  />
                </Box>
              </Radio.Group>
            </Flex>

            <Box>
              <Text component="label" htmlFor="dietary" className="form-label">
                Dietary Requirements
              </Text>

              <Textarea
                id="dietary"
                variant="unstyled"
                autosize
                minRows={3}
                className="form-textarea"
                placeholder="Please note any allergies or dietary needs"
                {...form.getInputProps("dietary")}
              />
            </Box>

            <Button type="submit" className="rsvp-btn" radius={0}>
              Send My Reply
            </Button>
          </Stack>
        </form>
      )}
    </Box>
  );
}
