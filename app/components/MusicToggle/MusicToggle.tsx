"use client";

import { useEffect, useRef, useState } from "react";

interface MusicToggleProps {
  src?: string;
}

export default function MusicToggle({ src }: MusicToggleProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);

  // Try to autoplay as soon as the component mounts. Most browsers block
  // autoplay with sound and this will silently fail (caught below) — in
  // that case we fall back to starting on the guest's first tap/click,
  // which is the one thing browsers always allow.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => {
        // Autoplay was blocked — wait for the first user gesture instead.
        const tryPlay = () => {
          if (audio.paused) {
            audio
              .play()
              .then(() => setPlaying(true))
              .catch(() => {});
          }
        };
        document.addEventListener("click", tryPlay, { once: true });
        return () => document.removeEventListener("click", tryPlay);
      });
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />
      <button
        type="button"
        onClick={toggleMusic}
        className={`music-toggle${playing ? " music-toggle-playing" : ""}`}
        aria-label={playing ? "Pause music" : "Play music"}
      >
        <span className="music-toggle-disc">
          <span className="music-toggle-dot" />
        </span>
      </button>
    </>
  );
}