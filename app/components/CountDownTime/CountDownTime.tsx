import { Box, Text } from "@mantine/core";

interface CountdownTimeProps {
    value: number;
    label: string;
}

export function CountdownTime({
    value,
    label,
}: CountdownTimeProps) {
    return (
        <Box className="countdown-item">
            <Text className="countdown-number">
                {String(value).padStart(2, "0")}
            </Text>

            <Text className="countdown-label">
                {label}
            </Text>
        </Box>
    );
}