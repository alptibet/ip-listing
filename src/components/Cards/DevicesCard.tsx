'use client';

import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import useSWR from 'swr';
import { Loader2 } from 'lucide-react';
import axios from 'axios';

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

export default function DevicesCard() {
  const { isLoading, error, data } = useSWR('api/devices', fetcher);

  let cardContent;
  if (isLoading) {
    cardContent = (
      <>
        <div>
          <Loader2 className="h4 w-4 animate-spin inline" />
        </div>
        <p>Loading Devices</p>
      </>
    );
  } else if (error) {
    cardContent = (
      <>
        <p>Could not load devices.</p>
      </>
    );
  } else if (!data) {
    cardContent = (
      <>
        <p>No devices.</p>
      </>
    );
  } else {
    cardContent = (
      <>
        <div className="text-2xl font-bold">{data}</div>
        <p>{data > 1 ? 'Devices' : 'Device'}</p>
      </>
    );
  }
  return (
    <Card className="w-max">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Total Devices</CardTitle>
      </CardHeader>
      <CardContent>{cardContent}</CardContent>
    </Card>
  );
}
