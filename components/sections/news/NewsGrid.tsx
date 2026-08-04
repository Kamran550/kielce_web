"use client";

import { news, newsCategories, NewsItem } from "@/constants/news";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import Image from "next/image";
import { Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useMemo, useState } from "react";

const ITEMS_PER_PAGE = 6;

function formatNewsDate(date: string, locale: string, style: "long" | "short") {
  return new Date(date).toLocaleDateString(
    locale === "ru" ? "ru-RU" : locale === "tr" ? "tr-TR" : "en-US",
    style === "long"
      ? { year: "numeric", month: "long", day: "numeric" }
      : { month: "short", day: "numeric", year: "numeric" }
  );
}

export default function NewsGrid() {
  const t = useTranslations("news.grid");
  const tCategories = useTranslations("news.categories");
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredNews = useMemo(() => {
    return news.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags?.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedNews = filteredNews.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const featuredNews = news.filter((item) => item.featured).slice(0, 1);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document
      .getElementById("news-feed")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="news-feed" className="scroll-mt-24 pb-20 pt-4 md:pb-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {featuredNews.length > 0 &&
          selectedCategory === "all" &&
          currentPage === 1 &&
          searchQuery === "" && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-80px" }}
              className="mb-16"
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--news-signal)]">
                {t("featuredNews")}
              </p>
              {featuredNews.map((item) => (
                <FeaturedStory key={item.id} item={item} locale={locale} />
              ))}
            </motion.div>
          )}

        <div className="mb-8 flex flex-col gap-6 border-b border-[var(--news-ink)] pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-3xl tracking-tight text-[var(--news-ink)] md:text-4xl">
              {t("allNews")}
            </h2>
            {filteredNews.length > 0 && (
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--news-muted)]">
                {t("found")} {filteredNews.length}{" "}
                {filteredNews.length === 1 ? t("article") : t("articles")}
              </p>
            )}
          </div>

          <div className="relative w-full md:max-w-xs">
            <Search
              className="pointer-events-none absolute left-0 top-1/2 size-4 -translate-y-1/2 text-[var(--news-muted)]"
              aria-hidden
            />
            <input
              type="search"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-0 border-b border-[var(--news-ink)] bg-transparent py-2.5 pl-7 pr-2 text-sm outline-none placeholder:text-[var(--news-muted)] focus:border-[var(--news-signal)]"
            />
          </div>
        </div>

        <div className="mb-10 flex flex-wrap gap-x-5 gap-y-2">
          {newsCategories.map((category) => {
            const active = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                className={`pb-1 text-sm transition ${
                  active
                    ? "border-b-2 border-[var(--news-signal)] font-semibold text-[var(--news-ink)]"
                    : "text-[var(--news-muted)] hover:text-[var(--news-ink)]"
                }`}
              >
                {tCategories(category.id)}
              </button>
            );
          })}
        </div>

        {paginatedNews.length > 0 ? (
          <>
            <div className="border-t border-[var(--news-ink)]">
              {paginatedNews.map((item, index) => (
                <NewsRow
                  key={item.id}
                  item={item}
                  index={index}
                  locale={locale}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                previousLabel={t("previous")}
                nextLabel={t("next")}
              />
            )}
          </>
        ) : (
          <div className="py-16 text-center">
            <p className="text-[var(--news-muted)]">{t("noResults")}</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 text-sm font-semibold text-[var(--news-signal)] underline-offset-4 hover:underline"
            >
              {t("clearFilters")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturedStory({ item, locale }: { item: NewsItem; locale: string }) {
  const t = useTranslations("news.grid");
  const tCategories = useTranslations("news.categories");

  return (
    <Link
      href={`/news/${item.slug}`}
      className="group grid overflow-hidden bg-[var(--news-ink)] text-white lg:grid-cols-[1.1fr_0.9fr]"
    >
      {item.image && (
        <div className="relative min-h-[240px] lg:min-h-[360px]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--news-ink)]/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[var(--news-ink)]/40" />
        </div>
      )}
      <div className="flex flex-col justify-end px-6 py-8 md:px-10 md:py-12">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-white/55">
          <span className="text-[var(--news-signal)]">{t("featured")}</span>
          <span>{tCategories(item.category)}</span>
          <span>{formatNewsDate(item.date, locale, "long")}</span>
        </div>
        <h3 className="font-display mt-4 text-3xl leading-tight md:text-4xl lg:text-5xl">
          {item.title}
        </h3>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/65 md:text-base">
          {item.excerpt}
        </p>
        <span className="mt-8 inline-flex text-sm font-semibold tracking-wide text-white transition group-hover:text-[var(--news-signal)]">
          {t("readMore")} →
        </span>
      </div>
    </Link>
  );
}

function NewsRow({
  item,
  index,
  locale,
}: {
  item: NewsItem;
  index: number;
  locale: string;
}) {
  const t = useTranslations("news.grid");
  const tCategories = useTranslations("news.categories");
  const dateObj = new Date(item.date);
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = dateObj
    .toLocaleDateString(
      locale === "ru" ? "ru-RU" : locale === "tr" ? "tr-TR" : "en-US",
      { month: "short" }
    )
    .replace(".", "");

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.04, 0.2),
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, margin: "-40px" }}
      className="border-b border-[var(--news-ink)]/15"
    >
      <Link
        href={`/news/${item.slug}`}
        className="group grid gap-4 py-7 md:grid-cols-[5.5rem_1fr_auto] md:items-start md:gap-8 md:py-8"
      >
        <div className="flex items-baseline gap-2 md:flex-col md:gap-0">
          <span className="font-display text-3xl leading-none text-[var(--news-signal)] md:text-4xl">
            {day}
          </span>
          <span className="text-xs uppercase tracking-[0.16em] text-[var(--news-muted)] md:mt-1">
            {month}
          </span>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.14em] text-[var(--news-muted)]">
            <span>{tCategories(item.category)}</span>
            {item.readTime && (
              <span>
                {item.readTime} {t("min")}
              </span>
            )}
            {item.featured && (
              <span className="text-[var(--news-signal)]">{t("featured")}</span>
            )}
          </div>
          <h3 className="mt-2 text-xl font-medium leading-snug text-[var(--news-ink)] transition group-hover:text-[var(--news-signal)] md:text-2xl">
            {item.title}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--news-muted)] md:text-base">
            {item.excerpt}
          </p>
          <p className="mt-3 text-xs text-[var(--news-slate)]">{item.author}</p>
        </div>

        <span className="hidden text-sm font-semibold text-[var(--news-ink)] transition group-hover:text-[var(--news-signal)] md:mt-1 md:inline">
          {t("readMore")} →
        </span>
      </Link>
    </motion.article>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  previousLabel,
  nextLabel,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  previousLabel: string;
  nextLabel: string;
}) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) pages.push(i);
      pages.push("...");
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push("...");
      for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push("...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
      pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm text-[var(--news-ink)] transition disabled:cursor-not-allowed disabled:opacity-35 hover:text-[var(--news-signal)]"
      >
        ← {previousLabel}
      </button>

      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="px-2 text-[var(--news-muted)]">
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page as number)}
            className={`min-w-9 px-3 py-2 text-sm transition ${
              currentPage === page
                ? "bg-[var(--news-ink)] font-semibold text-white"
                : "text-[var(--news-slate)] hover:text-[var(--news-signal)]"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm text-[var(--news-ink)] transition disabled:cursor-not-allowed disabled:opacity-35 hover:text-[var(--news-signal)]"
      >
        {nextLabel} →
      </button>
    </div>
  );
}
