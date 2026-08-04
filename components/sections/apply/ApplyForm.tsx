"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Degree } from "@/lib/types/degree";
import { Faculty } from "@/lib/types/faculty";
import { cn } from "@/lib/utils";
import ApplicantTypeSelector from "./ApplicantTypeSelector";
import DegreeSelector from "./DegreeSelector";
import FacultySelector, { TeachingLanguage } from "./FacultySelector";
import StudentApplicationForm from "./StudentApplicationForm";
import AgencyApplicationForm from "./AgencyApplicationForm";
import TransferApplicationForm from "./TransferApplicationForm";

type ApplicantType = "student" | "agency" | "transfer";
type Step = "type" | "degree" | "faculty" | "form";

const STORAGE_KEY = "apply_form_state";
const SESSION_TIMEOUT = 30 * 60 * 1000;

const STEPS: Step[] = ["type", "degree", "faculty", "form"];

export default function ApplyForm() {
  const t = useTranslations("apply");
  const [currentStep, setCurrentStep] = useState<Step>("type");
  const [applicantType, setApplicantType] = useState<ApplicantType | null>(
    null
  );
  const [selectedDegree, setSelectedDegree] = useState<Degree | null>(null);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [selectedLanguage, setSelectedLanguage] =
    useState<TeachingLanguage | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const {
          currentStep: savedStep,
          applicantType: savedType,
          selectedDegree: savedDegree,
          selectedFaculty: savedFaculty,
          selectedLanguage: savedLanguage,
          timestamp,
        } = JSON.parse(saved);

        const isExpired = timestamp && Date.now() - timestamp > SESSION_TIMEOUT;

        if (!isExpired) {
          if (savedStep) setCurrentStep(savedStep);
          if (savedType) setApplicantType(savedType);
          if (savedDegree) setSelectedDegree(savedDegree);
          if (savedFaculty) setSelectedFaculty(savedFaculty);
          if (savedLanguage) setSelectedLanguage(savedLanguage);
        } else {
          sessionStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error("Error loading apply form state:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            currentStep,
            applicantType,
            selectedDegree,
            selectedFaculty,
            selectedLanguage,
            timestamp: Date.now(),
          })
        );
      } catch (error) {
        console.error("Error saving apply form state:", error);
      }
    }
  }, [
    currentStep,
    applicantType,
    selectedDegree,
    selectedFaculty,
    selectedLanguage,
    isLoaded,
  ]);

  const handleApplicantTypeSelect = (type: ApplicantType) => {
    setApplicantType(type);
  };

  const handleDegreeSelect = (degree: Degree) => {
    setSelectedDegree(degree);
    setSelectedFaculty(null);
  };

  const handleFacultySelect = (faculty: Faculty) => {
    setSelectedFaculty(faculty);
    setSelectedLanguage(null);
  };

  const handleLanguageSelect = (language: TeachingLanguage) => {
    setSelectedLanguage(language);
  };

  const handleNext = () => {
    if (currentStep === "type" && applicantType) {
      setCurrentStep("degree");
    } else if (currentStep === "degree" && selectedDegree) {
      setCurrentStep("faculty");
    } else if (currentStep === "faculty" && selectedFaculty) {
      setCurrentStep("form");
    }
  };

  const handleBack = () => {
    if (currentStep === "degree") {
      setCurrentStep("type");
    } else if (currentStep === "faculty") {
      setCurrentStep("degree");
    } else if (currentStep === "form") {
      setCurrentStep("faculty");
    }
  };

  const canProceed = () => {
    if (currentStep === "type") return applicantType !== null;
    if (currentStep === "degree") return selectedDegree !== null;
    if (currentStep === "faculty")
      return selectedFaculty !== null && selectedLanguage !== null;
    return false;
  };

  const getStepIndex = (step: Step): number => STEPS.indexOf(step);

  const isStepCompleted = (step: Step): boolean => {
    if (step === "type") return applicantType !== null;
    if (step === "degree") return selectedDegree !== null;
    if (step === "faculty")
      return selectedFaculty !== null && selectedLanguage !== null;
    if (step === "form") return false;
    return false;
  };

  const isStepAccessible = (step: Step): boolean => {
    const stepIndex = getStepIndex(step);
    const currentIndex = getStepIndex(currentStep);

    if (stepIndex < currentIndex) return true;
    if (stepIndex === currentIndex) return true;
    if (stepIndex === currentIndex + 1) return isStepCompleted(currentStep);
    return false;
  };

  const handleStepClick = (step: Step) => {
    if (isStepAccessible(step)) {
      setCurrentStep(step);
    }
  };

  const clearState = () => {
    setCurrentStep("type");
    setApplicantType(null);
    setSelectedDegree(null);
    setSelectedFaculty(null);
    setSelectedLanguage(null);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
      <aside className="apply-panel h-fit p-5 lg:sticky lg:top-36">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--apply-muted)]">
          {t("navigation.process")}
        </p>
        <ol className="mt-5 space-y-1">
          {STEPS.map((step, index) => {
            const active = currentStep === step;
            const done = getStepIndex(currentStep) > index;
            const accessible = isStepAccessible(step);

            return (
              <li key={step}>
                <button
                  type="button"
                  onClick={() => handleStepClick(step)}
                  disabled={!accessible}
                  className={cn(
                    "flex w-full items-center gap-3 px-3 py-3 text-left transition",
                    active && "bg-[var(--apply-forest)] text-white",
                    !active &&
                      done &&
                      "text-[var(--apply-forest)] hover:bg-[var(--apply-forest)]/8",
                    !active &&
                      !done &&
                      accessible &&
                      "text-[var(--apply-ink)] hover:bg-black/5",
                    !accessible && "cursor-not-allowed text-[var(--apply-muted)]/50"
                  )}
                >
                  <span
                    className={cn(
                      "font-display text-sm tabular-nums",
                      active ? "text-[var(--apply-marigold)]" : "opacity-70"
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium tracking-wide">
                    {t(`steps.${step}`)}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {(selectedDegree || selectedFaculty || selectedLanguage) && (
          <div className="mt-6 space-y-2 border-t border-[var(--apply-line)] pt-5 text-xs text-[var(--apply-muted)]">
            {applicantType && (
              <p>
                <span className="uppercase tracking-wider opacity-70">
                  {t("steps.type")}
                </span>
                <br />
                <span className="text-sm text-[var(--apply-ink)]">
                  {t(`applicantType.${applicantType}`)}
                </span>
              </p>
            )}
            {selectedDegree && (
              <p>
                <span className="uppercase tracking-wider opacity-70">
                  {t("steps.degree")}
                </span>
                <br />
                <span className="text-sm text-[var(--apply-ink)]">
                  {selectedDegree.name}
                </span>
              </p>
            )}
            {selectedFaculty && (
              <p>
                <span className="uppercase tracking-wider opacity-70">
                  {t("steps.faculty")}
                </span>
                <br />
                <span className="text-sm text-[var(--apply-ink)]">
                  {selectedFaculty.name}
                  {selectedLanguage ? ` · ${selectedLanguage}` : ""}
                </span>
              </p>
            )}
          </div>
        )}
      </aside>

      <div>
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep === "type" && (
            <ApplicantTypeSelector
              selectedType={applicantType}
              onSelect={handleApplicantTypeSelect}
            />
          )}

          {currentStep === "degree" && (
            <DegreeSelector
              onSelect={handleDegreeSelect}
              selectedDegreeId={selectedDegree?.id}
            />
          )}

          {currentStep === "faculty" && selectedDegree && (
            <FacultySelector
              faculties={selectedDegree.faculties}
              selectedFacultyId={selectedFaculty?.id || null}
              onSelect={handleFacultySelect}
              selectedLanguage={selectedLanguage}
              onLanguageSelect={handleLanguageSelect}
            />
          )}

          {currentStep === "form" &&
            selectedFaculty &&
            applicantType === "student" && (
              <StudentApplicationForm
                facultyId={selectedFaculty.id}
                facultyName={selectedFaculty.name}
                degreeId={selectedDegree?.id || 0}
                degreeName={selectedDegree?.name || ""}
                teachingLanguage={selectedLanguage || "EN"}
                onSubmitSuccess={clearState}
              />
            )}

          {currentStep === "form" &&
            selectedFaculty &&
            applicantType === "agency" && (
              <AgencyApplicationForm
                facultyId={selectedFaculty.id}
                facultyName={selectedFaculty.name}
                degreeId={selectedDegree?.id || 0}
                degreeName={selectedDegree?.name || ""}
                teachingLanguage={selectedLanguage || "EN"}
                onSubmitSuccess={clearState}
              />
            )}

          {currentStep === "form" &&
            selectedFaculty &&
            applicantType === "transfer" && (
              <TransferApplicationForm
                facultyId={selectedFaculty.id}
                facultyName={selectedFaculty.name}
                degreeId={selectedDegree?.id || 0}
                degreeName={selectedDegree?.name || ""}
                teachingLanguage={selectedLanguage || "EN"}
                onSubmitSuccess={clearState}
              />
            )}
        </motion.div>

        {currentStep !== "form" && (
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[var(--apply-line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === "type"}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-[var(--apply-ink)] transition hover:text-[var(--apply-forest)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft className="size-4" />
              {t("navigation.back")}
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed()}
              className="inline-flex items-center justify-center gap-2 bg-[var(--apply-forest)] px-6 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-[var(--apply-moss)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t("navigation.continue")}
              <ArrowRight className="size-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
