import ProjectsCard from '@/components/Cards/ProjectsCard';
import DevicesCard from '@/components/Cards/DevicesCard';

export default function DashboardPage() {
  return (
    <div className="flex items-center justify-center h-screen gap-4">
      <ProjectsCard />
      <DevicesCard />
    </div>
  );
}
