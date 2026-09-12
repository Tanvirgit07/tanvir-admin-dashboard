"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { applications } from "../../data";
import { saveReview, useReviews } from "../../review-store";
import ApplicationIntroduction from "./ApplicationIntroduction";
import AssessmentSection from "./AssessmentSection";
import { sections } from "./assessment-data";
export default function SkillAssessmentAns({
  application,
}: {
  application: (typeof applications)[number];
}) {
  const [step, setStep] = useState(-1);
  const reviews = useReviews();
  const answers = reviews[application.id]?.answers || {};
  const [decision, setDecision] = useState("");
  const [score, setScore] = useState("75");
  const [training, setTraining] = useState("");
  const update = (key: string, value: string) =>
    saveReview(application.id, { answers: { ...answers, [key]: value } });
  function navigate(next: number) {
    setStep(next);
    requestAnimationFrame(() => {
      document.getElementById("assessment-heading")?.focus();
      document
        .getElementById("assessment-top")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
  return (
    <div
      id="assessment-top"
      className={`mx-auto w-full scroll-mt-28 space-y-5 text-[#153237] ${step === -1 ? "" : "max-w-[1100px]"}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/applications"
          className="flex cursor-pointer items-center gap-2 text-sm text-[#00504D] hover:underline"
        >
          <ArrowLeft className="size-4" />
          Back to applications
        </Link>
        <p className="text-xs text-[#718589]">
          {application.name} · {step === -1 ? "Application overview" : `Section ${step + 1} of ${sections.length}`}
        </p>
      </div>
      <div
        className="h-1 overflow-hidden rounded-full bg-[#E0E7E5]"
        role="progressbar"
        aria-label="Assessment progress"
        aria-valuenow={step + 1}
        aria-valuemin={0}
        aria-valuemax={sections.length}
      >
        <div
          className="h-full bg-[#00504D] transition-all"
          style={{ width: `${((step + 1) / sections.length) * 100}%` }}
        />
      </div>
      <div className="rounded-lg bg-[#F7FAF9] p-3 sm:p-6">
        {step === -1 ? <ApplicationIntroduction application={application} answers={answers} onAnswer={update} /> : <div className="mx-auto max-w-[752px]"><AssessmentSection step={step} answers={answers} onAnswer={update} /></div>}
        {step === 8 && (
          <div className="mt-6 space-y-4">
            <div className="rounded-md bg-[#E8EEEE] p-4">
              <h3 className="text-sm font-semibold">
                Candidate Acknowledgement
              </h3>
              <p className="mt-1 text-xs text-[#718589]">
                By submitting this assessment, I confirm that all answers are my
                own work completed without assistance.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className="space-y-1 text-xs">
                  Candidate signature
                  <Input
                    value={answers.signature || ""}
                    onChange={(e) => update("signature", e.target.value)}
                    placeholder="Type full name as signature"
                  />
                </label>
                <label className="space-y-1 text-xs">
                  Date
                  <Input
                    type="date"
                    value={answers.date || ""}
                    onChange={(e) => update("date", e.target.value)}
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-wrap items-end gap-3">
              <label className="space-y-1 text-xs">
                Result (%)
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  className="w-24"
                />
              </label>
              {["Marketplace", "Training Required"].map((v) => (
                <Button
                  key={v}
                  onClick={() => setTraining(v)}
                  aria-pressed={training === v}
                  variant="outline"
                  className={`cursor-pointer ${training === v ? "bg-[#003B3B] text-white" : "text-[#003B3B]"}`}
                >
                  {v}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                className="cursor-pointer border-red-300 text-red-600 hover:bg-red-50"
                onClick={() => { saveReview(application.id, { status: "Rejected" }); setDecision("Application rejected"); }}
              >
                Reject application
              </Button>
              <Button
                disabled={!score || Number(score) < 0 || Number(score) > 100}
                className="cursor-pointer bg-[#003B3B] text-white hover:bg-[#00504D]"
                onClick={() => { saveReview(application.id, { status: "Approved" }); setDecision("Application approved"); }}
              >
                Approve application
              </Button>
            </div>
            <p role="status" className="text-sm font-medium text-[#00504D]">
              {decision && `${decision} — demo review saved for this session.`}
            </p>
          </div>
        )}
        <div className="mt-8 flex items-center justify-between border-t border-[#E0E7E5] pt-5">
          <Button
            variant="outline"
            disabled={step === -1}
            onClick={() => navigate(step - 1)}
            className="cursor-pointer border-[#BFD3CE] text-[#003B3B]"
          >
            <ChevronLeft className="size-4" />
            Previous
          </Button>
          {step < 8 ? (
            <Button
              onClick={() => navigate(step + 1)}
              className="cursor-pointer bg-[#003B3B] text-white hover:bg-[#00504D]"
            >
              Next
              <ChevronRight className="size-4" />
            </Button>
          ) : (
            <Button asChild className="cursor-pointer bg-[#003B3B] text-white">
              <Link href="/applications">Back to applications</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
