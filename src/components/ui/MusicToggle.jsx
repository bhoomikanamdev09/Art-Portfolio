import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import song1 from "../../assets/music/song1.mp3";
import song2 from "../../assets/music/song2.mp3";
import song3 from "../../assets/music/song3.mp3";
import song4 from "../../assets/music/song4.mp3";

const TRACKS = [song1, song2, song3, song4];

export default function MusicToggle() {
  const reduceMotion = useReducedMotion();
  const audioRef = useRef(null);
  const clickTimerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState(0);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    };
  }, []);

  const getAudio = () => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.loop = true;
      audio.volume = 0.55;
      audio.preload = "none";
      audioRef.current = audio;
    }
    return audioRef.current;
  };

  const play = (audio) =>
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));

  const toggle = () => {
    const audio = getAudio();
    if (!audio.src) audio.src = TRACKS[track];
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      play(audio);
    }
  };

  const nextTrack = () => {
    const audio = getAudio();
    const wasPlaying = playing;
    audio.pause();
    const next = (track + 1) % TRACKS.length;
    setTrack(next);
    audio.src = TRACKS[next];
    if (wasPlaying) play(audio);
  };

  const handleClick = () => {
    if (clickTimerRef.current) return;
    clickTimerRef.current = setTimeout(() => {
      clickTimerRef.current = null;
      toggle();
    }, 260);
  };

  const handleDoubleClick = () => {
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
      clickTimerRef.current = null;
    }
    nextTrack();
  };

  const glow =
    playing && !reduceMotion
      ? {
          boxShadow: [
            "0 0 14px rgba(255, 77, 0, 0.30)",
            "0 0 28px rgba(255, 77, 0, 0.55)",
            "0 0 14px rgba(255, 77, 0, 0.30)",
          ],
          transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
        }
      : {
          boxShadow:
            playing && reduceMotion
              ? "0 0 22px rgba(255, 77, 0, 0.45)"
              : "0 0 0px rgba(255, 77, 0, 0)",
          transition: { duration: 0.5 },
        };

  return (
    <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-2 sm:bottom-7 sm:right-7">
      <p
        aria-hidden="true"
        className="pointer-events-none select-none rounded-sm border border-white/10 bg-black/70 px-3 py-2 text-right text-[10px] uppercase leading-relaxed tracking-[0.22em] text-white/75 backdrop-blur-md"
      >
        <span className="block">Click · Play / Pause</span>
        <span className="mt-0.5 block text-white/45">2× Click · Next Track</span>
      </p>
      <motion.button
        type="button"
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        whileTap={{ scale: 0.92 }}
        animate={glow}
        aria-label={
          playing
            ? `Pause music (track ${track + 1} of ${TRACKS.length})`
            : `Play music (track ${track + 1} of ${TRACKS.length})`
        }
        title="Click: play / pause · Double-click: next track"
        className={`flex h-12 w-12 items-center justify-center rounded-full border bg-black/80 backdrop-blur-md transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
          playing
            ? "border-accent/60 text-accent"
            : "border-white/15 text-white/50 hover:border-white/40 hover:text-white"
        }`}
      >
      <span
        aria-hidden="true"
        className="flex h-3.5 items-end gap-[3px]"
      >
        {[0, 1, 2, 3].map((bar) => (
          <motion.span
            key={bar}
            className="w-[2px] bg-current"
            style={{ height: "100%", transformOrigin: "bottom" }}
            animate={
              playing && !reduceMotion
                ? { scaleY: [0.3, 1, 0.45, 0.85, 0.3] }
                : { scaleY: 0.32 }
            }
            transition={
              playing && !reduceMotion
                ? {
                    duration: 1 + bar * 0.18,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : { duration: 0.25 }
            }
          />
        ))}
      </span>
      </motion.button>
    </div>
  );
}
