"use client";
import {
  Anchor,
  Box,
  Burger,
  Container,
  Drawer,
  Flex,
  Grid,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";
import dayjs, { Dayjs } from "dayjs";
import { useForm } from "@mantine/form";
import { yupResolver } from "mantine-form-yup-resolver";
import { CelebrationCard } from "./components/CelebrationCard/CelebrationCard";
import Footer from "./components/Footer/Footer";
import { DressCode } from "./components/DressCode/DressCode";
import { RSVPFormValues, schemaRSVP } from "./schema/ISchemaRSVP";
import { CountdownTime } from "./components/CountDownTime/CountDownTime";
import RSVPCard from "./components/RSVPCard/RSVPCard";
import StorySection from "./components/StorySection/StorySection";
import { createGuest } from "@/action/guest";
import { celebrationData } from "./data/celebration";
import { entourage } from "./data/entourage";
import { dressSwatches } from "./data/dresscode";
import { faqData } from "./data/faq";
import { galleryItems } from "./data/gallery";

const WEDDING_DATE = dayjs("2026-12-01T14:00:00");

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function useCountdown(targetDate: Dayjs): TimeLeft {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const tick = () => {
      const diff = targetDate.valueOf() - dayjs().valueOf();

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
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
  const storyImages = [
    {
      label: "Jasper & Daniella FOREVER",
      url: process.env.NEXT_PUBLIC_STORY_ONE,
      position: "center",
    },
    {
      label: "Jasper & Daniella HSH",
      url: process.env.NEXT_PUBLIC_STORY_TWO,
      position: "center",
    },
  ];

  // RSVP
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<RSVPFormValues>({
    initialValues: {
      name: "",
      attendance: "attending",
      remarks: "",
    },
    validate: yupResolver(schemaRSVP),
  });

  const handleSubmit = form.onSubmit(async (values) => {
    setSubmitting(true);
    const payload = {
      name: values.name,
      remarks: values.remarks,
      isAttending: values.attendance === "attending" ? true : false,
    };
    try {
      const res = await createGuest(payload);

      if (res.status === 200 || res.status === 201) {
        console.log("Created guest:", res.data);
        setSubmitted(true);
      }
    } catch (error) {
      setSubmitting(false);
      console.error("Error:", error);
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const minTime = new Promise((resolve) => setTimeout(resolve, 1800));
    const pageLoad = new Promise((resolve) => {
      if (document.readyState === "complete") {
        // @ts-ignore
        resolve();
      } else {
        window.addEventListener("load", resolve, { once: true });
      }
    });

    Promise.all([minTime, pageLoad]).then(() => setLoading(false));
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
  }, [loading]);

  return (
    <>
      <Box className={`site-loader${loading ? "" : " site-loader-hidden"}`}>
        <Box className="site-loader-inner">
          <img
            src={process.env.NEXT_PUBLIC_LOGO}
            alt="J & D"
            className="site-loader-logo"
          />
          <Box className="site-loader-ring" />
        </Box>
      </Box>
      {/* Nav */}
      <nav className={scrolled ? "scrolled" : ""}>
        <a href="#home" className="nav-logo">
          <img src={process.env.NEXT_PUBLIC_LOGO} alt="J & D" />
        </a>
        {/* <Text className={"nav-logo"} >J & D</Text> */}

        <Group visibleFrom="md" className="nav-links">
          <Anchor href="#story">Our Story</Anchor>
          <Anchor href="#celebration">Details</Anchor>
          <Anchor href="#gallery">Gallery</Anchor>
          <Anchor href="#entourage">Entourage</Anchor>
          <Anchor href="#faq">FAQ</Anchor>
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
            alignSelf: "center",
            justifySelf: "center",
          },
        }}
      >
        <Flex direction={"column"} gap={"70px"}>
          <Flex direction={"column"}>
            <a
              href="#home"
              className="nav-logo-drawer"
              onClick={() => setOpened(false)}
            >
              <img src={process.env.NEXT_PUBLIC_LOGO} alt="J & D" />
            </a>
          </Flex>
          <Stack gap={"xl"}>
            <Flex direction={"column"} gap={10}>
              <Anchor href="#story" onClick={() => setOpened(false)}>
                Our Story
              </Anchor>
              <Anchor href="#celebration" onClick={() => setOpened(false)}>
                Details
              </Anchor>
              <Anchor href="#gallery" onClick={() => setOpened(false)}>
                Gallery
              </Anchor>
              <Anchor href="#entourage" onClick={() => setOpened(false)}>
                Entourage
              </Anchor>
              <Anchor href="#faq" onClick={() => setOpened(false)}>
                FAQ
              </Anchor>
              <Anchor href="#rsvp" onClick={() => setOpened(false)}>
                RSVP
              </Anchor>
            </Flex>
          </Stack>
        </Flex>
      </Drawer>

      {/* Hero */}
      <Box className="hero" id="home">
        {/* 🌌 BASE BLUE BACKGROUND */}
        {/* <Box className="hero-bg-base" /> */}

        {/* 🖼️ PARALLAX IMAGE LAYER */}
        <Box
          className="hero-bg-image"
          style={{
            transform: `translate3d(
          0,
          ${scrollY * (isMobile ? 0.08 : 0.2)}px,
          0
        )`,
            backgroundImage: `url(${process.env.NEXT_PUBLIC_HERO_BG})`,
            // backgroundSize: "cover",
          }}
        />

        {/* 🌫️ DOT LAYER */}
        <Box
          className="hero-dots"
          style={{
            transform: `translate3d(
          0,
          ${scrollY * (isMobile ? 0.04 : 0.1)}px,
          0
        )`,
          }}
        />

        {/* 📝 CONTENT */}
        <Flex direction={"column"} gap={"10px"} className="hero-content">
          <Text className="hero-title" ta="center">
            <span>Jasper</span>
            <span>&</span>
            <span>Daniella</span>
          </Text>

          <Box className="gold-divider" />

          <Text className="hero-sub-title-date" ta="center">
            December 1st, 2026
          </Text>

          <Text className="hero-location" ta="center">
            Join us as we celebrate love, laughter, and the beginning of our
            forever.
          </Text>
        </Flex>
      </Box>

      {/* Countdown */}
      <Box component="section" className="countdown-section">
        <Container size="lg" ta="center">
          <Box data-aos="fade-up">
            <Text className="sub-title-gold">Counting Every Moment</Text>

            <Text className="section-title">Until We Say I Do</Text>

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
            <Text className="sub-title-gold">How It Began</Text>
            <Text className="section-title">Our Story</Text>
            <div className="gold-divider" />
          </div>

          <Grid className="story-grid">
            {/* Chapter I */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <StorySection
                chapter="Chapter I"
                title="The Friendship Worth Risking"
                aosDelay={100}
              >
                <Text className="story-text">
                  Jasper and Daniella met in 2016 during their senior year of
                  high school. What began as a simple friendship soon blossomed
                  into something deeper. They spent countless days hanging out,
                  sharing laughs, and simply enjoying each other's company until
                  they became the best of friends. After a year of friendship,
                  they realized there was something more between them. In 2017,
                  they took a leap of faith and turned their friendship into a
                  relationship.
                </Text>

                <Text className="story-text">
                  People often say that dating your best friend is risky because
                  it could ruin the friendship. For Jasper and Daniella, though,
                  taking that chance was the best decision they ever made. It
                  turns out that "ruining" the friendship was worth it because
                  it became the beginning of their forever.
                </Text>

                <Box className="story-quote">
                  <Text>
                    "We didn't know our friendship was the beginning of forever"
                  </Text>
                </Box>
              </StorySection>
            </Grid.Col>

            {/* Photos */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Box className="story-images">
                {storyImages.map(({ label, url, position }, i) => (
                  <Box
                    key={label}
                    className={
                      i === 0 ? "story-image-main" : "story-image-secondary"
                    }
                    data-aos="zoom-in"
                    data-aos-delay={200 + i * 200}
                  >
                    <img
                      src={url}
                      alt={label}
                      className="story-photo"
                      style={{ objectPosition: position || "center" }}
                    />
                  </Box>
                ))}
              </Box>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* The Celebration */}
      <Box component="section" className="celebration-section" id="celebration">
        <Container size="lg">
          <Stack className="section-heading" gap="xs" data-aos="fade-up">
            <Text component="span" className="sub-title-gold">
              1st December 2026
            </Text>

            <Text className="section-title">The Celebration</Text>

            <Box className="gold-divider" />
          </Stack>

          <Box className="celebration-grid">
            {celebrationData.map((item) => (
              <CelebrationCard key={item.type} {...item} />
            ))}
          </Box>

          <Flex
            direction={"column"}
            className="section-heading"
            gap="10px"
            mt={"50px"}
            data-aos="fade-up"
          >
            <Text className="section-title">Attire & Colors</Text>

            <Box className="gold-divider" />
          </Flex>

          <Box className="dress-swatches">
            {dressSwatches.map((swatch, index) => (
              <DressCode key={index} {...swatch} />
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
            <Text component="span" className="sub-title-gold">
              A Few Favourite Frames
            </Text>

            <Text className="section-title">Moments</Text>

            <Box className="gold-divider" />
          </Stack>

          <Box className="gallery-grid">
            {galleryItems.map(({ label, url, position, brightness }, i) => (
              <Box
                key={label}
                className="gallery-item"
                data-aos={i === 0 ? "fade-up" : "zoom-in"}
                data-aos-delay={i * 80}
              >
                <Box className="gallery-placeholder">
                  <img
                    src={url}
                    alt={label}
                    className="gallery-image"
                    style={{
                      objectPosition: position || "center",
                      filter: `brightness(${brightness ?? 0.97})`,
                    }}
                  />
                  {/* <Text className="gallery-label">{label}</Text> */}
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Entourage */}
      <Box component="section" className="entourage-section" id="entourage">
        <Container size="lg">
          <Stack
            align="center"
            gap={0}
            className="section-heading"
            data-aos="fade-up"
          >
            <Text component="span" className="sub-title-gold">
              With Love &amp; Gratitude
            </Text>

            <Text className="section-title">The Entourage</Text>

            <Box className="gold-divider" />
          </Stack>

          <Box
            className="entourage-single-card entourage-framed"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <img
              src={process.env.NEXT_PUBLIC_ENTOURAGE_FLOWERS}
              alt=""
              className="entourage-flower entourage-flower-top"
            />
            <img
              src={process.env.NEXT_PUBLIC_ENTOURAGE_FLOWERS}
              alt=""
              className="entourage-flower entourage-flower-bottom"
            />

            <Box className="entourage-card-body">
              {/* Groom & Bride + Nuptials */}
              <Box className="entourage-couple-names">
                <Flex gap={10} justify={"center"}>
                  <Text component="span" className="entourage-name">
                    {entourage.groom}
                  </Text>
                  <Text component="span" className="entourage-couple-amp">
                    {/* &amp; */}&
                  </Text>
                  <Text component="span" className="entourage-name">
                    {entourage.bride}
                  </Text>
                </Flex>
                <Text className="entourage-nuptials">Nuptials</Text>
              </Box>

              {/* Our Parents */}
              <Box className="entourage-block" data-aos="fade-up">
                <Text className="entourage-block-header">Our Parents</Text>
                <Box className="entourage-two-col">
                  <Box className="entourage-col-left">
                    <Text className="entourage-col-center-label">
                      Parents of the Groom
                    </Text>
                    {entourage.parentsOfGroom.map((n) => (
                      <Text
                        key={n}
                        className="entourage-name entourage-list-name"
                      >
                        {n}
                      </Text>
                    ))}
                  </Box>
                  <Box className="entourage-col-right">
                    <Text className="entourage-col-center-label">
                      Parents of the Bride
                    </Text>
                    {entourage.parentsOfBride.map((n) => (
                      <Text
                        key={n}
                        className="entourage-name entourage-list-name"
                      >
                        {n}
                      </Text>
                    ))}
                  </Box>
                </Box>
              </Box>

              <Box className="gold-divider entourage-divider" />

              {/* Principal Sponsors */}
              <Box className="entourage-block" data-aos="fade-up">
                <Text className="entourage-block-header">
                  Principal Sponsors
                </Text>
                <Box className="entourage-two-col entourage-two-col-lists">
                  <Box className="entourage-col-left">
                    {entourage.principalSponsorsMen.map((n) => (
                      <Text
                        key={n}
                        className="entourage-name entourage-list-name"
                      >
                        {n}
                      </Text>
                    ))}
                  </Box>
                  <Box className="entourage-col-right">
                    {entourage.principalSponsorsWomen.map((n) => (
                      <Text
                        key={n}
                        className="entourage-name entourage-list-name"
                      >
                        {n}
                      </Text>
                    ))}
                  </Box>
                </Box>
              </Box>

              <Box className="gold-divider entourage-divider" />

              {/* Best Man / Maid of Honor */}
              <Box className="entourage-block" data-aos="fade-up">
                <Box className="entourage-two-col">
                  <Box className="entourage-col-left">
                    <Text className="entourage-col-center-label">Best Man</Text>
                    <Text className="entourage-name">{entourage.bestMan}</Text>
                  </Box>
                  <Box className="entourage-col-right">
                    <Text className="entourage-col-center-label">
                      Maid of Honor
                    </Text>
                    <Text className="entourage-name">
                      {entourage.maidOfHonor}
                    </Text>
                  </Box>
                </Box>
              </Box>

              <Box className="gold-divider entourage-divider" />

              {/* Flower Girls */}
              <Box
                className="entourage-block entourage-center-list"
                data-aos="fade-up"
              >
                <Text className="entourage-block-header">Flower Girls</Text>
                {entourage.flowerGirls.map((n) => (
                  <Text key={n} className="entourage-name">
                    {n}
                  </Text>
                ))}
              </Box>

              <Box className="gold-divider entourage-divider" />

              {/* Coin Bearer / Bible Bearer / Ring Bearer */}
              <Box className="entourage-block" data-aos="fade-up">
                <Box className="entourage-two-col">
                  <Box className="entourage-col-left">
                    <Text className="entourage-col-center-label">
                      Coin Bearer
                    </Text>
                    <Text className="entourage-name">
                      {entourage.coinBearer}
                    </Text>
                  </Box>
                  <Box className="entourage-col-right">
                    <Text className="entourage-col-center-label">
                      Bible Bearer
                    </Text>
                    <Text className="entourage-name">
                      {entourage.bibleBearer}
                    </Text>
                  </Box>
                </Box>
                <Box className="entourage-center-list" mt={24}>
                  <Text className="entourage-col-center-label">
                    Ring Bearer
                  </Text>
                  <Text className="entourage-name">{entourage.ringBearer}</Text>
                </Box>
              </Box>

              <Box className="gold-divider entourage-divider" />

              {/* Groomsmen / Bridesmaids */}
              <Box className="entourage-block" data-aos="fade-up">
                <Box className="entourage-two-col entourage-two-col-lists">
                  <Box className="entourage-col-left">
                    <Text className="entourage-col-center-label">
                      Groomsmen
                    </Text>
                    {entourage.groomsmen.map((n) => (
                      <Text
                        key={n}
                        className="entourage-name entourage-list-name"
                      >
                        {n}
                      </Text>
                    ))}
                  </Box>
                  <Box className="entourage-col-right">
                    <Text className="entourage-col-center-label">
                      Bridesmaids
                    </Text>
                    {entourage.bridesmaids.map((n) => (
                      <Text
                        key={n}
                        className="entourage-name entourage-list-name"
                      >
                        {n}
                      </Text>
                    ))}
                  </Box>
                </Box>
              </Box>

              <Box className="gold-divider entourage-divider" />

              {/* Secondary Sponsors */}
              <Box className="entourage-block" data-aos="fade-up">
                <Text className="entourage-block-header">
                  Secondary Sponsors
                </Text>
                <Box className="entourage-two-col">
                  <Box className="entourage-col-left">
                    <Text className="entourage-col-center-label">Candle</Text>
                    {entourage.candle.map((n) => (
                      <Text
                        key={n}
                        className="entourage-name entourage-list-name"
                      >
                        {n}
                      </Text>
                    ))}
                  </Box>
                  <Box className="entourage-col-right">
                    <Text className="entourage-col-center-label">Veil</Text>
                    {entourage.veil.map((n) => (
                      <Text
                        key={n}
                        className="entourage-name entourage-list-name"
                      >
                        {n}
                      </Text>
                    ))}
                  </Box>
                </Box>
                <Box className="entourage-center-list" mt={24}>
                  <Text className="entourage-col-center-label">Cord</Text>
                  {entourage.cord.map((n) => (
                    <Text
                      key={n}
                      className="entourage-name entourage-list-name"
                    >
                      {n}
                    </Text>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* FAQ */}
      <Box component="section" id="faq" className="faq-section">
        <Container size="lg">
          <Stack
            align="center"
            gap={0}
            className="section-heading"
            data-aos="fade-up"
          >
            <Text component="span" className="sub-title-gold">
              Everything You Need To Know
            </Text>

            <Text className="section-title">FAQs</Text>

            <Box className="gold-divider" />
          </Stack>

          <Box className="faq-list">
            {faqData.map((item, i) => (
              <Box
                key={item.question}
                className="faq-item"
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                <Text className="faq-question">{item.question}</Text>
                <Text className="faq-answer">{item.answer}</Text>
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
            <Text component="span" className="sub-title-gold">
              Kindly Reply By October 31st
            </Text>

            <Text className="section-title" style={{ letterSpacing: "8px" }}>
              RSVP
            </Text>

            <Box className="gold-divider" />
          </Stack>

          <RSVPCard
            submitting={submitting}
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
