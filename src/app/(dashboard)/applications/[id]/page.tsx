import { notFound } from "next/navigation";
import { applications } from "../data";
import SkillAssessmentAns from "./_components/SkillAssessmentAns";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const application = applications.find((a) => a.id === id);
  if (!application) notFound();
  return <SkillAssessmentAns application={application} />;
}
