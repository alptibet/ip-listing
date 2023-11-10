import { Input } from '../ui/input';
import { Table } from '@tanstack/react-table';
import FacetedFilter from './FacetedFilter';
import ViewOptions from './ViewOptions';
import { Button } from '../ui/button';
import { Device } from './Columns';
import { toast } from '../ui/use-toast';

import useSWR from 'swr';
import {
  getDevices,
  addDevice,
  devicesUrlEndpoint as cacheKey,
} from '../../app/api/devicesApi';
import { addDeviceOptions } from '../../app/api/devicesSWROptions';

type TableToolBarProps = {
  table: Table<Device>;
};

export default function TableToolbar({ table }: TableToolBarProps) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const tableMeta = table.options.meta;
  const projectName = tableMeta?.project.name;
  const projectId = tableMeta?.project.id;

  const {
    isLoading,
    error,
    data: projects,
    mutate,
  } = useSWR([cacheKey, projectName?.toUpperCase()], getDevices);

  const handleRemove = async function () {
    const projectName = tableMeta?.project.name;
    const itemsToDelete = table
      .getSelectedRowModel()
      .rows.map((item) => item.original)
      .map((item) => item.id);

    if (itemsToDelete.length === 0) {
      toast({
        title: 'Select at least one device to remove',
        description: 'No devices selected',
        duration: 3000,
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/projects/${projectName}`,
        {
          method: 'DELETE',
          body: JSON.stringify(itemsToDelete),
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
        description: 'Device(s) deleted.',
        duration: 3000,
      });
    } catch (error: any) {
      toast({
        title: 'Something went wrong...',
        description: `${error.message}`,
        duration: 3000,
        variant: 'destructive',
      });
      throw new Error('There was an error deleting project');
    }

    table.options.meta?.removeSelectedRows(
      table.getSelectedRowModel().rows.map((row) => row.index)
    );
    table.resetRowSelection();
  };

  const handleNewDevice = async function () {
    console.log('attempting to add');
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
      await mutate(
        addDevice([newDevice, projectName]).then((data) =>
          tableMeta?.addRow(data)
        ),
        addDeviceOptions(newDevice)
      );
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

  const handleAddDevice = function () {
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

  const systems = table.getColumn('system')?.getFacetedUniqueValues();
  const status = table.getColumn('status')?.getFacetedUniqueValues();
  let systemOptions;
  let statusOptions;
  if (systems) {
    systemOptions = Array.from(systems.keys());
  }
  if (status) {
    statusOptions = Array.from(status.keys());
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 my-2">
        <Input
          id="filter-device"
          placeholder="Filter devices..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Input
          id="filter-ip"
          placeholder="Filter IPs..."
          value={
            (table.getColumn('ipAddress')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('ipAddress')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <FacetedFilter
          title="Filter Systems"
          column={table.getColumn('system')}
          filterOptions={systemOptions}
        />
        <FacetedFilter
          title="Filter Status"
          column={table.getColumn('status')}
          filterOptions={statusOptions}
        />
        {isFiltered && (
          <Button
            className="h-8"
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
          >
            Clear Filters
          </Button>
        )}
        <ViewOptions table={table} />
      </div>
      <div className="flex mb-4">
        <div className="flex gap-2">
          <Button onClick={handleNewDevice}>Add Device</Button>
          <Button variant="destructive" onClick={handleRemove}>
            Remove Selected
          </Button>
        </div>
      </div>
    </div>
  );
}
