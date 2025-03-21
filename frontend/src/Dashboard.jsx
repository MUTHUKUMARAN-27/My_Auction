import { DashboardCards } from "@/components/dashboard-cards"
import { DashboardHeader } from "@/components/dashboard-header"
import { RecentActivity } from "@/components/recent-activity"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader />
      <DashboardCards />
      <RecentActivity />
    </div>
  )
}