import { Input } from '../ui/input';
import { Table } from '@tanstack/react-table';
import FacetedFilter from './FacetedFilter';
import ViewOptions from './ViewOptions';
import { Button } from '../ui/button';
import { Device } from './Columns';
import { toast } from '../ui/use-toast';
import axios from 'axios';
import { useSession } from 'next-auth/react';

type TableToolBarProps = {
  table: Table<Device>;
};

const devicesApi = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_URL
      : 'http://localhost:3000',
});

export default function TableToolbar({ table }: TableToolBarProps) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const tableMeta = table.options.meta;
  const projectName = tableMeta?.project.name;
  const projectId = tableMeta?.project.id;

  const session = useSession();
  const isAdmin = session.data?.user?.userRole !== 'user';

  const handleDeleteDevice = async function () {
    const itemsToDelete = table.getSelectedRowModel().rows.map((item) => {
      return item.original.id;
    });

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
      await devicesApi.delete(`api/projects/${projectName}`, {
        data: itemsToDelete,
      });
      tableMeta?.removeSelectedRows(
        table.getSelectedRowModel().rows.map((row) => row.index)
      );
      table.resetRowSelection();
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
          <Button disabled={!isAdmin} onClick={handleNewDevice}>
            Add Device
          </Button>
          <Button
            disabled={!isAdmin}
            variant="destructive"
            onClick={handleDeleteDevice}
          >
            Remove Selected
          </Button>
        </div>
      </div>
    </div>
  );
}
