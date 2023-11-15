'use client';

import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';

import useSWR from 'swr';
import {
  getProjects,
  projectsUrlEndpoint as cacheKey,
} from '../../app/api/projectApi';

export default function DashboardPage() {
  const { isLoading, error, data: projects } = useSWR(cacheKey, getProjects);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  if (!projects) {
    return <div>No projects</div>;
  }

  return (
    <div className="flex gap-4 items-center justify-center h-screen">
      <Card className="w-max">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{projects.length}</div>
          <p>Projects</p>
        </CardContent>
      </Card>
    </div>
  );
}
