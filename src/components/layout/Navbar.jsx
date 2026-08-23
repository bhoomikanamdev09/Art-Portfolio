import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { ArrowUpRight, Asterisk } from "lucide-react";

const DEFAULT_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Works", href: "#works" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const EASE = [0.22, 1, 0.36, 1];

export default function Navbar({
  brand = "Bhumi",
  tagline = "Visual Artist",
  links = DEFAULT_LINKS,
}) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState(
    () => window.location.hash || "#home",
  );
  const burgerRef = useRef(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 32));

  useEffect(() => {
    const onHashChange = () =>
      setCurrent(window.location.hash || "#home");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [open]);

  const duration = (seconds) => (reduceMotion ? 0 : seconds);
  const handleNavigate = (href) => {
    setCurrent(href);
    setOpen(false);
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: duration(0.3),
        ease: EASE,
        when: "beforeChildren",
        staggerChildren: reduceMotion ? 0 : 0.06,
        delayChildren: reduceMotion ? 0 : 0.12,
      },
    },
    exit: { opacity: 0, transition: { duration: duration(0.22) } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: duration(0.45), ease: EASE },
    },
  };

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: duration(0.6), ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 text-white transition-[background-color,border-color] duration-500 ${
          open
            ? "border-b border-transparent bg-transparent"
            : scrolled
              ? "border-b border-white/10 bg-black/80 backdrop-blur-md"
              : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5 sm:h-20 sm:px-8 xl:px-12">
          <a
            href="#home"
            onClick={() => handleNavigate("#home")}
            aria-label={`${brand} — home`}
            className="group flex items-center gap-2.5"
          >
            <Asterisk
              strokeWidth={1.5}
              className="h-4 w-4 text-accent transition-transform duration-500 ease-out group-hover:rotate-90"
            />
            <span className="flex flex-col leading-none">
              <span className="font-serif text-xl italic tracking-wide">
                {brand}
              </span>
              <span className="mt-1 hidden text-[9px] uppercase tracking-[0.35em] text-white/40 sm:block">
                {tagline}
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-10 md:flex xl:gap-12">
            <nav aria-label="Primary">
              <ul className="flex items-center gap-8 xl:gap-10">
                {links.map((link, index) => {
                  const isActive = current === link.href;
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => handleNavigate(link.href)}
                        aria-current={isActive ? "page" : undefined}
                        className={`group relative flex items-baseline gap-1.5 py-2 text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 ${
                          isActive
                            ? "text-white"
                            : "text-white/55 hover:text-white"
                        }`}
                      >
                        <span
                          className={`text-[9px] tracking-normal transition-colors duration-300 ${
                            isActive
                              ? "text-accent"
                              : "text-white/25 group-hover:text-white/50"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {link.label}
                        <span
                          aria-hidden="true"
                          className={`absolute inset-x-0 bottom-0 h-px origin-left bg-accent transition-transform duration-300 ease-out ${
                            isActive
                              ? "scale-x-100"
                              : "scale-x-0 group-hover:scale-x-100"
                          }`}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <p className="hidden items-center gap-2.5 border-l border-white/15 pl-8 lg:flex xl:pl-10">
              <span className="relative flex h-1.5 w-1.5">
                {!reduceMotion && (
                  <motion.span
                    animate={{ scale: [1, 2.4], opacity: [0.7, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                    className="absolute inline-flex h-full w-full rounded-full bg-accent"
                  />
                )}
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                Open for commissions
              </span>
            </p>
          </div>

          <button
            ref={burgerRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 flex h-11 w-11 items-center justify-center md:hidden"
          >
            <span className="relative block h-3 w-6">
              <motion.span
                animate={
                  open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }
                }
                transition={{ duration: duration(0.3), ease: EASE }}
                className="absolute inset-x-0 top-1/2 h-px bg-current"
              />
              <motion.span
                animate={
                  open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }
                }
                transition={{ duration: duration(0.3), ease: EASE }}
                className="absolute inset-x-0 top-1/2 h-px bg-current"
              />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-hidden bg-black px-6 pb-10 pt-24 md:hidden"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-[4vw] -right-[2vw] select-none font-serif text-[28vw] italic leading-none text-white/[0.04]"
            >
              {brand}
            </span>

            <nav aria-label="Mobile">
              <motion.p
                variants={itemVariants}
                className="mb-4 text-[10px] uppercase tracking-[0.45em] text-white/30"
              >
                Index
              </motion.p>
              <ul>
                {links.map((link, index) => {
                  const isActive = current === link.href;
                  return (
                    <motion.li
                      key={link.href}
                      variants={itemVariants}
                      className="border-b border-white/10"
                    >
                      <a
                        href={link.href}
                        onClick={() => handleNavigate(link.href)}
                        aria-current={isActive ? "page" : undefined}
                        className="group flex min-h-[4rem] items-center gap-4"
                      >
                        <span
                          className={`text-[10px] tracking-[0.3em] ${
                            isActive ? "text-accent" : "text-white/25"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`font-serif text-4xl italic leading-none transition-colors duration-300 ${
                            isActive
                              ? "text-white"
                              : "text-white/80 group-hover:text-white group-active:text-accent"
                          }`}
                        >
                          {link.label}
                        </span>
                        <ArrowUpRight
                          strokeWidth={1.5}
                          className="ml-auto h-5 w-5 text-white/20 transition-colors duration-300 group-hover:text-accent"
                        />
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <motion.p
              variants={itemVariants}
              className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/30"
            >
              <span>{tagline}</span>
              <span>
                © {new Date().getFullYear()} {brand}
              </span>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
