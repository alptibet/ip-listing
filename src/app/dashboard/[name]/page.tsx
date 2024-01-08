'use client';

import useSWR from 'swr';
import { DataTable } from '@/components/DataTable/DataTable';
import { Loader2 } from 'lucide-react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const devicesApi = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_URL
      : 'http://localhost:3000',
});

const fetcher = async function (url: string) {
  const response = await devicesApi.get(url);
  return response.data;
};

export default function DashboardPage({
  params: { name },
}: {
  params: { name: string };
}) {
  const { data: session } = useSession();
  console.log(session);

  const {
    isLoading,
    error,
    data: devices,
  } = useSWR(`api/projects/${name.toUpperCase()}`, fetcher);

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Alert variant="destructive" className="ml-2 w-max">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Not Authorized</AlertTitle>
          <AlertDescription>Login to view this page.</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <Loader2 className="h4 w-4 animate-spin inline" />
        <h2 className="inline ml-2">LOADING {name.toUpperCase()}...</h2>
      </div>
    );
  } else if (error || !devices) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Alert variant="destructive" className="ml-2 w-max">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          {error && <AlertDescription>{error.message}</AlertDescription>}
          {!devices && (
            <AlertDescription>
              There was a problem fetching {name.toUpperCase()}.
            </AlertDescription>
          )}
          <AlertDescription>
            Try reloading page or navigate to another project.
          </AlertDescription>
        </Alert>
      </div>
    );
  } else {
    return (
      <div className="mx-2 my-2">
        <DataTable deviceData={devices} />
      </div>
    );
  }
}
