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
        <Flex align="center" py={40} direction={'column'} gap={15}>
          <Box className="gold-divider" />

          <Text className="sub-title-gold">
            Thank You
          </Text>

          <Text className="rsvp-message">
            We have received your response and can't wait to celebrate with you.
          </Text>

          <Box className="gold-divider" />
        </Flex>
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
                    label="I gladly accept."
                    color="yellow"
                  />

                  <Radio
                    value="declining"
                    label="I regretfully decline."
                    color="yellow"
                  />
                </Box>
              </Radio.Group>
            </Flex>

            <Box>
              <Text component="label" htmlFor="dietary" className="form-label">
                Remarks
              </Text>

              <Textarea
                id="dietary"
                variant="unstyled"
                autosize
                minRows={3}
                className="form-textarea"
                placeholder="Please note any allergies or any concerns."
                {...form.getInputProps("remarks")}
              />
            </Box>

            <Button type="submit" 
            className="rsvp-btn" 
            bg={'#03396c'}
            radius={0}>
              Send My Reply
            </Button>
          </Stack>
        </form>
      )}
    </Box>
  );
}
