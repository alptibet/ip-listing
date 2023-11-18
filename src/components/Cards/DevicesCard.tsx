'use client';

import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';

import useSWR from 'swr';

import {
  getAllDevices,
  allDevicesEndpoint as cacheKey,
} from '../../app/api/devicesApi';
import { Loader2 } from 'lucide-react';

export default function DevicesCard() {
  const { isLoading, error, data } = useSWR(cacheKey, getAllDevices);

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
