"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { applications } from "../../data";
import { saveReview, useReviews } from "../../review-store";
import ApplicationIntroduction from "./ApplicationIntroduction";
import AllCourse, { trainingCourses } from "./AllCourse";
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
  const [coursesOpen, setCoursesOpen] = useState(false);
  const assignedCourseId = reviews[application.id]?.trainingCourseId;
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
      className="mx-auto w-full scroll-mt-28 space-y-5 text-[#153237]"
    >
      {coursesOpen && <AllCourse open={coursesOpen} onOpenChange={setCoursesOpen} assignedCourseId={assignedCourseId} onAssign={(courseId) => { saveReview(application.id, { trainingCourseId: courseId }); setTraining("Training Required"); }} />}
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
        {step === -1 ? <ApplicationIntroduction application={application} answers={answers} onAnswer={update} /> : <div className="mx-auto w-full lg:w-[90%]"><AssessmentSection step={step} answers={answers} onAnswer={update} /></div>}
        {step === 8 && (
          <div className="mx-auto mt-6 w-full space-y-6 lg:w-[90%]">
            <div className="rounded-lg bg-[#E8EEEE] px-5 py-7 sm:px-6">
              <h3 className="text-sm font-semibold">
                Candidate Acknowledgement
              </h3>
              <p className="mt-1 text-xs text-[#718589]">
                By submitting this assessment, I confirm that all answers are my
                own work completed without assistance.
              </p>
              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                <label className="block space-y-2 text-sm font-medium text-[#245858]">
                  Candidate signature
                  <Input
                    value={answers.signature || ""}
                    onChange={(e) => update("signature", e.target.value)}
                    placeholder="Type full name as signature"
                    className="h-12 rounded-md border-[#CDDCDA] bg-white/70 px-4 text-sm shadow-none focus-visible:ring-[#7FA6A3]/30"
                  />
                </label>
                <label className="block space-y-2 text-sm font-medium text-[#245858]">
                  Date
                  <Input
                    type="date"
                    className="h-12 rounded-md border-[#CDDCDA] bg-white/70 px-4 text-sm shadow-none focus-visible:ring-[#7FA6A3]/30"
                    value={answers.date || ""}
                    onChange={(e) => update("date", e.target.value)}
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-wrap items-end justify-between gap-5 rounded-lg bg-white p-5 sm:p-6">
              <label className="block space-y-2 text-sm font-medium text-[#245858]">
                Result (%)
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  className="h-12 w-full rounded-md border-[#CDDCDA] bg-[#F7FAF9] px-4 text-base font-semibold shadow-none sm:w-52"
                />
              </label>
              <div className="flex flex-wrap gap-3 sm:ml-auto">
              {["Marketplace", "Training Required"].map((v) => (
                <Button
                  key={v}
                  onClick={() => { if (v === "Training Required") setCoursesOpen(true); else { setTraining(v); saveReview(application.id, { trainingCourseId: undefined }); } }}
                  aria-pressed={assignedCourseId ? v === "Training Required" : training === v}
                  variant="outline"
                  className={`h-12 cursor-pointer rounded-md border-[#BFD3CE] px-5 ${(assignedCourseId ? v === "Training Required" : training === v) ? "bg-[#003B3B] text-white" : "text-[#003B3B]"}`}
                >
                  {v}
                </Button>
              ))}
              </div>
            </div>
            {assignedCourseId && <p role="status" className="text-sm text-[#00504D]">Assigned training: {trainingCourses.find(course => course.id === assignedCourseId)?.name}</p>}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <Button variant="ghost" onClick={() => navigate(step - 1)} className="h-11 cursor-pointer px-0 text-[#526B6B] hover:bg-transparent hover:text-[#003B3B]">
                <ChevronLeft className="size-4" /> Previous section
              </Button>
              <div className="flex flex-wrap gap-3 sm:ml-auto">
              <Button
                variant="outline"
                className="h-11 cursor-pointer rounded-md border-red-200 bg-white px-5 text-red-600 hover:bg-red-50"
                onClick={() => { saveReview(application.id, { status: "Rejected" }); setDecision("Application rejected"); }}
              >
                Reject application
              </Button>
              <Button
                disabled={!score || Number(score) < 0 || Number(score) > 100}
                className="h-11 cursor-pointer rounded-md bg-[#003B3B] px-5 text-white hover:bg-[#00504D]"
                onClick={() => { saveReview(application.id, { status: "Approved" }); setDecision("Application approved"); }}
              >
                Approve application
              </Button>
              </div>
            </div>
            <p role="status" className="text-sm font-medium text-[#00504D]">
              {decision && `${decision} — demo review saved for this session.`}
            </p>
          </div>
        )}
        {step < 8 && (
          <div className="mx-auto mt-8 flex w-full flex-wrap items-center justify-between gap-4 pb-2 pt-3 lg:w-[90%]">
            <Button
              variant="ghost"
              disabled={step === -1}
              onClick={() => navigate(step - 1)}
              className="h-11 cursor-pointer px-0 text-[#526B6B] hover:bg-transparent hover:text-[#003B3B]"
            >
              <ChevronLeft className="size-4" />
              Previous section
            </Button>
            <Button
              onClick={() => navigate(step + 1)}
              className="group h-11 cursor-pointer gap-3 rounded-md bg-[#003B3B] px-5 font-medium text-white shadow-sm transition-colors hover:bg-[#00504D] focus-visible:ring-[#7FA6A3]/40"
            >
              Next section
              <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
