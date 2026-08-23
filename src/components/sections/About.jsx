import { motion, useReducedMotion } from "framer-motion";
import { AtSign, Mail, Play } from "lucide-react";
import { artist, artistAbout } from "../../data/artist.js";
import { workCategories } from "../../data/artworks.js";

const EASE = [0.22, 1, 0.36, 1];

const SOCIAL_ICONS = {
  youtube: Play,
  instagram: AtSign,
  email: Mail,
};

const fadeUp = (reduce) => ({
  hidden: { opacity: 0, y: reduce ? 0 : 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: reduce ? 0 : 0.7, ease: EASE },
  },
});

const lineReveal = (reduce) => ({
  hidden: { y: "112%" },
  visible: {
    y: "0%",
    transition: { duration: reduce ? 0 : 0.85, ease: EASE },
  },
});

export default function About() {
  const reduceMotion = useReducedMotion();
  const [firstName, lastName] = artist.name.split(" ");
  const mediums = workCategories.map((cat) => cat.title).join("  /  ");

  return (
    <section
      id="about"
      aria-label={`About the artist ${artist.name}`}
      className="relative overflow-hidden bg-black px-5 py-24 text-white sm:px-8 sm:py-32 xl:px-12"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-[2vw] -top-[4vw] select-none font-serif text-[20vw] italic leading-none text-white/[0.04]"
      >
        About
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[38%] hidden border-t border-white/10 lg:block"
      />

      <div className="mx-auto w-full max-w-[110rem]">
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            className="relative z-10 order-1 lg:col-span-6"
          >
            <p className="mb-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/40">
              <span className="text-accent">( 03 )</span>
              <span aria-hidden="true" className="h-px w-10 bg-white/20" />
              About
            </p>

            <h2 className="font-serif italic tracking-tight">
              <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                <motion.span
                  variants={lineReveal(reduceMotion)}
                  className="block text-[clamp(3.4rem,11vw,7.5rem)] leading-[0.95] text-white"
                >
                  {firstName}
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.1em] pl-[9%] sm:pl-[14%]">
                <motion.span
                  variants={lineReveal(reduceMotion)}
                  className="block text-[clamp(3.4rem,11vw,7.5rem)] leading-[0.95] text-white/85 [-webkit-text-stroke:1px_rgba(255,255,255,0.5)] supports-[-webkit-text-stroke]:text-transparent"
                >
                  {lastName}
                </motion.span>
              </span>
            </h2>

            <motion.p
              variants={fadeUp(reduceMotion)}
              className="mt-8 max-w-md font-serif text-xl italic leading-snug text-white/70 sm:text-2xl"
            >
              Visual artist — Madhya Pradesh, India
            </motion.p>

            <motion.p
              variants={fadeUp(reduceMotion)}
              className="mt-6 max-w-md text-sm leading-relaxed text-white/60 sm:text-base"
            >
              {artistAbout.bio}
            </motion.p>

            <motion.dl
              variants={fadeUp(reduceMotion)}
              className="mt-10 grid max-w-md grid-cols-1 gap-y-5 border-t border-white/10 pt-8 sm:grid-cols-3 sm:gap-x-6"
            >
              {[
                ["Based in", artistAbout.location],
                ["Languages", artistAbout.languages],
                ["Currently", artistAbout.education],
              ].map(([term, value]) => (
                <div key={term}>
                  <dt className="text-[9px] uppercase tracking-[0.35em] text-white/35">
                    {term}
                  </dt>
                  <dd className="mt-2 text-sm text-white/80">{value}</dd>
                </div>
              ))}
            </motion.dl>

            <motion.div
              variants={fadeUp(reduceMotion)}
              className="mt-10 flex items-center gap-3"
            >
              {artistAbout.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.id];
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    target={social.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={
                      social.href.startsWith("mailto")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    aria-label={`${artist.name} on ${social.label}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/60 backdrop-blur-md transition-colors duration-300 hover:border-accent/60 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <Icon strokeWidth={1.5} className="h-4.5 w-4.5" />
                  </a>
                );
              })}
              <span className="ml-2 text-[9px] uppercase tracking-[0.35em] text-white/30">
                {artistAbout.socials.map((s) => s.label).join(" · ")}
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            className="order-2 lg:col-span-5 lg:col-start-8 lg:mt-32"
          >
            <figure className="relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-10 right-0 z-0 select-none font-serif text-8xl italic leading-none text-white/[0.07] lg:-top-16 lg:text-[10rem]"
              >
                03
              </span>

              <div
                style={{ aspectRatio: "3 / 2" }}
                className="relative z-10 overflow-hidden border border-white/15 bg-white/[0.02]"
              >
                <motion.img
                  src={artistAbout.portrait.src}
                  alt={artistAbout.portrait.alt}
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                  initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.12 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  transition={{ duration: reduceMotion ? 0 : 1.2, ease: EASE }}
                  className="h-full w-full select-none object-cover"
                />
              </div>

              <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-[10px] uppercase tracking-[0.3em] text-white/35">
                <span>{artist.tagline}</span>
                <span>Fig. 01 — The Artist</span>
              </figcaption>
            </figure>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -8% 0px" }}
          className="mt-20 grid grid-cols-1 gap-y-12 border-t border-white/10 pt-12 sm:mt-28 lg:grid-cols-12 lg:gap-x-10"
        >
          <div className="lg:col-span-5">
            <motion.p
              variants={fadeUp(reduceMotion)}
              className="mb-6 text-[10px] uppercase tracking-[0.4em] text-white/40"
            >
              The Journey
            </motion.p>
            <motion.div
              variants={fadeUp(reduceMotion)}
              className="flex items-start gap-6"
            >
              <span className="font-serif text-7xl italic leading-none text-accent sm:text-8xl">
                {artistAbout.experienceYears}
              </span>
              <div className="pt-2">
                <p className="font-serif text-xl italic leading-tight text-white/90 sm:text-2xl">
                  Years of self-learning
                </p>
                <ul className="mt-4 space-y-1.5">
                  {artistAbout.journeyPoints.map((point) => (
                    <li
                      key={point}
                      className="text-[10px] uppercase tracking-[0.3em] text-white/45"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-4 lg:col-start-7">
            <motion.p
              variants={fadeUp(reduceMotion)}
              className="mb-6 text-[10px] uppercase tracking-[0.4em] text-white/40"
            >
              Selected Practice
            </motion.p>
            <ul className="space-y-4">
              {artistAbout.practice.map((item) => (
                <motion.li
                  key={item}
                  variants={fadeUp(reduceMotion)}
                  className="border-b border-white/10 pb-4 font-serif text-lg italic text-white/80 sm:text-xl"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.p
            variants={fadeUp(reduceMotion)}
            className="self-end text-[10px] uppercase leading-loose tracking-[0.3em] text-white/35 lg:col-span-3 lg:col-start-10 lg:text-right"
          >
            {mediums}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
