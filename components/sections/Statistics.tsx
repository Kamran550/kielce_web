"use client";

import { universityStats } from "@/constants/stats";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

function Counter({
  end,
  suffix,
  duration = 2,
}: {
  end: number;
  suffix: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min(
        (currentTime - startTime) / (duration * 1000),
        1
      );
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatisticsSection() {
  const t = useTranslations("statistics");

  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: "-80px" }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--home-teal)]">
              {t("eyebrow")}
            </p>
            <h2 className="font-display mt-4 text-4xl leading-[1.05] tracking-tight text-[var(--home-ink)] md:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--home-muted)]">
              {t("subtitle")}
            </p>
          </motion.div>

          <div className="border-t border-[var(--home-ink)]/15">
            {universityStats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true, margin: "-40px" }}
                className="group grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-1 border-b border-[var(--home-ink)]/15 py-7 md:grid-cols-[8rem_1fr_auto] md:py-9"
              >
                <span className="font-mono text-xs tracking-widest text-[var(--home-muted)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--home-muted)] md:order-none">
                  {t(stat.labelKey)}
                </p>
                <p className="font-display col-span-2 text-5xl tracking-tight text-[var(--home-ink)] transition-colors group-hover:text-[var(--home-teal)] md:col-span-1 md:justify-self-end md:text-6xl lg:text-7xl">
                  <Counter end={stat.value} suffix={stat.suffix} duration={2} />
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
