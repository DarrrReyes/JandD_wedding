"use client";

interface LoaderProps {
  /** Page has finished loading and is ready to show. */
  ready: boolean;
  /** Loader is still visible (false = fully dismissed). */
  loading: boolean;
  /** Called when the guest taps/clicks to enter (only fires once ready). */
  onEnter: () => void;
}

export default function Loader({ ready, loading, onEnter }: LoaderProps) {
  const handleEnter = () => {
    if (ready) onEnter();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (ready && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onEnter();
    }
  };

  return (
    <div
      className={`site-loader${loading ? "" : " site-loader-hidden"}${
        ready ? " site-loader-ready" : ""
      }`}
      onClick={handleEnter}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Tap to enter the invitation"
    >
      <div className="site-loader-inner">
        <img
          src={process.env.NEXT_PUBLIC_LOGO}
          alt="J & D"
          className="site-loader-logo"
        />
        <div className="site-loader-ring" />
      </div>

      <span className="site-loader-prompt">Tap to Begin</span>
    </div>
  );
}