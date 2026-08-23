import { motion, useReducedMotion } from "framer-motion";
import { Asterisk } from "lucide-react";
import { artist } from "../../data/artist.js";

const EASE = [0.22, 1, 0.36, 1];

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const dur = (seconds) => (reduceMotion ? 0 : seconds);
  const { name, tagline, statement, featuredWork } = artist;
  const [firstName, lastName] = name.split(" ");

  const group = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: dur(0.09),
        delayChildren: dur(0.3),
      },
    },
  };

  const rise = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: dur(0.7), ease: EASE },
    },
  };

  const lineReveal = {
    hidden: { y: "112%" },
    visible: {
      y: "0%",
      transition: { duration: dur(0.85), ease: EASE },
    },
  };

  const plateReveal = {
    hidden: { clipPath: "inset(100% 0% 0% 0%)" },
    visible: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { duration: dur(1), ease: EASE },
    },
  };

  return (
    <section
      id="home"
      className="relative flex min-h-svh flex-col overflow-hidden bg-black text-white"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[42%] hidden border-t border-white/10 lg:block"
      />

      <div className="mx-auto grid w-full max-w-[110rem] flex-1 grid-cols-1 items-center gap-y-10 px-5 pb-12 pt-24 sm:px-8 sm:pt-28 lg:grid-cols-12 lg:gap-x-8 lg:pb-16 xl:px-12">
        <motion.figure
          initial="hidden"
          animate="visible"
          variants={group}
          className="order-1 flex w-[72%] max-w-[300px] flex-col self-start md:w-[52%] md:max-w-[380px] md:self-end lg:order-2 lg:col-span-5 lg:ml-auto lg:mt-14 lg:w-full lg:max-w-md"
        >
          <motion.div
            variants={plateReveal}
            className="overflow-hidden border border-white/15 bg-white/[0.02] p-2.5 sm:p-3"
          >
            <motion.img
              src={featuredWork.src}
              alt={featuredWork.alt}
              initial={{ scale: reduceMotion ? 1 : 1.18 }}
              animate={{ scale: 1 }}
              transition={{ duration: dur(1.4), ease: EASE }}
              decoding="async"
              draggable="false"
              className="aspect-[1369/1149] w-full select-none object-cover"
            />
          </motion.div>
          <motion.figcaption
            variants={rise}
            className="mt-3 flex items-baseline justify-between gap-4 text-[10px] uppercase tracking-[0.3em] text-white/35"
          >
            <span>
              {featuredWork.plate} — {featuredWork.title}
            </span>
            <span>{featuredWork.year}</span>
          </motion.figcaption>
        </motion.figure>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={group}
          className="relative z-10 order-2 -mt-16 md:-mt-20 lg:order-1 lg:col-span-7 lg:-mr-24 lg:mt-0 xl:-mr-36"
        >
          <motion.p
            variants={rise}
            className="mb-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/40 sm:mb-7"
          >
            <Asterisk strokeWidth={1.5} className="h-3 w-3 text-accent" />
            {tagline}
            <span aria-hidden="true" className="h-px w-10 bg-white/20" />
            <span className="text-white/25">( 01 )</span>
          </motion.p>

          <h1 className="font-serif italic tracking-tight">
            <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
              <motion.span
                variants={lineReveal}
                className="block text-[clamp(3.4rem,13vw,8.5rem)] leading-[0.95]"
              >
                {firstName}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.1em] pl-[9%] sm:pl-[12%]">
              <motion.span
                variants={lineReveal}
                className="block text-[clamp(3.4rem,13vw,8.5rem)] leading-[0.95] text-white/85 [-webkit-text-stroke:1px_rgba(255,255,255,0.5)] supports-[-webkit-text-stroke]:text-transparent"
              >
                {lastName}
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={rise}
            className="mt-6 max-w-xs text-sm leading-relaxed text-white/60 sm:mt-8 sm:max-w-sm"
          >
            {statement}
          </motion.p>
        </motion.div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[110rem] items-center justify-between px-5 py-5 sm:px-8 xl:px-12">
          <a
            href="#works"
            aria-label="Scroll down to explore works"
            className="group flex items-center gap-4 py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <span
              aria-hidden="true"
              className="relative block h-10 w-px overflow-hidden bg-white/15"
            >
              {!reduceMotion && (
                <motion.span
                  animate={{ y: [-14, 46] }}
                  transition={{
                    duration: 1.9,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute left-0 top-0 block h-3.5 w-px bg-accent"
                />
              )}
            </span>
            <span className="text-[10px] uppercase tracking-[0.35em] text-white/50 transition-colors duration-300 group-hover:text-white">
              Scroll to explore
            </span>
          </a>

          <p className="hidden text-[10px] uppercase tracking-[0.35em] text-white/30 sm:block">
            Portfolio — Vol. I
          </p>
        </div>
      </div>
    </section>
  );
}
