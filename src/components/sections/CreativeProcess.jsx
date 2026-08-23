import { motion, useReducedMotion } from "framer-motion";
import { Asterisk } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

const STAGES = [
  {
    id: "observe",
    word: "Observe",
    text: "Looking closely at people, light and form — collecting the details the world gives away for free.",
  },
  {
    id: "explore",
    word: "Explore",
    text: "Testing lines, textures and materials without deciding in advance where they lead.",
  },
  {
    id: "create",
    word: "Create",
    text: "Letting an image take shape slowly, by hand, until it starts to feel honest.",
  },
  {
    id: "refine",
    word: "Refine",
    text: "Repeating and adjusting without hurry — practice is the whole method.",
  },
];

const LAYOUTS = [
  { wrap: "lg:col-span-5 lg:col-start-1", size: "text-[clamp(3rem,9vw,7rem)]" },
  {
    wrap: "lg:col-span-5 lg:col-start-8 lg:-mt-20 lg:-ml-10",
    size: "text-[clamp(2.6rem,8vw,5.75rem)]",
    outline: true,
  },
  {
    wrap: "lg:col-span-5 lg:col-start-2 lg:-mt-10",
    size: "text-[clamp(3rem,9vw,7rem)]",
  },
  {
    wrap: "lg:col-span-5 lg:col-start-7 lg:-mt-24 lg:-ml-10",
    size: "text-[clamp(2.6rem,8vw,5.75rem)]",
    outline: true,
  },
];

export default function CreativeProcess() {
  const reduceMotion = useReducedMotion();
  const dur = (seconds) => (reduceMotion ? 0 : seconds);

  return (
    <section
      id="process"
      aria-label="Creative process"
      className="relative overflow-hidden bg-black px-5 py-24 text-white sm:px-8 sm:py-32 xl:px-12"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[5vw] -right-[2vw] select-none font-serif text-[22vw] italic leading-none text-white/[0.04]"
      >
        Process
      </span>

      <div className="mx-auto w-full max-w-[110rem]">
        <motion.header
          initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: dur(0.7), ease: EASE }}
          className="mb-16 border-b border-white/10 pb-12 sm:mb-24 sm:pb-16"
        >
          <p className="mb-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/40">
            <span className="text-accent">( 04 )</span>
            <span aria-hidden="true" className="h-px w-10 bg-white/20" />
            Process
          </p>
          <h2 className="max-w-4xl font-serif text-4xl italic leading-[1.1] tracking-tight sm:text-6xl">
            Art begins with
            <br />
            <span className="pl-[6%]">noticing.</span>
          </h2>
          <p className="mt-8 flex max-w-md items-start gap-3 text-sm leading-relaxed text-white/55">
            <Asterisk strokeWidth={1.5} className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
            Nothing formal sits behind the work — it is built from attention,
            self-practice and the patience to keep going.
          </p>
        </motion.header>

        <div className="relative grid grid-cols-1 gap-y-16 sm:gap-y-20 lg:grid-cols-12 lg:gap-y-0">
          <motion.span
            aria-hidden="true"
            initial={{ scaleY: reduceMotion ? 1 : 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: dur(1.4), ease: EASE }}
            className="absolute inset-y-0 left-4 hidden w-px origin-top bg-white/10 lg:left-1/2 lg:block"
          />

          {STAGES.map((stage, index) => {
            const layout = LAYOUTS[index];
            return (
              <motion.article
                key={stage.id}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                transition={{ duration: dur(0.8), ease: EASE, delay: reduceMotion ? 0 : index * 0.08 }}
                className={`relative border-l border-white/10 pl-6 sm:pl-10 lg:border-l-0 lg:pl-0 ${layout.wrap}`}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-7 right-0 z-0 select-none font-serif text-6xl italic leading-none text-white/[0.07] sm:text-7xl lg:right-auto lg:text-8xl"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p className="relative z-10 mb-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-white/35">
                  <Asterisk
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="h-3 w-3 text-accent"
                  />
                  Step {String(index + 1).padStart(2, "0")}
                </p>

                <h3
                  className={`relative z-10 font-serif italic leading-[0.95] tracking-tight ${layout.size} ${
                    layout.outline
                      ? "text-white/85 [-webkit-text-stroke:1px_rgba(255,255,255,0.5)] supports-[-webkit-text-stroke]:text-transparent"
                      : "text-white"
                  }`}
                >
                  {stage.word}
                </h3>

                <p
                  className={`relative z-10 mt-5 max-w-xs text-sm leading-relaxed text-white/60 ${
                    layout.wrap.includes("col-start-8") || layout.wrap.includes("col-start-7")
                      ? "sm:ml-auto sm:max-w-sm lg:ml-10 lg:max-w-xs"
                      : ""
                  }`}
                >
                  {stage.text}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
