"use client";
import Link from "next/link";
import AddApplicationForm from "../../../add-application/_components/AddApplicationForm";
import { useApplications } from "../../../applications/application-store";
import { useReviews } from "../../../applications/review-store";

export default function EditApplicationForm({ id }: { id: string }) {
 const application = useApplications().find(item => item.id === id);
 const reviews = useReviews();
 if (!application) return <div className="space-y-4 p-6"><h2 className="text-lg font-semibold">Application not found</h2><Link href="/applications" className="cursor-pointer text-[#003B3B] underline">Back to applications</Link></div>;
 return <AddApplicationForm key={id} application={application} initialAnswers={reviews[id]?.answers} />;
}
