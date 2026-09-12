"use client";
import Link from "next/link";
import { useApplications } from "../../application-store";
import SkillAssessmentAns from "./SkillAssessmentAns";
export default function ApplicationDetails({ id }: { id: string }) {
 const application = useApplications().find(item => item.id === id);
 if (!application) return <div className="space-y-4 p-6"><h2 className="text-lg font-semibold">Application not found</h2><Link href="/applications" className="text-[#003B3B] underline">Back to applications</Link></div>;
 return <SkillAssessmentAns key={id} application={application} />;
}
