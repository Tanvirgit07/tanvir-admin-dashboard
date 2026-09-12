"use client";
import { Input } from "@/components/ui/input";
export default function CandidateAcknowledgement({
  answers,
  onAnswer,
}: {
  answers: Record<string, string>;
  onAnswer: (key: string, value: string) => void;
}) {
  return (
    <div className="mt-6 rounded-lg bg-[#E8EEEE] px-5 py-7 sm:px-6">
      <h3 className="text-sm font-semibold">Candidate Acknowledgement</h3>
      <p className="mt-2 text-xs leading-5 text-[#718589]">
        By submitting this assessment, I confirm that all answers are my own
        work completed without assistance.
      </p>
      <div className="mt-5 grid gap-6 sm:grid-cols-2">
        <label className="space-y-2 text-sm font-medium">
          Candidate signature
          <Input
            required
            value={answers.signature || ""}
            onChange={(e) => onAnswer("signature", e.target.value)}
            placeholder="Type full name as signature"
            className="h-12 border-[#CDDCDA] bg-white/70 px-4 shadow-none"
          />
        </label>
        <label className="space-y-2 text-sm font-medium">
          Date
          <Input
            required
            type="date"
            value={answers.date || ""}
            onChange={(e) => onAnswer("date", e.target.value)}
            className="h-12 border-[#CDDCDA] bg-white/70 px-4 shadow-none"
          />
        </label>
      </div>
    </div>
  );
}
