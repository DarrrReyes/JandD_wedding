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

// function useAOS() {
//   useEffect(() => {
//     const els = document.querySelectorAll('[data-aos]');
//     const obs = new IntersectionObserver(
//       (entries) => {
//         entries.forEach(e => {
//           if (e.isIntersecting) {
//             const delay = parseInt(e.target.dataset.aosDelay || 0);
//             setTimeout(() => e.target.classList.add('aos-animate'), delay);
//           }
//         });
//       },
//       { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
//     );
//     els.forEach(el => obs.observe(el));
//     return () => obs.disconnect();
//   }, []);
// }

function useScrollNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

// function useParallax(speed = 0.45) {
//   const [offset, setOffset] = useState(0);
//   useEffect(() => {
//     const onScroll = () => setOffset(window.scrollY * speed);
//     window.addEventListener('scroll', onScroll, { passive: true });
//     return () => window.removeEventListener('scroll', onScroll);
//   }, [speed]);
//   return offset;
// }

const pad = (n: number) => String(n).padStart(2, "0");

export default function WeddingInvitation() {
  const scrolled = useScrollNav();
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE);

  // ------------------ NEW
  const [opened, setOpened] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");
  // ✅ ONLY ONE declaration
  const [scrollY, setScrollY] = useState(0);

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

  const galleryItems = [
    { label: "Edinburgh, 2017" },
    { label: "Kyoto, 2019" },
    { label: "Lisbon, 2021" },
    { label: "Patagonia, 2022" },
    { label: "The Proposal, 2023" },
  ];

  // celebrationData
  const celebrationData = [
    {
      type: "Ceremony",
      venue: "St. Dunstan-in-the-East",
      details: [
        "Fleet Street, London EC4A 2HR",
        "Doors open at 3:00 PM",
        "Ceremony begins 4:00 PM sharp",
      ],
      description:
        "A beloved church of literary London, where Samuel Pepys married — the perfect setting for a story of its own.",
      aosDelay: 100,
    },
    {
      type: "Reception",
      venue: "The Grand Orangery",
      details: [
        "Kensington Palace Gardens, W8",
        "Cocktails from 5:30 PM",
        "Dinner & dancing from 7:00 PM",
        "Evening ends at midnight",
      ],
      description:
        "Carriages will be arranged for guests at midnight. Accommodation is available at The Milestone Hotel opposite the Gardens.",
      aosDelay: 200,
    },
  ];

  const dressSwatches = [
    {
      label: "Champagne",
      color: "#E7D3B0",
      delay: 100,
    },
    {
      label: "Sage",
      color: "#A8B69A",
      delay: 200,
    },
    {
      label: "Dusty Rose",
      color: "#C9A3A3",
      delay: 300,
    },
    {
      label: "Slate",
      color: "#7D8796",
      delay: 400,
    },
  ];

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
        <Text className={"nav-logo"}>A & J</Text>

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
        />
      </nav>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        position="right"
        // size="100%"
        classNames={{
          content: "app-drawer-content",
          body: "app-drawer-body",
        }}
      >
        <Stack gap="xl">
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
      <Box className="hero">
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
          <Text className="hero-eyebrow" ta="center">
            Together with their families
          </Text>

          <Title order={1} className="hero-title" ta="center">
            Arlo & Jane
          </Title>

          <Box className="hero-divider" />

          <Text className="hero-date" ta="center">
            October 24th, 2024
          </Text>

          <Text className="hero-location" ta="center">
            The Grand Orangery · Kensington, London
          </Text>
        </Container>
      </Box>
      {/* <section className="hero" id="hero">
        Parallax background layer
        <div
          className="hero-parallax-bg"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
          aria-hidden="true"
        />
        Dot texture layer — moves slightly slower
        <div
          className="hero-parallax-dots"
          style={{ transform: `translateY(${parallaxOffset * 0.6}px)` }}
          aria-hidden="true"
        />
        Content stays fixed in normal flow
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <span className="eyebrow" style={{ textAlign: 'center' }}>Together with their families</span>
          <h1 className="hero-names">Arlo & Jane</h1>
          <div className="gold-divider" style={{ margin: '24px auto' }} />
          <p className="hero-date">October 24th, 2024</p>
          <p className="hero-location">The Grand Orangery · Kensington, London</p>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section> */}

      {/* Countdown */}
      <Box component="section" className="countdown-section">
        <Container size="lg" ta="center">
          <Box data-aos="fade-up">
            <Text className="eyebrow">Counting Every Moment</Text>

            <Title order={2} className="section-title">
              Until We Say I Do
            </Title>

            <div className="gold-divider" />
            {/* <Box className="gold-divider footer-divider" /> */}
          </Box>

          <SimpleGrid
            cols={{ base: 2, sm: 4 }}
            spacing={1}
            className="countdown-grid"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {[
              { value: days, label: "Days" },
              { value: hours, label: "Hours" },
              { value: minutes, label: "Minutes" },
              { value: seconds, label: "Seconds" },
            ].map(({ value, label }) => (
              <Box key={label} className="countdown-item">
                <span className="countdown-number">{pad(value)}</span>
                <span className="countdown-label">{label}</span>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
      {/* <div className="countdown-section">
        <div className="container" style={{ textAlign: 'center' }}>
          <div data-aos="fade-up">
            <span className="eyebrow">Counting Every Moment</span>
            <h2 className="section-title">Until We Say I Do</h2>
            <div className="gold-divider" />
          </div>
          <div className="countdown-grid" data-aos="fade-up" data-aos-delay="200">
            {[
              { value: days, label: 'Days' },
              { value: hours, label: 'Hours' },
              { value: minutes, label: 'Minutes' },
              { value: seconds, label: 'Seconds' },
            ].map(({ value, label }) => (
              <div className="countdown-item" key={label}>
                <span className="countdown-number">{pad(value)}</span>
                <span className="countdown-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div> */}

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
              <Stack gap="md" data-aos="fade-up" data-aos-delay="100">
                <Text className="story-chapter">Chapter I</Text>

                <Title order={3} className="story-title">
                  The Coffee House Encounter
                </Title>

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
              </Stack>
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
              <Stack gap="md" data-aos="fade-up" data-aos-delay="200">
                <Text className="story-chapter">Chapter II</Text>

                <Title order={3} className="story-title">
                  Three Continents Later
                </Title>

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
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>
      {/* <section className="story-section" id="story">
        <div className="container">
          <div className="section-heading" data-aos="fade-up">
            <span className="eyebrow">How It Began</span>
            <h2 className="section-title">Our Story</h2>
            <div className="gold-divider" />
          </div>

          <div className="story-grid">
            <div data-aos="fade-up" data-aos-delay="100">
              <p className="story-chapter">Chapter I</p>
              <h3 className="story-title">The Coffee House Encounter</h3>
              <p className="story-text">
                It started with a shared table in a rain-soaked Edinburgh café, one October afternoon when every other seat was taken. Arlo had a book he wasn't reading. Jane had notes she wasn't writing. Neither remembers who spoke first — only that they talked until the windows went dark and the barista swept around their chairs twice.
              </p>
              <div className="story-quote">
                <p>"I didn't believe in coincidence before that afternoon."</p>
              </div>
            </div>
            <div data-aos="zoom-in" data-aos-delay="200">
              <div className="story-image-placeholder">A & J</div>
            </div>

            <div data-aos="zoom-in" data-aos-delay="100">
              <div className="story-image-placeholder" style={{ aspectRatio: '4/3' }}>2021</div>
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <p className="story-chapter">Chapter II</p>
              <h3 className="story-title">Three Continents Later</h3>
              <p className="story-text">
                Kyoto in cherry blossom season. A rooftop in Lisbon. The southern tip of Patagonia in the driving rain. In each place they discovered something new — about the world and, more importantly, about each other. By the time Arlo proposed on a ferry crossing the Bosphorus, Jane had already known her answer for two years.
              </p>
              <p className="story-text" style={{ marginTop: '20px' }}>
                Now, after seven years, four time zones, and one very patient cat named Ottoline, they are ready to call the adventure something official.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* The Celebration */}
      <Box component="section" className="celebration-section" id="celebration">
        <Container size="lg">
          <Stack className="section-heading" gap="xs" data-aos="fade-up">
            <Text component="span" className="eyebrow">
              24th October 2024
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
              <DressCode key={swatch.label} {...swatch} />
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
              Kindly Reply By September 1st
            </Text>

            <Title order={2} className="section-title">
              RSVP
            </Title>

            <Box className="gold-divider" />
          </Stack>

          <Box className="rsvp-card" data-aos="fade-up" data-aos-delay="150">
            {submitted ? (
              <Stack align="center" py={40}>
                <Box className="gold-divider" />

                <Title order={3} className="rsvp-thank-you">
                  Thank You
                </Title>

                <Text className="rsvp-message">
                  We have received your response and can't wait to celebrate
                  with you.
                </Text>

                <Box className="gold-divider" />
              </Stack>
            ) : (
              <form onSubmit={handleSubmit}>
                <Stack gap={28}>
                  <Box>
                    <Text
                      component="label"
                      htmlFor="name"
                      className="form-label"
                    >
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

                  <Box>
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
                  </Box>

                  <Box>
                    <Text
                      component="label"
                      htmlFor="dietary"
                      className="form-label"
                    >
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
        </Container>
      </Box>
      {/* <section className="rsvp-section" id="rsvp">
        <div className="container">
          <div className="section-heading" data-aos="fade-up">
            <span className="eyebrow">Kindly Reply By September 1st</span>
            <h2 className="section-title">RSVP</h2>
            <div className="gold-divider" />
          </div>

          <div className="rsvp-card" data-aos="fade-up" data-aos-delay="150">
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div className="gold-divider" style={{ marginBottom: '32px' }} />
                <h3 className="section-title" style={{ fontSize: '40px', marginBottom: '16px' }}>Thank You</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', lineHeight: 1.8 }}>
                  We have received your response and can't wait to celebrate with you.
                </p>
                <div className="gold-divider" style={{ marginTop: '32px' }} />
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    className="form-input"
                    type="text"
                    placeholder="Your name as it appears on your invitation"
                    value={formState.name}
                    onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Will you be joining us?</label>
                  <div className="radio-group">
                    {[
                      { value: 'attending', label: 'Joyfully accepts' },
                      { value: 'declining', label: 'Regretfully declines' },
                    ].map(({ value, label }) => (
                      <label className="radio-option" key={value}>
                        <input
                          type="radio"
                          name="attendance"
                          value={value}
                          checked={formState.attendance === value}
                          onChange={() => setFormState(s => ({ ...s, attendance: value }))}
                        />
                        <span className="radio-custom">
                          <span className="radio-inner" />
                        </span>
                        <span className="radio-text">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="dietary">Dietary Requirements</label>
                  <textarea
                    id="dietary"
                    className="form-textarea"
                    placeholder="Please note any allergies or dietary needs"
                    value={formState.dietary}
                    onChange={e => setFormState(s => ({ ...s, dietary: e.target.value }))}
                  />
                </div>

                <button type="submit" className="rsvp-btn">
                  Send My Reply
                </button>
              </form>
            )}
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <Footer />
    </>
  );
}



//REVIEW 

// CountdownItem.tsx

// countdownData.ts

// export const countdownData = [
//   { key: "days", label: "Days" },
//   { key: "hours", label: "Hours" },
//   { key: "minutes", label: "Minutes" },
//   { key: "seconds", label: "Seconds" },
// ] as const;

// export type CountdownKey = (typeof countdownData)[number]["key"];
// --------

// import { Box, Text } from "@mantine/core";

// interface CountdownItemProps {
//   value: number;
//   label: string;
// }

// export function CountdownItem({
//   value,
//   label,
// }: CountdownItemProps) {
//   return (
//     <Box className="countdown-item">
//       <Text component="span" className="countdown-number">
//         {String(value).padStart(2, "0")}
//       </Text>

//       <Text component="span" className="countdown-label">
//         {label}
//       </Text>
//     </Box>
//   );
// }


// ------


// const countdownItems = [
//   { value: days, label: "Days" },
//   { value: hours, label: "Hours" },
//   { value: minutes, label: "Minutes" },
//   { value: seconds, label: "Seconds" },
// ];

// <SimpleGrid
//   cols={{ base: 2, sm: 4 }}
//   spacing={1}
//   className="countdown-grid"
//   data-aos="fade-up"
//   data-aos-delay="200"
// >
//   {countdownItems.map((item) => (
//     <CountdownItem
//       key={item.label}
//       {...item}
//     />
//   ))}
// </SimpleGrid>;