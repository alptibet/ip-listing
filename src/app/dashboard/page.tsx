import ProjectsCard from '@/components/Cards/ProjectsCard';
import DevicesCard from '@/components/Cards/DevicesCard';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/signin');
  }

  if (!session?.user?.isActive) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Alert className="w-1/4" variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>
            Your account is not activated yet. Please contact administrator to
            activate your account.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center h-screen gap-4">
      <ProjectsCard />
      <DevicesCard />
    </div>
  );
}
