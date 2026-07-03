"use client";
import {
  Anchor,
  Box,
  Burger,
  Button,
  Container,
  Drawer,
  Grid,
  Group,
  Radio,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "@mantine/hooks";
import dayjs from "dayjs";
import { useForm } from "@mantine/form";
import { yupResolver } from "mantine-form-yup-resolver";
import { CelebrationCard } from "./components/CelebrationCard/CelebrationCard";
import Footer from "./components/Footer/Footer";
import { DressCode } from "./components/DressCode/DressCode";
import { RSVPFormValues, schemaRSVP } from "./schema/ISchemaRSVP";
import { CountdownTime } from "./components/CountDownTime/CountDownTime";
import RSVPCard from "./components/RSVPCard/RSVPCard";
import StorySection from "./components/StorySection/StorySection";
import { IconTie, IconWoman } from "@tabler/icons-react";

const WEDDING_DATE = dayjs("2026-12-01T14:00:00");

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = targetDate - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

function useScrollNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}
export default function WeddingInvitation() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Nav
  const scrolled = useScrollNav();
  const [opened, setOpened] = useState(false);
  // Hero
  const [scrollY, setScrollY] = useState(0);
  // CountDown
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE);
  const countdownItems = [
    { value: days, label: "Days" },
    { value: hours, label: "Hours" },
    { value: minutes, label: "Minutes" },
    { value: seconds, label: "Seconds" },
  ];
  // Story
  // Celebration
  const celebrationData = [
    {
      type: "Ceremony",
      venue: "Sto. Niño Parish",
      details: [
        "17 El Camino Real, Meycauayan, Bulacan",
        "Doors open at 1:00 PM",
        "Ceremony begins 2:00 PM",
        "For members of the entourage, please be at the church 30 minutes before the ceremony",
      ],
      description:
        "A cherished parish in the heart of Meycauayan, where faith and love come together. The perfect place to begin a lifelong promise.",
      aosDelay: 100,
    },
    {
      type: "Reception",
      venue: "Casa Miguel Events Place",
      details: [
        "Phase 1 Blk 9 Lot 16, Metrogate II Jao st, Marilao, Bulacan",
        "Cocktails from 5:30 PM",
        "Dinner & dancing from 7:00 PM",
        "Evening ends at midnight",
      ],
      description:
        "A celebration of love and happiness awaits. Come share in an evening filled with laughter, music, and unforgettable memories.",
      aosDelay: 200,
    },
  ];
  // DressCode
  const dressSwatches = [
    {
      to: "Gentlemen",
      image: <IconTie />,
      dressCode: [
        { color: "#E7D3B0", delay: 100 },
        { color: "#A8B69A", delay: 200 },
        { color: "#E7D360", delay: 300 },
      ],
    },
    {
      to: "Ladies",
      image: <IconWoman />,
      dressCode: [
        { color: "#E7D3B0", delay: 400 },
        { color: "#A8B69A", delay: 500 },
        { color: "#E7D360", delay: 600 },
      ],
    },
  ];
  // Gallery
  const galleryItems = [
    { label: "Edinburgh, 2017" },
    { label: "Kyoto, 2019" },
    { label: "Lisbon, 2021" },
    { label: "Patagonia, 2022" },
    { label: "The Proposal, 2023" },
  ];
  // RSVP
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<RSVPFormValues>({
    initialValues: {
      name: "",
      attendance: "attending",
      dietary: "",
    },
    validate: yupResolver(schemaRSVP),
  });

  const handleSubmit = form.onSubmit((values) => {
    console.log(values);

    // API call here

    setSubmitted(true);
  });
  // Footer

  useEffect(() => {
    const handleScroll = () => {
      if (isMobile) return;
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <>
      {/* Nav */}
      <nav className={scrolled ? "scrolled" : ""}>
        <Text component="a" href="#home" className="nav-logo">
          J & D
        </Text>
        {/* <Text className={"nav-logo"} >J & D</Text> */}

        <Group visibleFrom="md" className="nav-links">
          <Anchor href="#story">Our Story</Anchor>
          <Anchor href="#celebration">Details</Anchor>
          <Anchor href="#gallery">Gallery</Anchor>
          <Anchor href="#rsvp">RSVP</Anchor>
        </Group>

        <Burger
          hiddenFrom="md"
          opened={opened}
          onClick={() => setOpened((o) => !o)}
          color="var(--gold)"
        />
      </nav>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        position="right"
        classNames={{
          content: "app-drawer-content",
          body: "app-drawer-body",
        }}
        styles={{
          close: {
            backgroundColor: "transparent",
            color: "var(--gold)",
          },
        }}
      >
        <Stack gap="xl">
          <Text
            component="a"
            href="#home"
            className="nav-logo"
            onClick={() => setOpened(false)}
          >
            J & D
          </Text>

          <Anchor href="#story" onClick={() => setOpened(false)}>
            Our Story
          </Anchor>
          <Anchor href="#celebration" onClick={() => setOpened(false)}>
            Details
          </Anchor>
          <Anchor href="#gallery" onClick={() => setOpened(false)}>
            Gallery
          </Anchor>
          <Anchor href="#rsvp" onClick={() => setOpened(false)}>
            RSVP
          </Anchor>
        </Stack>
      </Drawer>

      {/* Hero */}
      <Box className="hero" id="home">
        {/* 🌌 BASE BLUE BACKGROUND */}
        <Box className="hero-bg-base" />

        {/* 🖼️ PARALLAX IMAGE LAYER */}
        <Box
          className="hero-bg-image"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
            backgroundImage:
              "url(https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=2000&q=80)",
          }}
        />

        {/* 🌫️ DOT LAYER */}
        <Box
          className="hero-dots"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        />

        {/* 📝 CONTENT */}
        <Container size="sm" className="hero-content">
          <Text className="hero-title" ta="center">
            Jasper & Daniella
          </Text>

          {/* <Text className="footer-thanks">
            Join us as we celebrate love, laughter, and the beginning of our forever.
          </Text> */}
          <Box className="gold-divider" />

          <Text className="hero-date" ta="center">
            December 1st, 2026
          </Text>

          <Text className="hero-location" ta="center">
            Join us as we celebrate love, laughter, and the beginning of our
            forever.
          </Text>
          {/* <Text className="hero-location" ta="center">
            El Camino Real · Meycauayan, Bulacan
          </Text> */}
        </Container>
      </Box>

      {/* Countdown */}
      <Box component="section" className="countdown-section">
        <Container size="lg" ta="center">
          <Box data-aos="fade-up">
            <Text className="eyebrow">Counting Every Moment</Text>

            <Title order={2} className="section-title">
              Until We Say I Do
            </Title>

            <Box className="gold-divider footer-divider" />
          </Box>

          <SimpleGrid
            cols={{ base: 2, sm: 4 }}
            spacing={1}
            className="countdown-grid"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {countdownItems.map((item) => (
              <CountdownTime key={item.label} {...item} />
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Our Story */}
      <Box component="section" className="story-section" id="story">
        <Container size="xl">
          {/* Heading */}
          <div className="section-heading" data-aos="fade-up">
            <span className="eyebrow">How It Began</span>
            <h2 className="section-title">Our Story</h2>
            <div className="gold-divider" />
          </div>

          <Grid className="story-grid">
            {/* Chapter I */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <StorySection
                chapter="Chapter I"
                title="The Coffee House Encounter"
                aosDelay={100}
              >
                <Text className="story-text">
                  It started with a shared table in a rain-soaked Edinburgh
                  café, one October afternoon when every other seat was taken.
                  Arlo had a book he wasn't reading. Jane had notes she wasn't
                  writing. Neither remembers who spoke first — only that they
                  talked until the windows went dark and the barista swept
                  around their chairs twice.
                </Text>

                <Box className="story-quote">
                  <Text>
                    "I didn't believe in coincidence before that afternoon."
                  </Text>
                </Box>
              </StorySection>
            </Grid.Col>

            {/* Image AOS zoom */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Box
                className="story-image-placeholder"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                A &amp; J
              </Box>
            </Grid.Col>

            {/* Image 2 */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Box
                className="story-image-placeholder story-image-wide"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                2021
              </Box>
            </Grid.Col>

            {/* Chapter II */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <StorySection
                chapter="Chapter II"
                title="Three Continents Later"
                aosDelay={200}
              >
                <Text className="story-text">
                  Kyoto in cherry blossom season. A rooftop in Lisbon. The
                  southern tip of Patagonia in the driving rain. In each place
                  they discovered something new — about the world and, more
                  importantly, about each other. By the time Arlo proposed on a
                  ferry crossing the Bosphorus, Jane had already known her
                  answer for two years.
                </Text>

                <Text className="story-text story-text-spaced">
                  Now, after seven years, four time zones, and one very patient
                  cat named Ottoline, they are ready to call the adventure
                  something official.
                </Text>
              </StorySection>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* The Celebration */}
      <Box component="section" className="celebration-section" id="celebration">
        <Container size="lg">
          <Stack className="section-heading" gap="xs" data-aos="fade-up">
            <Text component="span" className="eyebrow">
              1st December 2026
            </Text>

            <Title order={2} className="section-title">
              The Celebration
            </Title>

            <Box className="gold-divider" />
          </Stack>

          <Box className="celebration-grid">
            {celebrationData.map((item) => (
              <CelebrationCard key={item.type} {...item} />
            ))}
          </Box>

          <Box className="dress-swatches">
            {dressSwatches.map((swatch) => (
              <DressCode key={swatch.to} {...swatch} />
            ))}
          </Box>
        </Container>
      </Box>

      {/* Gallery */}
      <Box component="section" id="gallery" className="gallery-section">
        <Container size="lg">
          <Stack
            align="center"
            gap={0}
            className="section-heading"
            data-aos="fade-up"
          >
            <Text component="span" className="eyebrow">
              A Few Favourite Frames
            </Text>

            <Title order={2} className="section-title">
              Moments
            </Title>

            <Box className="gold-divider" />
          </Stack>

          <Box className="gallery-grid">
            {galleryItems.map(({ label }, i) => (
              <Box
                key={label}
                className="gallery-item"
                data-aos={i === 0 ? "fade-up" : "zoom-in"}
                data-aos-delay={i * 80}
              >
                <Box className="gallery-placeholder">
                  <Text className="gallery-label">{label}</Text>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* RSVP */}
      <Box component="section" id="rsvp" className="rsvp-section">
        <Container size="lg">
          <Stack
            align="center"
            gap={0}
            className="section-heading"
            data-aos="fade-up"
          >
            <Text component="span" className="eyebrow">
              Kindly Reply By November 1st
            </Text>

            <Title order={2} className="section-title">
              RSVP
            </Title>

            <Box className="gold-divider" />
          </Stack>

          <RSVPCard
            submitted={submitted}
            form={form}
            handleSubmit={handleSubmit}
          />
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </>
  );
}

//need to remove in package
// "@tabler/icons": "^3.44.0",
// "clsx": "^2.1.1",
