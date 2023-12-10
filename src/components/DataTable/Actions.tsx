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
import type { Device as deviceSchema } from './Columns';
import { Row, Table } from '@tanstack/react-table';
import { useState } from 'react';
import { toast } from '../ui/use-toast';
import axios from 'axios';
import { z } from 'zod';
import { useSession } from 'next-auth/react';

const statusEnum = z.enum(['Assigned', 'Not Assigned']);

const deviceSchema = z.object({
  id: z.number(),
  name: z.string(),
  location: z.string(),
  ipAddress: z.string().ip().or(z.literal('')),
  subnet: z.string().ip().or(z.literal('')),
  gateway: z.string().ip().or(z.literal('')),
  status: statusEnum,
  system: z.string(),
  projectId: z.number(),
});

interface ActionsProps<TData> {
  tableRow: Row<deviceSchema>;
  table: Table<TData>;
}

const devicesApi = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_URL
      : 'http://localhost:3000',
});

export default function Actions({
  tableRow,
  table,
}: ActionsProps<deviceSchema>) {
  const [viewEditActions, setViewEditActions] = useState(false);
  const tableMeta = table.options.meta;
  const projectName = tableMeta?.project.name;
  const projectId = tableMeta?.project.id;
  const session = useSession();
  const isAdmin = session.data?.user?.userRole !== 'user';

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
    try {
      const response = await devicesApi.post(
        `api/projects/${projectName}`,
        newDevice
      );
      tableMeta?.addRow(response.data[0]);
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
    let errorMessage = '';
    try {
      const parseResult = deviceSchema.safeParse(editedDevice);
      if (!parseResult.success) {
        const issues = parseResult.error.issues;
        if (issues.some((err) => err.path[0] === 'ipAddress')) {
          errorMessage = errorMessage + 'Invalid IP Address. ';
        }
        if (issues.some((err) => err.path[0] === 'subnet')) {
          errorMessage = errorMessage + 'Invalid Subnet. ';
        }
        if (issues.some((err) => err.path[0] === 'gateway')) {
          errorMessage = errorMessage + 'Invalid Gateway. ';
        }
        console.log(errorMessage);
        throw new Error(errorMessage);
      }
      await devicesApi.patch(`api/projects/${projectName}`, editedDevice);
      toast({
        description: 'Saving changes.',
        duration: 3000,
      });
    } catch (error: any) {
      toast({
        title: 'Something went wrong...',
        description: `${error.message}`,
        duration: 10000,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async function () {
    const deviceId = [tableRow?.original.id];
    try {
      await devicesApi.delete(`api/projects/${projectName}`, {
        data: deviceId,
      });
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
        <DropdownMenuItem
          onClick={() =>
            navigator.clipboard.writeText(tableRow.getValue('ipAddress'))
          }
        >
          Copy IP Address
        </DropdownMenuItem>
        {isAdmin && (
          <>
            <DropdownMenuItem onClick={handleNewDevice}>
              Add Row
            </DropdownMenuItem>
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
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
