"use client";

import { useReducedMotion } from "motion/react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { useLocaleContext } from "@/components/i18n/locale-context";

const spring = { type: "spring", stiffness: 320, damping: 28 } as const;

export function MarketingHero() {
  const reduce = useReducedMotion();
  const { dictionary } = useLocaleContext();

  return (
    <section className="page-shell relative py-8 sm:py-10">
      <div className="page-hero relative overflow-hidden px-5 py-10 sm:px-10 sm:py-12">
        <div
          className="pointer-events-none absolute -right-12 -top-20 size-72 rounded-full bg-primary/15 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-8 bottom-0 size-56 rounded-full bg-accent/30 blur-3xl"
          aria-hidden
        />

        <div className="relative space-y-5">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduce ? { duration: 0 } : spring}
            className="eyebrow gap-2"
          >
            <Sparkles className="size-3.5 text-primary" aria-hidden />
            {dictionary.home.eyebrow}
          </motion.div>

          <div className="space-y-3">
            <motion.h1
              className="font-heading max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduce ? { duration: 0 } : { ...spring, delay: 0.05 }}
            >
              {dictionary.site.title}
            </motion.h1>
            <motion.p
              className="max-w-2xl text-base text-muted-foreground sm:text-lg"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduce ? { duration: 0 } : { ...spring, delay: 0.1 }}
            >
              {dictionary.home.heroBody}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
