import EditApplicationForm from "./_components/EditApplicationForm";
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
 const { id } = await params;
 return <EditApplicationForm id={id} />;
}
