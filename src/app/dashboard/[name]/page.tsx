'use client';

import useSWR from 'swr';
import { DataTable } from '@/components/DataTable/DataTable';
import { Loader2 } from 'lucide-react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import {
  getDevices,
  devicesUrlEndpoint as cacheKey,
} from '../../api/projectApi';

export default function DashboardPage({
  params: { name },
}: {
  params: { name: string };
}) {
  const {
    isLoading,
    error,
    data: devices,
  } = useSWR(cacheKey, getDevices(name));
  console.log(devices);

  if (isLoading) {
    return (
      <div>
        <Loader2 className="h4 w-4 animate-spin inline" />
        <h2 className="inline ml-2">LOADING {name.toUpperCase()}...</h2>
      </div>
    );
  }

  if (error || !devices) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Alert variant="destructive" className="ml-2 w-max">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          {error && <AlertDescription>{error.message}</AlertDescription>}
          {!devices && (
            <AlertDescription>
              There was a problem fetching problem {name.toUpperCase()}.
            </AlertDescription>
          )}
          <AlertDescription>
            Try reloading page or navigate to another project.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="mx-2 my-2">
      <DataTable deviceData={devices} />
    </div>
  );
}
