"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createApplication, updateApplication, type Application } from "../../applications/application-store";
import AssessmentSection from "./AssessmentSection";
import CandidateInformation from "./CandidateInformation";
import CandidateAcknowledgement from "./CandidateAcknowledgement";
import { sections } from "./assessment-data";

export default function AddApplicationForm({ application, initialAnswers = {} }: {
  application?: Application;
  initialAnswers?: Record<string, string>;
} = {}) {
  const router = useRouter();
  const [step, setStep] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, string>>({
    position: "Bookkeeper",
    ...(application ? { candidateName: application.name, candidateDate: application.date, email: application.email, experience: String(parseFloat(application.experience)) } : {}),
    ...initialAnswers,
  });
  const [error, setError] = useState("");
  const submitting = useRef(false);
  const [busy, setBusy] = useState(false);
  const update = (key: string, value: string) =>
    setAnswers((previous) => ({ ...previous, [key]: value }));
  function navigate(next: number) {
    setStep(next);
    setError("");
    requestAnimationFrame(() => {
      document.getElementById("assessment-heading")?.focus();
      document
        .getElementById("add-application-top")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
  function completeSection() {
    if (step === -1)
      return [
        "candidateName",
        "candidateDate",
        "email",
        "position",
        "experience",
      ].every((key) => answers[key]?.trim());
    const section = sections[step];
    if (section.questions.some((q) => !answers[q.id]?.trim())) return false;
    if (
      section.table &&
      section.table.rows.some((row, i) =>
        Array.from(
          { length: section.table!.headers.length - row.length },
          (_, j) => `${step}-table-${i}-${j}`,
        ).some((key) => !answers[key]?.trim()),
      )
    )
      return false;
    return (
      step !== 8 ||
      !!(answers.equation && answers.signature?.trim() && answers.date)
    );
  }
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!completeSection()) {
      setError("Please complete all fields in this section before continuing.");
      return;
    }
    if (step < 8) {
      navigate(step + 1);
      return;
    }
    if (submitting.current) return;
    submitting.current = true;
    setBusy(true);
    const save = application
      ? (data: Omit<Application, "id">, values: Record<string,string>) => updateApplication(application.id, data, values)
      : createApplication;
    save(
      {
        name: answers.candidateName.trim(),
        email: answers.email.trim(),
        date: answers.candidateDate,
        experience: `${answers.experience} years`,
        assessment: application?.assessment ?? "Pending",
        status: application?.status ?? "Pending",
      },
      answers,
    );
    router.push("/applications");
  }
  return (
    <form
      onSubmit={submit}
      id="add-application-top"
      className="w-full scroll-mt-28 space-y-5 text-[#153237]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/applications"
          className="cursor-pointer text-sm text-[#00504D] hover:underline"
        >
          ← Back to applications
        </Link>
        <p className="text-xs text-[#718589]">
          {step === -1
            ? "Application overview"
            : `Section ${step + 1} of ${sections.length}`}
        </p>
      </div>
      <div
        className="h-1 rounded-full bg-[#E0E7E5]"
        role="progressbar"
        aria-label="Application progress"
        aria-valuemin={0}
        aria-valuemax={9}
        aria-valuenow={step + 1}
      >
        <div
          className="h-full rounded-full bg-[#00504D]"
          style={{ width: `${((step + 1) / 9) * 100}%` }}
        />
      </div>
      <div className="rounded-lg bg-[#F7FAF9] p-3 sm:p-6">
        {step === -1 ? (
          <CandidateInformation answers={answers} onAnswer={update} />
        ) : (
          <div className="mx-auto w-full lg:w-[90%]">
            <AssessmentSection
              step={step}
              answers={answers}
              onAnswer={update}
            />
            {step === 8 && (
              <CandidateAcknowledgement answers={answers} onAnswer={update} />
            )}
          </div>
        )}
        <div className="mx-auto w-full lg:w-[90%]">
          {error && (
            <p role="alert" className="mt-5 text-sm text-red-600">
              {error}
            </p>
          )}
          <div className="mt-8 flex items-center justify-between gap-4 pb-2 pt-3">
            <Button
              type="button"
              variant="ghost"
              disabled={step === -1 || busy}
              onClick={() => navigate(step - 1)}
              className="h-11 cursor-pointer px-0 text-[#526B6B] hover:bg-transparent hover:text-[#003B3B]"
            >
              <ChevronLeft className="size-4" />
              Previous section
            </Button>
            <Button
              type="submit"
              disabled={busy}
              className="h-11 cursor-pointer gap-3 rounded-md bg-[#003B3B] px-5 text-white hover:bg-[#00504D]"
            >
              {busy ? (application ? "Updating…" : "Creating…") : step === 8 ? (application ? "Update application" : "Done") : "Next section"}
              {step < 8 && <ChevronRight className="size-4" />}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
