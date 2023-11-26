'use client';

import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import useSWR from 'swr';
import axios from 'axios';

const projectsApi = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_URL
      : 'http://localhost:3000',
});

const fetcher = async function (url: string) {
  const response = await projectsApi.get(url);
  return response.data;
};

export default function ProjectsCard() {
  const { isLoading, error, data } = useSWR('api/projects', fetcher);

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
