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

interface ActionsProps<TData> {
  tableRow: Row<Device>;
  table: Table<TData>;
}

export default function Actions({ tableRow, table }: ActionsProps<Device>) {
  const [viewEditActions, setViewEditActions] = useState(false);
  const tableMeta = table.options.meta;

  const removeRow = function () {
    tableMeta?.removeRow(tableRow.index);
  };

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

  const handleAddDevice = function () {
    const projectName = tableMeta?.project.name;
    const projectId = tableMeta?.project.id;

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
    const newRow = async function (): Promise<Device> {
      try {
        const response = await fetch(
          `http://localhost:3000/api/projects/${projectName}`,
          {
            method: 'POST',
            body: JSON.stringify(newDevice),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (!response.ok) {
          const errorResponse = await response.json();
          const error = errorResponse.message;
          toast({
            title: 'Error',
            description: `${error}`,
            duration: 3000,
            variant: 'destructive',
          });
        }
        const data = await response.json();
        table.options.meta?.addRow(data);
        toast({
          title: 'New device added.',
          description: 'You can edit device details now.',
          duration: 3000,
        });
        return data;
      } catch (error: any) {
        toast({
          title: 'Something went wrong...',
          description: `${error.message}`,
          duration: 3000,
          variant: 'destructive',
        });
        throw new Error('There was an error creating project');
      }
    };
    newRow();
  };

  const handleSave = async function () {
    const editedDevice = {
      id: tableRow.original.id,
      name: tableRow.original.name,
      location: tableRow.original.location,
      ipAddress: tableRow.original.ipAddress,
      subnet: tableRow.original.subnet,
      gateway: tableRow.original.gateway,
      status: tableRow.original.status,
      system: tableRow.original.system,
      projectId: tableMeta?.project.id,
    };
    const projectName = tableMeta?.project.name;
    try {
      const response = await fetch(
        `http://localhost:3000/api/projects/${projectName}`,
        {
          method: 'PATCH',
          body: JSON.stringify(editedDevice),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        const error = errorResponse.message;
        toast({
          title: 'Error',
          description: `${error}`,
          duration: 3000,
          variant: 'destructive',
        });
      }
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
      throw new Error('There was an error creating project');
    }
  };

  const handleDelete = async function () {
    const projectName = tableMeta?.project.name;
    const deviceId = [tableRow?.original.id];
    try {
      const response = await fetch(
        `http://localhost:3000/api/projects/${projectName}`,
        {
          method: 'DELETE',
          body: JSON.stringify(deviceId),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        const error = errorResponse.message;
        toast({
          title: 'Error',
          description: `${error}`,
          duration: 3000,
          variant: 'destructive',
        });
      }
      toast({
        description: 'Device deleted.',
        duration: 3000,
      });
    } catch (error: any) {
      toast({
        title: 'Something went wrong...',
        description: `${error.message}`,
        duration: 3000,
        variant: 'destructive',
      });
      throw new Error('There was an error creating project');
    }
  };

  return viewEditActions ? (
    <div className="flex gap-2">
      <Button
        onClick={(e) => {
          handleSave();
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
        <DropdownMenuItem onClick={handleAddDevice}>Add Row</DropdownMenuItem>
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
            removeRow();
          }}
        >
          Delete Item
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
