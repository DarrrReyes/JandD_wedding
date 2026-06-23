'use client'
import { Anchor, Box, Burger, Container, Drawer, Grid, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from '@mantine/hooks';
import dayjs from "dayjs";

const WEDDING_DATE = dayjs("2026-12-01T14:00:00");

const GOLD = "#D4AF37";
const MIDNIGHT = "#0B1A2F";
const GOLD_LIGHT = "#E8CC6A";
const GOLD_DARK = "#B8941E";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    background: ${MIDNIGHT};
    color: #fff;
    font-family: 'Noto Serif', Georgia, serif;
    overflow-x: hidden;
  }

  [data-aos] {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  [data-aos="zoom-in"] { transform: scale(0.92); }
  [data-aos].aos-animate {
    opacity: 1 !important;
    transform: translateY(0) scale(1) !important;
  }

  .script { font-family: 'Great Vibes', cursive; }
  .serif { font-family: 'Cormorant Garamond', 'Noto Serif', serif; }

  .gold-divider {
    width: 80px; height: 1px;
    background: linear-gradient(90deg, transparent, ${GOLD}, transparent);
    margin: 0 auto;
  }
  .gold-divider-full {
    width: 100%; height: 1px;
    background: linear-gradient(90deg, transparent, ${GOLD}55, ${GOLD}, ${GOLD}55, transparent);
    margin: 0 auto;
  }

  section { padding: 100px 0; }

  .container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .eyebrow {
    font-family: 'Noto Serif', serif;
    font-size: 11px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: ${GOLD};
    margin-bottom: 16px;
    display: block;
  }

  /* Nav */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 20px 32px;
    display: flex; justify-content: space-between; align-items: center;
    background: linear-gradient(to bottom, rgba(11,26,47,0.95), transparent);
    transition: background 0.3s;
  }
  nav.scrolled { background: rgba(11,26,47,0.97); border-bottom: 1px solid ${GOLD}22; }
  .nav-logo { font-family: 'Great Vibes', cursive; font-size: 28px; color: ${GOLD}; }
  .nav-links { display: flex; gap: 32px; list-style: none; }
  .nav-links a { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #fff; text-decoration: none; opacity: 0.75; transition: opacity 0.2s, color 0.2s; }
  .nav-links a:hover { opacity: 1; color: ${GOLD}; }

  /* Hero */
  .hero {
    min-height: 100vh;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center;
    padding: 120px 24px 80px;
    position: relative;
    background: radial-gradient(ellipse at 50% 60%, #132440 0%, ${MIDNIGHT} 70%);
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='1' fill='%23D4AF3710'/%3E%3C/svg%3E");
    opacity: 0.5;
  }
  .hero-names {
    font-family: 'Great Vibes', cursive;
    font-size: clamp(72px, 14vw, 140px);
    line-height: 1;
    color: #fff;
    text-shadow: 0 0 60px ${GOLD}33;
    margin-bottom: 12px;
  }
  .hero-date {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(14px, 3vw, 20px);
    letter-spacing: 8px;
    text-transform: uppercase;
    color: ${GOLD};
    margin: 20px 0;
    font-weight: 300;
  }
  .hero-location {
    font-size: 13px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    margin-top: 8px;
  }
  .scroll-indicator {
    position: absolute; bottom: 40px; left: 50%;
    transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    opacity: 0.5;
    font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
    animation: fadeFloat 2s ease-in-out infinite;
  }
  .scroll-line {
    width: 1px; height: 40px;
    background: linear-gradient(to bottom, ${GOLD}, transparent);
  }
  @keyframes fadeFloat {
    0%, 100% { opacity: 0.5; transform: translateX(-50%) translateY(0); }
    50% { opacity: 0.8; transform: translateX(-50%) translateY(6px); }
  }

  /* Countdown */
  .countdown-section {
    background: linear-gradient(135deg, #0d2040 0%, #0b1a2f 50%, #0a1628 100%);
    padding: 80px 0;
  }
  .countdown-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    max-width: 680px;
    margin: 48px auto 0;
    border: 1px solid ${GOLD}22;
  }
  .countdown-item {
    padding: 32px 16px;
    text-align: center;
    background: rgba(11,26,47,0.6);
    border: 1px solid ${GOLD}15;
  }
  .countdown-number {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(48px, 8vw, 72px);
    font-weight: 300;
    color: ${GOLD};
    line-height: 1;
    display: block;
  }
  .countdown-label {
    font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
    color: rgba(255,255,255,0.4); margin-top: 8px;
    display: block;
  }

  /* Story */
  .story-section { background: ${MIDNIGHT}; }
  .story-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    margin-top: 64px;
    align-items: start;
  }
  .story-block { }
  .story-chapter {
    font-size: 10px; letter-spacing: 4px; text-transform: uppercase;
    color: ${GOLD}; margin-bottom: 16px;
  }
  .story-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(26px, 4vw, 38px);
    font-weight: 300;
    font-style: italic;
    line-height: 1.3;
    margin-bottom: 20px;
    color: #fff;
  }
  .story-text {
    font-size: 15px;
    line-height: 1.9;
    color: rgba(255,255,255,0.65);
    font-weight: 300;
  }
  .story-image {
    width: 100%; aspect-ratio: 3/4;
    object-fit: cover;
    border-radius: 2px;
  }
  .story-image-placeholder {
    width: 100%; aspect-ratio: 3/4;
    background: linear-gradient(135deg, #132440, #1a3560);
    border-radius: 2px;
    display: flex; align-items: center; justify-content: center;
    border: 1px solid ${GOLD}20;
    font-family: 'Great Vibes', cursive;
    font-size: 32px;
    color: ${GOLD}66;
  }
  .story-quote {
    margin-top: 40px;
    padding: 24px 32px;
    border-left: 1px solid ${GOLD};
  }
  .story-quote p {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 20px;
    line-height: 1.6;
    color: rgba(255,255,255,0.8);
  }

  /* Celebration */
  .celebration-section {
    background: linear-gradient(180deg, #0a1526 0%, #0d1f38 100%);
  }
  .celebration-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    margin-top: 64px;
  }
  .celebration-card {
    border: 1px solid ${GOLD}30;
    padding: 48px 40px;
    position: relative;
    background: rgba(255,255,255,0.02);
  }
  .celebration-card::before {
    content: '';
    position: absolute; top: 0; left: 40px; right: 40px; height: 2px;
    background: linear-gradient(90deg, transparent, ${GOLD}, transparent);
  }
  .card-type {
    font-size: 10px; letter-spacing: 4px; text-transform: uppercase;
    color: ${GOLD}; margin-bottom: 24px;
  }
  .card-venue {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(28px, 4vw, 42px);
    font-weight: 300;
    font-style: italic;
    line-height: 1.2;
    margin-bottom: 20px;
    color: #fff;
  }
  .card-detail {
    font-size: 13px; letter-spacing: 1px;
    color: rgba(255,255,255,0.55);
    margin-bottom: 8px;
    display: flex; align-items: center; gap: 10px;
  }
  .card-detail-dot { width: 4px; height: 4px; border-radius: 50%; background: ${GOLD}; flex-shrink: 0; }
  .dress-code-section { margin-top: 64px; text-align: center; }
  .dress-swatches {
    display: flex; gap: 16px; justify-content: center; margin-top: 32px; flex-wrap: wrap;
  }
  .swatch {
    display: flex; flex-direction: column; align-items: center; gap: 8px;
  }
  .swatch-color {
    width: 56px; height: 56px; border-radius: 50%;
    border: 1px solid ${GOLD}30;
  }
  .swatch-label {
    font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
    color: rgba(255,255,255,0.4);
  }

  /* Gallery */
  .gallery-section { background: ${MIDNIGHT}; }
  .gallery-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-top: 64px;
  }
  .gallery-item {
    overflow: hidden; border-radius: 2px; position: relative;
  }
  .gallery-item:nth-child(1) { grid-row: span 2; }
  .gallery-placeholder {
    width: 100%;
    background: linear-gradient(135deg, #132440, #1a3560);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Great Vibes', cursive;
    font-size: 28px;
    color: ${GOLD}55;
    border: 1px solid ${GOLD}15;
  }
  .gallery-item:nth-child(1) .gallery-placeholder { min-height: 520px; }
  .gallery-item:not(:nth-child(1)) .gallery-placeholder { min-height: 248px; }

  /* RSVP */
  .rsvp-section {
    background: linear-gradient(135deg, #0a1526, #0e2040);
  }
  .rsvp-card {
    max-width: 640px; margin: 64px auto 0;
    border: 1px solid ${GOLD}25;
    padding: 56px 48px;
    background: rgba(255,255,255,0.03);
  }
  .form-group { margin-bottom: 28px; }
  .form-label {
    display: block;
    font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
    color: ${GOLD}; margin-bottom: 12px;
  }
  .form-input {
    width: 100%;
    background: transparent;
    border: none; border-bottom: 1px solid ${GOLD}40;
    padding: 12px 0;
    color: #fff;
    font-family: 'Noto Serif', serif;
    font-size: 15px;
    outline: none;
    transition: border-color 0.3s;
  }
  .form-input:focus { border-bottom-color: ${GOLD}; }
  .form-input::placeholder { color: rgba(255,255,255,0.25); }
  .form-textarea {
    width: 100%;
    background: transparent;
    border: none; border-bottom: 1px solid ${GOLD}40;
    padding: 12px 0;
    color: #fff;
    font-family: 'Noto Serif', serif;
    font-size: 15px;
    outline: none;
    resize: none;
    transition: border-color 0.3s;
    min-height: 80px;
  }
  .form-textarea:focus { border-bottom-color: ${GOLD}; }
  .form-textarea::placeholder { color: rgba(255,255,255,0.25); }
  .radio-group { display: flex; gap: 32px; flex-wrap: wrap; }
  .radio-option { display: flex; align-items: center; gap: 10px; cursor: pointer; }
  .radio-option input { display: none; }
  .radio-custom {
    width: 18px; height: 18px; border-radius: 50%;
    border: 1px solid ${GOLD}50;
    display: flex; align-items: center; justify-content: center;
    transition: border-color 0.2s;
  }
  .radio-option input:checked + .radio-custom { border-color: ${GOLD}; }
  .radio-inner {
    width: 8px; height: 8px; border-radius: 50%; background: ${GOLD};
    opacity: 0; transition: opacity 0.2s;
  }
  .radio-option input:checked + .radio-custom .radio-inner { opacity: 1; }
  .radio-text { font-size: 14px; color: rgba(255,255,255,0.75); }
  .rsvp-btn {
    width: 100%;
    padding: 18px 32px;
    background: linear-gradient(135deg, ${GOLD_DARK}, ${GOLD}, ${GOLD_LIGHT});
    border: none; border-radius: 0;
    color: ${MIDNIGHT};
    font-family: 'Noto Serif', serif;
    font-size: 11px; letter-spacing: 4px; text-transform: uppercase;
    font-weight: 600;
    cursor: pointer;
    margin-top: 8px;
    transition: opacity 0.2s, transform 0.15s;
  }
  .rsvp-btn:hover { opacity: 0.9; transform: translateY(-1px); }
  .rsvp-btn:active { transform: translateY(0); }

  /* Footer */
  footer {
    background: #080f1c;
    padding: 64px 24px;
    text-align: center;
    border-top: 1px solid ${GOLD}15;
  }
  .footer-names {
    font-family: 'Great Vibes', cursive;
    font-size: 52px;
    color: ${GOLD};
    margin-bottom: 8px;
  }
  .footer-date {
    font-size: 11px; letter-spacing: 4px; text-transform: uppercase;
    color: rgba(255,255,255,0.3); margin-bottom: 40px;
  }
  .footer-links { display: flex; gap: 32px; justify-content: center; flex-wrap: wrap; margin-bottom: 48px; }
  .footer-links a {
    font-size: 10px; letter-spacing: 3px; text-transform: uppercase;
    color: rgba(255,255,255,0.4); text-decoration: none;
    transition: color 0.2s;
  }
  .footer-links a:hover { color: ${GOLD}; }
  .footer-thanks {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 16px;
    color: rgba(255,255,255,0.3);
  }

  /* Section heading */
  .section-heading { text-align: center; }
  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(36px, 6vw, 60px);
    font-weight: 300;
    font-style: italic;
    color: #fff;
    margin: 16px 0;
    line-height: 1.2;
  }

  /* Responsive */
  @media (max-width: 768px) {
    nav { padding: 16px 20px; }
    .nav-links { display: none; }
    section { padding: 72px 0; }
    .story-grid { grid-template-columns: 1fr; gap: 40px; }
    .celebration-grid { grid-template-columns: 1fr; }
    .gallery-grid { grid-template-columns: 1fr; }
    .gallery-item:nth-child(1) { grid-row: span 1; }
    .countdown-grid { grid-template-columns: repeat(2, 1fr); }
    .rsvp-card { padding: 40px 24px; }
    .celebration-card { padding: 36px 28px; }
  }

  @media (prefers-reduced-motion: reduce) {
    [data-aos] { opacity: 1 !important; transform: none !important; transition: none !important; }
  }
`;

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
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
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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

const SWATCHES = [
  { color: MIDNIGHT, label: 'Midnight' },
  { color: '#1A2A4A', label: 'Navy' },
  { color: '#6B6B6B', label: 'Slate' },
  { color: '#C8B99A', label: 'Champagne' },
  { color: '#F5F5F0', label: 'Ivory' },
  { color: GOLD, label: 'Gold' },
];

export default function WeddingInvitation() {
  // useAOS();
  const scrolled = useScrollNav();
  // const parallaxOffset = useParallax(0.45);
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE);

  const [formState, setFormState] = useState({
    name: '', attendance: 'attending', dietary: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };


  // ------------------ NEW
  const [opened, setOpened] = useState(false);

  const isMobile = useMediaQuery('(max-width: 768px)');
  // ✅ ONLY ONE declaration
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (isMobile) return;
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <>
      {/* <style dangerouslySetInnerHTML={{ __html: globalStyles }} /> */}

      {/* Nav */}
      <nav className={scrolled ? 'scrolled' : ''}>
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
        {/* <span className="nav-logo">A & J</span>
        <ul className="nav-links">
          <li><a href="#story">Our Story</a></li>
          <li><a href="#celebration">Details</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#rsvp">RSVP</a></li>
        </ul> */}
      </nav>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        position="right"
        size="100%"
      >
        <Stack gap="xl" >
          <Anchor href="#story">Our Story</Anchor>
          <Anchor href="#celebration">Details</Anchor>
          <Anchor href="#gallery">Gallery</Anchor>
          <Anchor href="#rsvp">RSVP</Anchor>
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
              'url(https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=2000&q=80)',
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
                It started with a shared table in a rain-soaked Edinburgh café,
                one October afternoon when every other seat was taken. Arlo had
                a book he wasn't reading. Jane had notes she wasn't writing.
                Neither remembers who spoke first — only that they talked until
                the windows went dark and the barista swept around their chairs
                twice.
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
                ferry crossing the Bosphorus, Jane had already known her answer
                for two years.
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
      <section className="celebration-section" id="celebration">
        <div className="container">
          <div className="section-heading" data-aos="fade-up">
            <span className="eyebrow">24th October 2024</span>
            <h2 className="section-title">The Celebration</h2>
            <div className="gold-divider" />
          </div>

          <div className="celebration-grid">
            <div className="celebration-card" data-aos="fade-up" data-aos-delay="100">
              <p className="card-type">Ceremony</p>
              <h3 className="card-venue">St. Dunstan-in-the-West</h3>
              <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p className="card-detail"><span className="card-detail-dot" /> Fleet Street, London EC4A 2HR</p>
                <p className="card-detail"><span className="card-detail-dot" /> Doors open at 3:00 PM</p>
                <p className="card-detail"><span className="card-detail-dot" /> Ceremony begins 4:00 PM sharp</p>
              </div>
              <div style={{ marginTop: '32px', paddingTop: '32px', borderTop: `1px solid ${GOLD}20` }}>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
                  A beloved church of literary London, where Samuel Pepys married — the perfect setting for a story of its own.
                </p>
              </div>
            </div>

            <div className="celebration-card" data-aos="fade-up" data-aos-delay="200">
              <p className="card-type">Reception</p>
              <h3 className="card-venue">The Grand Orangery</h3>
              <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p className="card-detail"><span className="card-detail-dot" /> Kensington Palace Gardens, W8</p>
                <p className="card-detail"><span className="card-detail-dot" /> Cocktails from 5:30 PM</p>
                <p className="card-detail"><span className="card-detail-dot" /> Dinner & dancing from 7:00 PM</p>
                <p className="card-detail"><span className="card-detail-dot" /> Evening ends at midnight</p>
              </div>
              <div style={{ marginTop: '32px', paddingTop: '32px', borderTop: `1px solid ${GOLD}20` }}>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
                  Carriages will be arranged for guests at midnight. Accommodation is available at The Milestone Hotel opposite the Gardens.
                </p>
              </div>
            </div>
          </div>

          {/* Dress Code */}
          <div className="dress-code-section" data-aos="fade-up" data-aos-delay="100">
            <div style={{ height: '1px', background: `linear-gradient(90deg, transparent, ${GOLD}33, transparent)`, margin: '64px 0' }} />
            <span className="eyebrow">Attire</span>
            <h3 className="section-title" style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: '8px' }}>Black Tie</h3>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', marginBottom: '40px', letterSpacing: '1px' }}>
              We invite you to dress in the spirit of the evening — refined, elegant, and celebratory.
            </p>
            <div className="dress-swatches">
              {SWATCHES.map(({ color, label }) => (
                <div className="swatch" key={label}>
                  <div className="swatch-color" style={{ background: color }} />
                  <span className="swatch-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="gallery-section" id="gallery">
        <div className="container">
          <div className="section-heading" data-aos="fade-up">
            <span className="eyebrow">A Few Favourite Frames</span>
            <h2 className="section-title">Moments</h2>
            <div className="gold-divider" />
          </div>

          <div className="gallery-grid">
            {[
              { label: 'Edinburgh, 2017', tall: true },
              { label: 'Kyoto, 2019' },
              { label: 'Lisbon, 2021' },
              { label: 'Patagonia, 2022' },
              { label: 'The Proposal, 2023' },
            ].map(({ label }, i) => (
              <div className="gallery-item" key={label} data-aos={i === 0 ? 'fade-up' : 'zoom-in'} data-aos-delay={i * 80}>
                <div className="gallery-placeholder">
                  <span style={{ textAlign: 'center', padding: '16px' }}>{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section className="rsvp-section" id="rsvp">
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
      </section>

      {/* Footer */}
      <footer>
        <div className="gold-divider" style={{ marginBottom: '48px' }} />
        <p className="footer-names">Arlo & Jane</p>
        <p className="footer-date">24th October 2024 · London</p>
        <div className="footer-links">
          <a href="#story">Our Story</a>
          <a href="#celebration">Details</a>
          <a href="#gallery">Gallery</a>
          <a href="#rsvp">RSVP</a>
        </div>
        <p className="footer-thanks">Thank you for being a part of our beginning.</p>
        <div style={{ marginTop: '48px', fontSize: '11px', color: 'rgba(255,255,255,0.15)', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Made with love · 2024
        </div>
      </footer>
    </>
  );
}