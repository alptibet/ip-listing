'use client';

import useSWR from 'swr';
import { DataTable } from '@/components/DataTable/DataTable';
import { Loader2 } from 'lucide-react';
import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertDialogDescription } from '@radix-ui/react-alert-dialog';

const fetcher = async function (url: string) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    const error = new Error('An error occured while fetching project data');
    throw error;
  }
  return response.json();
};

export default function DashboardPage({
  params: { name },
}: {
  params: { name: string };
}) {
  const { data, error, isLoading } = useSWR(
    `http://localhost:3000/api/projects/${name.toUpperCase()}`,
    fetcher
  );

  if (isLoading) {
    return (
      <div>
        <Loader2 className="h4 w-4 animate-spin inline" />
        <h2 className="inline ml-2">LOADING {name.toUpperCase()}...</h2>
      </div>
    );
  }

  if (error || !data) {
    return (
      <Alert variant="destructive" className="ml-2 w-max">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        {error && <AlertDescription>{error.message}</AlertDescription>}
        {!data && (
          <AlertDescription>
            There was a problem fetching problem {name.toUpperCase()}.
          </AlertDescription>
        )}
      </Alert>
    );
  }

  return (
    <div className="mx-2 my-2">
      <DataTable project={data} />
    </div>
  );
}
