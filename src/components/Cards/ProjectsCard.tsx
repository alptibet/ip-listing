'use client';

import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

import useSWR from 'swr';
import {
  getProjects,
  projectsUrlEndpoint as cacheKey,
} from '../../app/api/projectApi';

export default function ProjectsCard() {
  const { isLoading, error, data } = useSWR(cacheKey, getProjects);

  let cardContent;
  if (isLoading) {
    cardContent = (
      <>
        <div>
          <Loader2 className="h4 w-4 animate-spin inline" />
        </div>
        <p>Loading Projects</p>
      </>
    );
  } else if (error) {
    cardContent = (
      <>
        <p>Could not load projects.</p>
      </>
    );
  } else if (!data) {
    cardContent = (
      <>
        <p>No projects.</p>
      </>
    );
  } else {
    cardContent = (
      <>
        <div className="text-2xl font-bold">{data.length}</div>
        <p>{data.length > 1 ? 'Projects' : 'Project'}</p>
      </>
    );
  }
  return (
    <Card className="w-max">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
      </CardHeader>
      <CardContent>{cardContent}</CardContent>
    </Card>
  );
}
