import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Asterisk } from "lucide-react";
import { workCategories } from "../../data/artworks.js";
import ArtworkCard from "../ui/ArtworkCard.jsx";

const EASE = [0.22, 1, 0.36, 1];

const COVER_ASPECTS = ["4 / 3", "3 / 4", "16 / 10", "1 / 1", "3 / 2"];

const WORK_LAYOUTS = [
  { wrap: "", aspect: "4 / 3" },
  { wrap: "sm:ml-auto sm:w-[78%]", aspect: "3 / 4" },
  { wrap: "sm:w-[85%]", aspect: "16 / 10" },
];

export default function SelectedWorks() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);

  const dur = (seconds) => (reduceMotion ? 0 : seconds);
  const category = workCategories[active];

  const selectCategory = (index) => {
    setActive(index);
    tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event) => {
    const last = workCategories.length - 1;
    let next = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      next = active === last ? 0 : active + 1;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      next = active === 0 ? last : active - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next !== null) {
      event.preventDefault();
      selectCategory(next);
    }
  };

  return (
    <section
      id="works"
      className="relative overflow-hidden bg-black px-5 py-24 text-white sm:px-8 sm:py-32 xl:px-12"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-[3vw] -top-[4vw] select-none font-serif text-[22vw] italic leading-none text-white/[0.04]"
      >
        02
      </span>

      <div className="mx-auto w-full max-w-[110rem]">
        <motion.header
          initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: dur(0.7), ease: EASE }}
          className="mb-14 border-b border-white/10 pb-10 sm:mb-20 lg:mb-24"
        >
          <p className="mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/40">
            <span className="text-accent">( 02 )</span>
            <span aria-hidden="true" className="h-px w-10 bg-white/20" />
            Works
          </p>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <h2 className="font-serif text-5xl italic leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Selected
              <br />
              <span className="pl-[8%]">Works</span>
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-white/55 sm:max-w-sm">
              The practice, organised by medium — choose a chapter to enter its
              collection.
            </p>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-12">
          <div
            role="tablist"
            aria-label="Work categories"
            onKeyDown={onKeyDown}
            className="mb-10 flex gap-x-7 overflow-x-auto border-b border-white/10 pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:sticky lg:top-24 lg:col-span-4 lg:mb-0 lg:flex-col lg:gap-x-0 lg:self-start lg:overflow-visible lg:border-b-0 lg:pb-0"
          >
            {workCategories.map((cat, index) => {
              const isActive = index === active;
              return (
                <button
                  key={cat.id}
                  ref={(el) => (tabRefs.current[index] = el)}
                  type="button"
                  role="tab"
                  id={`works-tab-${cat.id}`}
                  aria-selected={isActive}
                  aria-controls={`works-panel-${cat.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(index)}
                  className="group flex shrink-0 items-baseline gap-3 py-2 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent lg:w-full lg:border-b lg:border-white/10 lg:py-6 lg:pr-4"
                >
                  <span
                    className={`text-[10px] tracking-[0.3em] transition-colors duration-300 ${
                      isActive ? "text-accent" : "text-white/25"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`whitespace-nowrap font-serif text-2xl italic leading-none transition-all duration-300 sm:text-3xl lg:text-4xl ${
                      isActive
                        ? "translate-x-1 text-white lg:translate-x-2"
                        : "text-white/35 group-hover:text-white/75"
                    }`}
                  >
                    {cat.title}
                  </span>
                  <Asterisk
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className={`h-3.5 w-3.5 self-center text-accent transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={category.id}
                role="tabpanel"
                id={`works-panel-${category.id}`}
                aria-labelledby={`works-tab-${category.id}`}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -18 }}
                transition={{ duration: dur(0.45), ease: EASE }}
              >
                <figure className="relative">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-10 right-0 z-0 select-none font-serif text-8xl italic leading-none text-white/[0.07] lg:-top-20 lg:text-[11rem]"
                  >
                    {String(active + 1).padStart(2, "0")}
                  </span>
                  <div
                    style={{ aspectRatio: COVER_ASPECTS[active % COVER_ASPECTS.length] }}
                    className="relative z-10 overflow-hidden border border-white/10 bg-white/[0.02]"
                  >
                    <img
                      src={category.coverImage}
                      alt={category.coverAlt}
                      loading="lazy"
                      decoding="async"
                      draggable="false"
                      className="h-full w-full select-none object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 flex items-baseline justify-between gap-4 text-[10px] uppercase tracking-[0.3em] text-white/35">
                    <span>{category.title} — Cover</span>
                    <span>Pl. {String(active + 1).padStart(2, "0")}</span>
                  </figcaption>
                </figure>

                <p className="mt-8 max-w-md font-serif text-xl italic leading-snug text-white/70 sm:text-2xl">
                  {category.description}
                </p>

                <div className="mt-12 grid grid-cols-1 gap-y-14 sm:gap-y-16 lg:mt-16">
                  {category.works.map((work, index) => (
                    <ArtworkCard
                      key={work.id}
                      work={work}
                      index={index}
                      layout={WORK_LAYOUTS[index % WORK_LAYOUTS.length]}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
