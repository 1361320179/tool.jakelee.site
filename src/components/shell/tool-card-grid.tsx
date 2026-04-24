"use client";

import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { motion } from "motion/react";
import { getToolRegistry } from "@/lib/tools/registry";
import { useLocaleContext } from "@/components/i18n/locale-context";
import { getLocalizedPath } from "@/i18n/config";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: (reduce: boolean) => ({
    opacity: 1,
    transition: {
      staggerChildren: reduce ? 0 : 0.08,
      delayChildren: reduce ? 0 : 0.12,
    },
  }),
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: (reduce: boolean) => ({
    opacity: 1,
    y: 0,
    transition: reduce
      ? { duration: 0 }
      : { type: "spring" as const, stiffness: 380, damping: 28 },
  }),
};

export function ToolCardGrid() {
  const reduce = useReducedMotion();
  const { locale, dictionary } = useLocaleContext();
  const tools = getToolRegistry(dictionary);

  return (
    <section className="page-shell pb-16" aria-label={dictionary.home.allTools}>
      <h2 className="section-heading mb-6">{dictionary.home.allTools}</h2>
      <motion.ul
        className="grid gap-4 sm:grid-cols-2"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        custom={!!reduce}
        variants={container}
      >
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <motion.li key={tool.slug} custom={!!reduce} variants={item}>
              <Link
                href={getLocalizedPath(locale, `/tools/${tool.slug}`)}
                className={cn(
                  "surface-panel group block h-full p-5 sm:p-6",
                  "hover:border-primary/35 hover:shadow-lg",
                )}
              >
                <div className="flex items-start gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-border/60 bg-primary/10 text-primary">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <div className="min-w-0 space-y-1">
                    <h3 className="font-heading text-base font-semibold text-foreground group-hover:text-primary sm:text-lg">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                    <p className="pt-1 text-xs text-muted-foreground/90">
                      {tool.tags.map((t) => `#${t}`).join(" ")}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}
