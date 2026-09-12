"use client";
import { Input } from "@/components/ui/input";
export default function CandidateInformation({
  answers,
  onAnswer,
}: {
  answers: Record<string, string>;
  onAnswer: (key: string, value: string) => void;
}) {
  return (
    <section className="space-y-5">
      <h2
        id="assessment-heading"
        tabIndex={-1}
        className="text-base font-medium"
      >
        Bookkeeper Application
      </h2>
      <div className="mx-auto w-full pt-7 lg:w-[90%]">
        <div className="bg-[#003B3B] px-5 py-8 text-center text-white sm:px-10">
          <h3 className="text-xl font-semibold sm:text-2xl">
            Bookkeeping Skills Assessment
          </h3>
          <p className="mt-2 text-sm font-light text-[#D8E6E3]">
            Candidate Screening Evaluation | Designed by Theresa McCoy, CPA
          </p>
        </div>
        <p className="bg-[#E8EEEE] px-5 py-4 text-[11px] leading-4 text-[#356160] sm:px-[10%]">
          <strong>Instructions:</strong> Complete all sections. Show your work
          where calculations are required. For open-ended questions, write
          complete, professional sentences. This assessment evaluates
          foundational bookkeeping skills.
        </p>
        <div className="mt-7 grid w-full gap-6 rounded-lg bg-[#E8EEEE] px-5 py-7 sm:grid-cols-2 sm:px-6">
          {[
            {
              key: "candidateName",
              label: "Candidate name",
              placeholder: "Full name",
              type: "text",
            },
            { key: "candidateDate", label: "Date", type: "date" },
            {
              key: "email",
              label: "Email",
              placeholder: "name@email.com",
              type: "email",
            },
            {
              key: "position",
              label: "Position applied for",
              placeholder: "Position title",
              type: "text",
            },
            {
              key: "experience",
              label: "Experience (years)",
              placeholder: "0",
              type: "number",
            },
          ].map((field) => (
            <label key={field.key} className="text-xs">
              {field.label}
              <Input
                required
                name={field.key}
                type={field.type}
                min={field.type === "number" ? 0 : undefined}
                max={field.type === "number" ? 80 : undefined}
                step={field.type === "number" ? "0.5" : undefined}
                placeholder={field.placeholder}
                value={answers[field.key] || ""}
                onChange={(e) => onAnswer(field.key, e.target.value)}
                className="mt-2.5 h-11 rounded-md border-[#D4DEDC] bg-transparent text-sm shadow-none focus-visible:ring-[#7FA6A3]/30"
              />
            </label>
          ))}
          <p className="flex items-center text-xs">
            Duration:<span className="ml-1 text-[#829498]">45 minutes</span>
          </p>
        </div>
      </div>
    </section>
  );
}
