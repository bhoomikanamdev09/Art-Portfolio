import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];

export default function ArtworkCard({ work, index, layout }) {
  const reduceMotion = useReducedMotion();
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={{ opacity: 0, y: reduceMotion ? 0 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: reduceMotion ? 0 : 0.85, ease: EASE }}
      className={`group relative ${layout.wrap}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-9 left-0 z-0 select-none font-serif text-7xl italic leading-none text-white/[0.07] lg:-top-14 lg:text-[7rem]"
      >
        {number}
      </span>

      <figure className="relative z-10">
        <div
          style={{ aspectRatio: layout.aspect }}
          className="relative overflow-hidden border border-white/10 bg-white/[0.02] transition-colors duration-500 group-hover:border-white/25"
        >
          <img
            src={work.image}
            alt={work.alt}
            loading="lazy"
            decoding="async"
            draggable="false"
            className="h-full w-full select-none object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <span className="pointer-events-none absolute right-3 top-3 hidden h-8 w-8 translate-y-1 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex">
            <ArrowUpRight strokeWidth={1.5} className="h-4 w-4" />
          </span>
        </div>

        <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 sm:mt-5">
          <div>
            <h3 className="font-serif text-xl italic leading-none text-white/90 sm:text-2xl">
              <span className="mr-2 align-middle font-sans text-[10px] not-italic tracking-[0.3em] text-white/30 transition-colors duration-300 group-hover:text-accent">
                {number}
              </span>
              {work.title}
              <span
                aria-hidden="true"
                className="ml-3 hidden h-px w-10 origin-left scale-x-0 bg-accent align-middle transition-transform duration-300 ease-out group-hover:scale-x-100 lg:inline-block"
              />
            </h3>
            {work.artist && (
              <p className="mt-1.5 text-[9px] uppercase tracking-[0.25em] text-white/30">
                {work.artist}
              </p>
            )}
          </div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
            {[work.category, work.year].filter(Boolean).join(" · ")}
          </p>
        </figcaption>
      </figure>
    </motion.article>
  );
}
