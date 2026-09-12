"use client";
import { sections, type AssessmentTable } from "./assessment-data";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
type Props = {
  step: number;
  answers: Record<string, string>;
  onAnswer: (key: string, value: string) => void;
};
export default function AssessmentSection({ step, answers, onAnswer }: Props) {
  const section = sections[step];
  function table(t: AssessmentTable) {
    return (
      <div className="space-y-3">
        <p className="text-sm font-medium">{t.title}</p>
        <div className="overflow-x-auto rounded-lg border border-[#E0E7E5]">
          <table className="w-full min-w-[440px] text-left text-xs">
            <thead className="bg-[#E8EEEE] text-[#526361]">
              <tr>
                {t.headers.map((h) => (
                  <th key={h} className="px-3 py-3 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t.rows.map((row, i) => (
                <tr
                  key={i}
                  className={`border-t border-[#E7ECEA] ${t.kind === "profit" && (i === 3 || i === 13) ? "bg-[#FBECE7] text-[#D85432]" : ""}`}
                >
                  {row.map((cell, j) => (
                    <td key={j} className="px-3 py-3">
                      {cell}
                    </td>
                  ))}
                  {Array.from(
                    { length: t.headers.length - row.length },
                    (_, j) => {
                      const key = `${step}-table-${i}-${j}`;
                      return (
                        <td key={j} className="px-3 py-2">
                          {["accounts", "debits"].includes(t.kind) ? (
                            <Select
                              value={answers[key] || ""}
                              onValueChange={(v) => onAnswer(key, v)}
                            >
                              <SelectTrigger
                                aria-label={`${row.join(" ")} ${t.headers[row.length + j]}`}
                                className="w-full min-w-32 cursor-pointer rounded-sm bg-[#E8EEEE] text-xs"
                              >
                                <SelectValue placeholder="– select –" />
                              </SelectTrigger>
                              <SelectContent>
                                {(t.kind === "accounts"
                                  ? [
                                      "Asset",
                                      "Liability",
                                      "Equity",
                                      "Revenue",
                                      "COGS",
                                      "Expense",
                                    ]
                                  : ["Increase", "Decrease"]
                                ).map((v) => (
                                  <SelectItem
                                    className="cursor-pointer"
                                    key={v}
                                    value={v}
                                  >
                                    {v}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Input
                              aria-label={`${row[0]} ${t.headers[row.length + j]}`}
                              value={answers[key] || ""}
                              onChange={(e) => onAnswer(key, e.target.value)}
                              className="h-8 min-w-24 rounded-sm bg-[#E8EEEE] text-xs"
                              placeholder={
                                t.kind === "industry"
                                  ? "Enter accounts…"
                                  : "Enter amount"
                              }
                            />
                          )}
                        </td>
                      );
                    },
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {t.kind === "profit" && (
          <p className="text-xs text-[#D85432]">
            Items in red are intentional anomalies for this exercise.
          </p>
        )}
      </div>
    );
  }
  return (
    <section className="space-y-5">
      <h2
        tabIndex={-1}
        id="assessment-heading"
        className="border-b border-[#E3EAE7] pb-4 text-base font-semibold text-[#00504D]"
      >
        Section {step + 1} — {section.title}
      </h2>
      {section.table && [2, 3, 6].includes(step) && table(section.table)}
      {section.questions.map((q, i) => (
        <div key={q.id} className="space-y-2">
          <label htmlFor={q.id} className="block text-sm leading-5">
            <span className="mr-2 font-medium text-[#00504D]">
              Question {q.id}
            </span>
            {q.prompt}
          </label>
          {step === 0 && i === 0 && (
            <p className="text-[11px] text-[#718589]">
              Show all work. Round to two decimal places.
            </p>
          )}
          <textarea
            id={q.id}
            value={answers[q.id] || ""}
            onChange={(e) => onAnswer(q.id, e.target.value)}
            placeholder={step === 1 ? "=…" : "Enter your answer here…"}
            className="min-h-[70px] w-full resize-y rounded-md border border-[#E0E7E5] bg-transparent px-3 py-3 text-sm outline-none placeholder:text-[#829498] focus:border-[#7FA6A3] focus:ring-2 focus:ring-[#7FA6A3]/20"
          />
          {step === 7 && i === 0 && section.table && table(section.table)}
        </div>
      ))}
      {section.table && [0, 5].includes(step) && table(section.table)}
      {step === 8 && (
        <fieldset className="space-y-2">
          <legend className="mb-3 text-sm">
            Question 9D — Which equation is incorrect? A = Assets, L =
            Liabilities, E = Equity.
          </legend>
          {["A = L + E", "E = A - L", "L = E + A", "L = A - E"].map((v) => (
            <label
              key={v}
              className="flex cursor-pointer items-center gap-2 rounded-md border border-[#E0E7E5] p-3 text-sm"
            >
              <input
                type="radio"
                name="equation"
                className="cursor-pointer accent-[#003B3B]"
                checked={answers.equation === v}
                onChange={() => onAnswer("equation", v)}
              />
              {v}
            </label>
          ))}
        </fieldset>
      )}
    </section>
  );
}
