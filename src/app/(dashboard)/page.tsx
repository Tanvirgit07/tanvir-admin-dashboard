import OverviewCards from "./_components/OverviewCards";
import PlatformActivity from "./_components/PlatformActivity";
import RecentApplication from "./_components/RecentApplication";

export default function DashboardPage() {
  return (
    <div className="min-h-[calc(100vh-148px)] space-y-5">
      <OverviewCards />
      <PlatformActivity />
      <RecentApplication />
    </div>
  );
}
