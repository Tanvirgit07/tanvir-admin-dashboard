"use client";

import { FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Props {
  application: { name: string; email: string; date: string; experience: string };
  answers: Record<string, string>;
  onAnswer: (key: string, value: string) => void;
}

export default function ApplicationIntroduction({ application, answers, onAnswer }: Props) {
  const inputClass = "mt-2 h-10 rounded-md border-[#D4DEDC] bg-transparent text-sm shadow-none placeholder:text-[#829498] focus-visible:ring-[#7FA6A3]/30";
  return (
    <section className="space-y-5">
      <h2 id="assessment-heading" tabIndex={-1} className="text-base font-medium text-[#153237]">Bookkeeper Application</h2>
      <div className="flex items-center justify-between border border-[#CDD6D4] px-3 py-3">
        <span className="flex items-center gap-2 text-xs font-medium"><FileText className="size-4 text-[#003B3B]" aria-hidden="true" />Resume</span>
        <Dialog>
          <DialogTrigger asChild><Button variant="link" className="h-auto cursor-pointer p-0 text-xs text-[#003B3B] underline">View</Button></DialogTrigger>
          <DialogContent className="bg-white [&_button]:cursor-pointer">
            <DialogHeader><DialogTitle>{application.name}</DialogTitle><DialogDescription>Sample resume · Bookkeeper</DialogDescription></DialogHeader>
            <div className="space-y-4 text-sm text-[#526B6B]">
              <p>{application.email}</p>
              <div><h3 className="mb-1 font-semibold text-[#003B3B]">Professional summary</h3><p>Bookkeeper with {application.experience} of experience managing accounts, reconciling bank statements and preparing financial reports for small businesses.</p></div>
              <div><h3 className="mb-1 font-semibold text-[#003B3B]">Skills</h3><p>QuickBooks, Xero, accounts payable and receivable, payroll, bank reconciliation and Excel.</p></div>
              <div><h3 className="mb-1 font-semibold text-[#003B3B]">Experience</h3><p>Maintained monthly ledgers, reviewed expense classifications and supported month-end reporting.</p></div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-full pt-7">
        <div className="bg-[#003B3B] px-5 py-8 text-center text-white sm:px-10">
          <h3 className="text-xl font-semibold sm:text-2xl">Bookkeeping Skills Assessment Answers</h3>
          <p className="mt-2 text-sm font-light text-[#D8E6E3]">Candidate Screening Evaluation | Designed by Theresa McCoy, CPA</p>
        </div>
        <p className="bg-[#E8EEEE] px-5 py-4 text-[11px] leading-4 text-[#356160] sm:px-[10%]"><span className="font-semibold">Instructions:</span> Complete all sections. Show your work where calculations are required. For open-ended questions, write complete, professional sentences. This assessment evaluates foundational bookkeeping skills.</p>
        <div className="mt-7 grid w-full gap-3 rounded-lg bg-[#E8EEEE] p-4 sm:grid-cols-2">
          <label className="text-xs">Candidate name:<Input className={inputClass} placeholder="Full name" value={answers.candidateName ?? application.name} onChange={e => onAnswer("candidateName", e.target.value)} /></label>
          <label className="text-xs">Date:<Input type="date" className={inputClass} value={answers.candidateDate ?? application.date} onChange={e => onAnswer("candidateDate", e.target.value)} /></label>
          <label className="text-xs">Position applied for:<Input className={inputClass} placeholder="Position title" value={answers.position ?? "Bookkeeper"} onChange={e => onAnswer("position", e.target.value)} /></label>
          <p className="flex items-center text-xs">Duration:<span className="ml-1 text-[#829498]">45 minutes</span></p>
        </div>
      </div>
    </section>
  );
}
