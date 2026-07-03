import { Anchor, Box, Container, Group, Stack, Text } from "@mantine/core";
import React from "react";

const Footer = () => {
  return (
    <Box component="footer" className="wedding-footer">
      <Container size="lg" data-aos="fade-up" data-aos-duration="1000">
        <div className="gold-divider footer-divider" />

        <Text className="footer-names">Jasper & Daniella</Text>

        <Text className="footer-date">1st December 2026</Text>

        <Group justify="center" wrap="wrap" gap="xl" className="footer-links">
          <Anchor href="#story">Our Story</Anchor>
          <Anchor href="#celebration">Details</Anchor>
          <Anchor href="#gallery">Gallery</Anchor>
          <Anchor href="#rsvp">RSVP</Anchor>
        </Group>

        <Stack gap={8} align="center">
          <Text className="footer-thanks">
            Thank you for being a part of our beginning.
          </Text>

          <Text className="footer-copyright">Made by 'title ng business' · 2026</Text>
        </Stack>
      </Container>
    </Box>

    // interface FooterLink {
    //     label: string;
    //     href: string;
    //   }

    //   interface WeddingFooterProps {
    //     couple: string;
    //     date: string;
    //     links: FooterLink[];
    //     thankYou: string;
    //     copyright: string;
    //   }

    // const weddingData = {
    //     celebration: [...],
    //     footer: {
    //       couple: "Arlo & Jane",
    //       date: "24th October 2024 · London",
    //       links: [
    //         { label: "Our Story", href: "#story" },
    //         { label: "Details", href: "#celebration" },
    //         { label: "Gallery", href: "#gallery" },
    //         { label: "RSVP", href: "#rsvp" },
    //       ],
    //       thankYou: "Thank you for being a part of our beginning.",
    //       copyright: "Made with love · 2024",
    //     },
    //   };
    //     <Box component="footer" className="wedding-footer">
    //     <Container size="lg" data-aos="fade-up" data-aos-duration="1000">
    //       <Box className="gold-divider footer-divider" />

    //       <Text className="footer-names">{couple}</Text>

    //       <Text className="footer-date">{date}</Text>

    //       <Group
    //         justify="center"
    //         wrap="wrap"
    //         gap="xl"
    //         className="footer-links"
    //       >
    //         {links.map((link) => (
    //           <Anchor key={link.href} href={link.href}>
    //             {link.label}
    //           </Anchor>
    //         ))}
    //       </Group>

    //       <Stack gap={8} align="center">
    //         <Text className="footer-thanks">{thankYou}</Text>

    //         <Text className="footer-copyright">{copyright}</Text>
    //       </Stack>
    //     </Container>
    //   </Box>
  );
};

export default Footer;
