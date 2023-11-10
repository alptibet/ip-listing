import {
  DotsHorizontalIcon,
  CheckIcon,
  CrossCircledIcon,
} from '@radix-ui/react-icons';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Separator } from '@radix-ui/react-separator';
import type { Device } from './Columns';
import { Row, Table } from '@tanstack/react-table';
import { useState } from 'react';
import { toast } from '../ui/use-toast';

import useSWR from 'swr';
import {
  getDevices,
  addDevice,
  deleteDevice,
  devicesUrlEndpoint as cacheKey,
  updateDevice,
} from '../../app/api/devicesApi';

interface ActionsProps<TData> {
  tableRow: Row<Device>;
  table: Table<TData>;
}

export default function Actions({ tableRow, table }: ActionsProps<Device>) {
  const [viewEditActions, setViewEditActions] = useState(false);
  const tableMeta = table.options.meta;
  const projectName = tableMeta?.project.name;
  const projectId = tableMeta?.project.id;
  const { mutate } = useSWR([cacheKey, projectName?.toUpperCase()], getDevices);

  const setInEditMode = function (e: React.SyntheticEvent) {
    const elementName = e.currentTarget.id;

    tableMeta?.setInEditMode((old: []) => ({
      ...old,
      [tableRow.index]: !old[tableRow.index],
    }));

    if (elementName !== 'edit') {
      tableMeta?.revertData(tableRow.index, e.currentTarget.id === 'cancel');
    }
  };

  const handleNewDevice = async function () {
    const newDevice = {
      name: '',
      location: '',
      ipAddress: '',
      subnet: '',
      gateway: '',
      status: 'Not Assigned',
      system: '',
      projectId,
    };
    let data;
    try {
      await mutate((data = await addDevice([newDevice, projectName])));
      tableMeta?.addRow(data);
      toast({
        title: 'New device added.',
        description: 'You can edit device details now.',
        duration: 3000,
      });
    } catch (error: any) {
      toast({
        title: 'Something went wrong...',
        description: `${error.message}`,
        duration: 3000,
        variant: 'destructive',
      });
    }
  };

  const handleUpdateDevice = async function () {
    const editedDevice = {
      id: tableRow.original.id,
      name: tableRow.original.name,
      location: tableRow.original.location,
      ipAddress: tableRow.original.ipAddress,
      subnet: tableRow.original.subnet,
      gateway: tableRow.original.gateway,
      status: tableRow.original.status,
      system: tableRow.original.system,
      projectId,
    };
    try {
      await mutate(updateDevice([editedDevice, projectName]));
      toast({
        description: 'Saving changes.',
        duration: 3000,
      });
    } catch (error: any) {
      toast({
        title: 'Something went wrong...',
        description: `${error.message}`,
        duration: 3000,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async function () {
    const deviceId = [tableRow?.original.id];
    try {
      await mutate(deleteDevice([deviceId, projectName]));
      toast({
        description: 'Device(s) deleted.',
        duration: 3000,
      });
      tableMeta?.removeRow(tableRow.index);
    } catch (error: any) {
      toast({
        title: 'Something went wrong...',
        description: `${error.message}`,
        duration: 3000,
        variant: 'destructive',
      });
    }
  };

  return viewEditActions ? (
    <div className="flex gap-2">
      <Button
        onClick={(e) => {
          handleUpdateDevice();
          setViewEditActions(false);
          setInEditMode(e);
        }}
        id="done"
      >
        <CheckIcon />
      </Button>
      <Button
        id="cancel"
        variant="destructive"
        onClick={(e) => {
          setViewEditActions(false);
          setInEditMode(e);
        }}
      >
        <CrossCircledIcon />
      </Button>
    </div>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <Separator />
        <DropdownMenuItem>Copy IP Address</DropdownMenuItem>
        <DropdownMenuItem onClick={handleNewDevice}>Add Row</DropdownMenuItem>
        <DropdownMenuItem
          id="edit"
          onClick={(e) => {
            setViewEditActions(true);
            setInEditMode(e);
          }}
        >
          Edit Item
        </DropdownMenuItem>
        <DropdownMenuItem
          id="remove"
          onClick={() => {
            handleDelete();
          }}
        >
          Delete Item
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
