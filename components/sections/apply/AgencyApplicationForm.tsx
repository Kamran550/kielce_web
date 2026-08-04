"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

interface AgencyApplicationFormProps {
  facultyId: number;
  facultyName: string;
  degreeId: number;
  degreeName: string;
  teachingLanguage: "EN" | "TR";
  onSubmitSuccess?: () => void;
}

export default function AgencyApplicationForm({
  facultyId,
  facultyName,
  degreeId,
  degreeName,
  teachingLanguage,
  onSubmitSuccess,
}: AgencyApplicationFormProps) {
  const t = useTranslations("apply.agencyForm");
  const tCommon = useTranslations("apply.common");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formSchema = z.object({
    agencyName: z.string().min(1, t("required")),
    country: z.string().min(1, t("required")),
    city: z.string().min(1, t("required")),
    address: z.string().min(1, t("required")),
    website: z.string().optional(),
    contactName: z.string().min(1, t("required")),
    contactPhone: z.string().min(1, t("required")),
    contactEmail: z.string().email(t("invalidEmail")),
    businessLicense: z.any().optional(),
    companyLogo: z.any().optional(),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agencyName: "",
      country: "",
      city: "",
      address: "",
      website: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
    },
  });

  async function onSubmit(data: FormValues) {
    try {
      const formData = new FormData();

      // Add form data with snake_case to match backend
      formData.append("degree_id", degreeId.toString());
      formData.append("faculty_id", facultyId.toString());
      formData.append("agency_name", data.agencyName);
      formData.append("country", data.country);
      formData.append("city", data.city);
      formData.append("address", data.address);
      if (data.website) formData.append("website", data.website);
      formData.append("contact_name", data.contactName);
      formData.append("contact_phone", data.contactPhone);
      formData.append("contact_email", data.contactEmail);

      // Add files
      if (data.businessLicense?.[0])
        formData.append("business_license", data.businessLicense[0]);
      if (data.companyLogo?.[0])
        formData.append("company_logo", data.companyLogo[0]);

      // Add locale (get from browser or Next.js)
      const locale = document.documentElement.lang || "en";
      formData.append("locale", locale);
      // Add teaching language
      formData.append("teachingLanguage", teachingLanguage);

      // Send directly to backend
      const backendUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";
      const response = await fetch(`${backendUrl}/applications/agency`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Error response:", errorData);
        throw new Error(errorData.message || t("submitError"));
      }

      const result = await response.json();
      console.log("✅ Application submitted successfully:", result);

      setIsSubmitted(true);

      // Clear form and state after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        form.reset();
        onSubmitSuccess?.();
      }, 3000);
    } catch (error) {
      console.error("❌ Error submitting application:", error);
      alert(
        tCommon("submitFailed", {
          message:
            error instanceof Error ? error.message : tCommon("unknownError"),
        })
      );
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="apply-panel p-6 md:p-8"
    >
      <header className="border-b border-[var(--apply-line)] pb-6">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-[var(--apply-ink)] md:text-3xl">
          {t("title")}
        </h2>
        <p className="mt-2 text-sm text-[var(--apply-muted)]">
          {t("programChoice")}:{" "}
          <span className="font-semibold text-[var(--apply-ink)]">
            {facultyName}
          </span>
        </p>
      </header>

      <div className="mt-8">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="apply-success px-6 py-10 text-center"
            >
              <CheckCircle className="mx-auto mb-3 size-10 text-[var(--apply-forest)]" />
              <h3 className="font-display text-xl font-semibold text-[var(--apply-forest)]">
                {t("submitSuccess")}
              </h3>
            </motion.div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-10"
              >
                {/* Agency Information */}
                <div>
                  <h3 className="apply-section-title mb-5">
                    {t("agencyInfo")}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="agencyName"
                      render={({ field }) => (
                        <FormItem className="sm:col-span-2">
                          <FormLabel>{t("agencyName")} *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("country")} *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("city")} *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="sm:col-span-2">
                          <FormLabel>{t("address")} *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem className="sm:col-span-2">
                          <FormLabel>{t("website")}</FormLabel>
                          <FormControl>
                            <Input
                              type="url"
                              placeholder={tCommon("websitePlaceholder")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Contact Person */}
                <div>
                  <h3 className="apply-section-title mb-5">
                    {t("contactPerson")}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem className="sm:col-span-2">
                          <FormLabel>{t("contactName")} *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("contactPhone")} *</FormLabel>
                          <FormControl>
                            <Input type="tel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("contactEmail")} *</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Agency Identification */}
                <div>
                  <h3 className="apply-section-title mb-5">
                    {t("agencyIdentification")}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="businessLicense"
                      render={({
                        field: { value, onChange, ...fieldProps },
                      }) => (
                        <FormItem>
                          <FormLabel>{t("businessLicense")}</FormLabel>
                          <FormControl>
                            <Input
                              {...fieldProps}
                              type="file"
                              accept="image/*,.pdf"
                              onChange={(e) => onChange(e.target.files)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="companyLogo"
                      render={({
                        field: { value, onChange, ...fieldProps },
                      }) => (
                        <FormItem>
                          <FormLabel>{t("companyLogo")}</FormLabel>
                          <FormControl>
                            <Input
                              {...fieldProps}
                              type="file"
                              accept="image/*"
                              onChange={(e) => onChange(e.target.files)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="apply-submit w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? t("submitting") : t("submit")}
                </Button>
              </form>
            </Form>
          )}
      </div>
    </motion.div>
  );
}
