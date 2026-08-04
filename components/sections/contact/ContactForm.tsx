"use client";

import { Link } from "@/i18n/routing";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2, t("validation.nameMin")),
    email: z.string().email(t("validation.emailInvalid")),
    phone: z.string().optional(),
    subject: z.string().min(3, t("validation.subjectMin")),
    message: z.string().min(10, t("validation.messageMin")),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: FormValues) {
    try {
      console.log("Form data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      form.reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  const fieldClass =
    "w-full border-0 border-b border-white/25 bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-[var(--contact-mint)]";

  return (
    <motion.div
      id="contact-form"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-50px" }}
      className="scroll-mt-24 bg-[var(--contact-ink)] px-6 py-10 text-white md:px-10 md:py-12"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--contact-mint)]">
        {t("eyebrow")}
      </p>
      <h2 className="font-display mt-3 text-3xl tracking-tight md:text-4xl">
        {t("title")}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-white/60 md:text-base">
        {t("subtitle")}
      </p>

      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 border border-[var(--contact-mint)]/40 bg-[var(--contact-mint)]/10 px-4 py-3 text-sm text-[var(--contact-mint)]"
        >
          {t("success")}
        </motion.div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-8 space-y-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-[0.16em] text-white/50">
                    {t("name")}
                  </FormLabel>
                  <FormControl>
                    <input
                      className={fieldClass}
                      placeholder={t("namePlaceholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-[0.16em] text-white/50">
                    {t("email")}
                  </FormLabel>
                  <FormControl>
                    <input
                      type="email"
                      className={fieldClass}
                      placeholder={t("emailPlaceholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase tracking-[0.16em] text-white/50">
                  {t("phone")}
                </FormLabel>
                <FormControl>
                  <input
                    type="tel"
                    className={fieldClass}
                    placeholder={t("phonePlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase tracking-[0.16em] text-white/50">
                  {t("subject")}
                </FormLabel>
                <FormControl>
                  <input
                    className={fieldClass}
                    placeholder={t("subjectPlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase tracking-[0.16em] text-white/50">
                  {t("message")}
                </FormLabel>
                <FormControl>
                  <textarea
                    className={`${fieldClass} min-h-[120px] resize-y`}
                    placeholder={t("messagePlaceholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="inline-flex w-full items-center justify-center bg-[var(--contact-mint)] px-6 py-3.5 text-sm font-semibold tracking-wide text-[var(--contact-ink)] transition hover:bg-white disabled:opacity-60 sm:w-auto"
          >
            {form.formState.isSubmitting ? t("sending") : t("sendMessage")}
          </button>

          <p className="text-xs text-white/40">
            {t("privacy")}{" "}
            <Link
              href="/fees#fees-faq"
              className="text-[var(--contact-mint)] underline-offset-2 hover:underline"
            >
              {t("viewFAQ")}
            </Link>
          </p>
        </form>
      </Form>
    </motion.div>
  );
}
