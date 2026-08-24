import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  ArrowUpRight,
  Check,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { artistAbout } from "../../data/artist.js";
import {
  isEmailConfigured,
  sendContactMessage,
} from "../../lib/email.js";

const EASE = [0.22, 1, 0.36, 1];

const ENQUIRY_TYPES = [
  "Drawing",
  "Painting",
  "Portrait",
  "Custom Artwork",
  "Commission",
  "Collaboration",
  "Other",
];

const EMPTY_FORM = {
  from_name: "",
  from_email: "",
  enquiry_type: "",
  idea: "",
};

const inputClass =
  "w-full rounded-sm border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white transition-colors duration-300 placeholder:text-white/25 focus:border-accent focus:bg-white/[0.06] focus:outline-none [color-scheme:dark] sm:text-base";

function FormField({
  id,
  label,
  error,
  className = "",
  children,
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-2 block text-[9px] uppercase tracking-[0.35em] text-white/35"
      >
        {label}
      </label>

      {children}

      {error && (
        <p
          id={`${id}-error`}
          className="mt-2 flex items-center gap-1.5 text-[11px] text-accent"
        >
          <AlertTriangle
            strokeWidth={1.5}
            className="h-3 w-3 shrink-0"
          />

          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const reduceMotion = useReducedMotion();
  const dur = (seconds) => (reduceMotion ? 0 : seconds);

  const emailHref = artistAbout.socials.find(
    (s) => s.id === "email"
  )?.href;

  const emailConfigured = isEmailConfigured();

  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [errorDetail, setErrorDetail] = useState("");

  const fieldRefs = useRef({});

  useEffect(() => {
    if (status !== "success") return undefined;

    const timer = setTimeout(() => {
      setStatus("idle");
    }, 10000);

    return () => clearTimeout(timer);
  }, [status]);

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 24,
    },

    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: dur(0.7),
        ease: EASE,
        delay: reduceMotion ? 0 : i * 0.08,
      },
    }),
  };

  const setField = (key) => (event) => {
    setValues((current) => ({
      ...current,
      [key]: event.target.value,
    }));

    if (errors[key]) {
      setErrors((current) => ({
        ...current,
        [key]: undefined,
      }));
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!values.from_name.trim()) {
      nextErrors.from_name = "Please enter your name.";
    }

    if (!/^\S+@\S+\.\S+$/.test(values.from_email.trim())) {
      nextErrors.from_email =
        "Please enter a valid email address.";
    }

    if (!values.enquiry_type) {
      nextErrors.enquiry_type =
        "Please choose what you're looking for.";
    }

    if (values.idea.trim().length < 10) {
      nextErrors.idea =
        "Tell me a little more about at least 10 characters.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (status === "sending") return;

    const nextErrors = validate();

    setErrors(nextErrors);

    const firstInvalid = [
      "from_name",
      "from_email",
      "enquiry_type",
      "idea",
    ].find((key) => nextErrors[key]);

    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }

    setErrorDetail("");
    setStatus("sending");

    try {
      await sendContactMessage(values);

      setValues(EMPTY_FORM);
      setErrors({});
      setErrorDetail("");
      setStatus("success");
    } catch (err) {
      console.error("EmailJS failed:", err);

      setErrorDetail(
        err?.text ||
          err?.message ||
          "Email could not be sent. Please try again."
      );

      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative overflow-hidden bg-black px-5 pt-24 pb-14 text-white sm:px-8 sm:pt-32 sm:pb-20 xl:px-12"
    >
      {/* Background 05 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[6vw] -right-[2vw] select-none font-serif text-[24vw] italic leading-none text-white/[0.04]"
      >
        05
      </span>

      <div className="mx-auto w-full max-w-[110rem]">

        {/* =========================
            CONTACT LABEL
        ========================== */}
        <motion.p
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="mb-2 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/40 sm:mb-3"
        >
          <span className="text-accent">( 05 )</span>

          <span
            aria-hidden="true"
            className="h-px w-10 bg-white/20"
          />

          Contact
        </motion.p>

        {/* =========================
            MAIN HEADING

            FIX:
            The old heading used
            initial y: "112%" with
            whileInView. If the
            observer did not fire,
            the heading stayed hidden
            while its layout height
            remained - causing the
            giant black gap.

            This version uses a
            normal entrance animation
            so the heading can never
            remain invisible.
        ========================== */}
        <motion.h2
          initial="hidden"
          animate="visible"
          className="m-0 p-0 font-serif italic leading-[0.9] tracking-tight"
        >
          {["Let's", "create", "together."].map(
            (line, index) => (
              <span
                key={line}
                className="-mb-[0.1em] block overflow-hidden"
              >
                <motion.span
                  initial={{
                    opacity: 0,
                    y: reduceMotion ? 0 : 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: dur(0.7),
                    ease: EASE,
                    delay: reduceMotion
                      ? 0
                      : 0.1 + index * 0.09,
                  }}
                  className={`block text-[clamp(3.2rem,11vw,8rem)] ${
                    index === 2
                      ? "pl-[8%] text-accent"
                      : index === 1
                        ? "pl-[4%] text-white/85 [-webkit-text-stroke:1px_rgba(255,255,255,0.5)] supports-[-webkit-text-stroke]:text-transparent"
                        : "text-white"
                  }`}
                >
                  {line}
                </motion.span>
              </span>
            )
          )}
        </motion.h2>

        {/* =========================
            MESSAGE AREA
        ========================== */}
        {emailConfigured ? (
          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className="mt-2 max-w-2xl sm:mt-3"
          >
            {/* MESSAGE TITLE */}
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
              <h3 className="font-serif text-2xl italic text-white sm:text-3xl">
                Write a message
              </h3>

              <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">
                Straight to Bhumika's inbox
              </p>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="relative grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2"
              >
                {/* NAME */}
              <FormField
                id="from_name"
                label="Name"
                error={errors.from_name}
              >
                <input
                  ref={(el) =>
                    (fieldRefs.current.from_name = el)
                  }
                  id="from_name"
                  name="from_name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  value={values.from_name}
                  onChange={setField("from_name")}
                  aria-invalid={Boolean(errors.from_name)}
                  aria-describedby={
                    errors.from_name
                      ? "from_name-error"
                      : undefined
                  }
                  className={`${inputClass} ${
                    errors.from_name
                      ? "border-accent"
                      : ""
                  }`}
                />
              </FormField>

              {/* EMAIL */}
              <FormField
                id="from_email"
                label="Email"
                error={errors.from_email}
              >
                <input
                  ref={(el) =>
                    (fieldRefs.current.from_email = el)
                  }
                  id="from_email"
                  name="from_email"
                  type="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  value={values.from_email}
                  onChange={setField("from_email")}
                  aria-invalid={Boolean(errors.from_email)}
                  aria-describedby={
                    errors.from_email
                      ? "from_email-error"
                      : undefined
                  }
                  className={`${inputClass} ${
                    errors.from_email
                      ? "border-accent"
                      : ""
                  }`}
                />
              </FormField>

              {/* ENQUIRY */}
              <FormField
                id="enquiry_type"
                label="What are you looking for?"
                error={errors.enquiry_type}
              >
                <div className="relative">
                  <select
                    ref={(el) =>
                      (fieldRefs.current.enquiry_type = el)
                    }
                    id="enquiry_type"
                    name="enquiry_type"
                    value={values.enquiry_type}
                    onChange={setField("enquiry_type")}
                    aria-invalid={Boolean(
                      errors.enquiry_type
                    )}
                    aria-describedby={
                      errors.enquiry_type
                        ? "enquiry_type-error"
                        : undefined
                    }
                    className={`${inputClass} appearance-none cursor-pointer pr-10 ${
                      errors.enquiry_type
                        ? "border-accent"
                        : ""
                    }`}
                  >
                    <option
                      value=""
                      disabled
                      className="bg-black text-white"
                    >
                      Select...
                    </option>

                    {ENQUIRY_TYPES.map((type) => (
                      <option
                        key={type}
                        value={type}
                        className="bg-black text-white"
                      >
                        {type}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
                  />
                </div>
              </FormField>

              {/* IDEA */}
              <FormField
                id="idea"
                label="Tell me about your idea"
                error={errors.idea}
                className="sm:col-span-full"
              >
                <textarea
                  ref={(el) =>
                    (fieldRefs.current.idea = el)
                  }
                  id="idea"
                  name="idea"
                  rows={6}
                  placeholder="Tell me what you'd like me to create..."
                  value={values.idea}
                  onChange={setField("idea")}
                  aria-invalid={Boolean(errors.idea)}
                  aria-describedby={
                    errors.idea
                      ? "idea-error"
                      : undefined
                  }
                  className={`${inputClass} resize-y ${
                    errors.idea
                      ? "border-accent"
                      : ""
                  }`}
                />
              </FormField>

              {/* BUTTON */}
              <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 sm:col-span-full">
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  aria-busy={status === "sending"}
                  whileHover={
                    status !== "sending"
                      ? {
                          y: -2,
                        }
                      : undefined
                  }
                  whileTap={
                    status !== "sending"
                      ? {
                          scale: 0.95,
                        }
                      : undefined
                  }
                  transition={{
                    duration: 0.18,
                    ease: EASE,
                  }}
                  className={`group relative inline-flex min-h-[3.25rem] items-center justify-center gap-x-3 overflow-hidden rounded-sm px-7 py-3 text-[11px] font-medium uppercase tracking-[0.3em] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-xs ${
                    status === "sending"
                      ? "cursor-wait bg-white/20 text-white/70 ring-1 ring-white/20"
                      : "cursor-pointer bg-accent text-black hover:bg-white hover:shadow-[0_0_24px_rgba(255,255,255,0.12)] active:bg-accent"
                  }`}
                >
                  {status !== "sending" && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 ease-out group-hover:translate-x-full"
                    />
                  )}

                  {status === "sending" && (
                    <Loader2
                      strokeWidth={2}
                      aria-hidden="true"
                      className="relative z-10 h-4 w-4 animate-spin"
                    />
                  )}

                  <span className="relative z-10">
                    {status === "sending"
                    ? "Sending..."
                      : status === "error"
                        ? "Try again"
                        : "Send message"}
                  </span>

                  {status !== "sending" && (
                    <ArrowUpRight
                      strokeWidth={2}
                      aria-hidden="true"
                      className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  )}
                </motion.button>

                <p className="text-[10px] uppercase tracking-[0.35em] text-white/30">
                  Nothing is stored - it goes straight through
                  
                </p>
                <h1 className="text-6xl font-bold text-red-500">
                        VERCEL TEST 99999
                    </h1>
              </div>

              {/* SUCCESS NOTIFICATION */}
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: dur(0.4), ease: EASE }}
                  role="status"
                  aria-live="polite"
                  className="relative z-20 flex items-center gap-3 rounded-sm border border-emerald-400/50 bg-emerald-400/15 px-4 py-3 sm:col-span-full"
                >
                  <Check
                    strokeWidth={2}
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-emerald-400"
                  />

                  <p className="text-sm font-medium text-emerald-300">
                    Sent successfully!
                  </p>
                </motion.div>
              )}

              {/* ERROR */}
              {status === "error" && (
                <div
                  role="alert"
                  className="border-l-2 border-accent py-1 pl-5 sm:col-span-full"
                >
                  <p className="flex flex-wrap items-center gap-2 font-serif text-xl italic text-white/90">
                    <AlertTriangle
                      strokeWidth={1.5}
                      className="h-4 w-4 shrink-0 text-accent"
                    />

                    Message could not be sent.
                  </p>

                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/55">
                    Your message is still here pending please try
                    again or{" "}
                    <a
                      href={emailHref}
                      className="text-accent underline underline-offset-4 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      contact me directly by email
                    </a>
                    .
                  </p>

                  {errorDetail && (
                    <p className="mt-2 break-words text-[11px] uppercase tracking-wide text-white/35">
                      {errorDetail}
                    </p>
                  )}
                </div>
              )}
            </form>
          </motion.div>
        ) : (
          /* =========================
             FALLBACK EMAIL AREA
          ========================== */
          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className="mt-12 max-w-2xl border-l-2 border-white/15 py-2 pl-6 sm:mt-16"
          >
            <p className="font-serif text-2xl italic text-white/85 sm:text-3xl">
              The message desk is being set up.
            </p>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/55">
              Online messaging isn't connected just yet but
              enquiries are always welcome by email.
            </p>

            <a
              href={emailHref}
              className="group mt-6 inline-flex min-h-[2.75rem] items-center gap-x-3 font-serif text-xl italic text-white transition-colors duration-300 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-2xl"
            >
              Email directly

              <ArrowUpRight
                strokeWidth={1.25}
                aria-hidden="true"
                className="h-6 w-6 text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
