'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef, RowData } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '../ui/button';
import Actions from './Actions';
import EditableCell from './EditableCell';

export type Device = {
  id: string;
  isNew: boolean;
  name: string;
  location: string;
  ipAddress: string;
  subnet: string;
  gateway: string;
  status: 'Assigned' | 'Not Assigned';
  system: string;
};

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue> {
    type: string;
    options: { value: string; label: string }[];
  }
}

export const columns: ColumnDef<Device>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: EditableCell,
  },
  {
    accessorKey: 'ipAddress',
    header: ({ column }) => {
      return (
        <Button
          className="h-8"
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          IP Address
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: EditableCell,
  },
  {
    accessorKey: 'subnet',
    header: 'Subnet',
    cell: EditableCell,
  },
  {
    accessorKey: 'gateway',
    header: 'Gateway',
    cell: EditableCell,
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: EditableCell,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          className="h-8"
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: EditableCell,
    meta: {
      type: 'select',
      options: [
        { value: 'Assigned', label: 'Assigned' },
        { value: 'Not Assigned', label: 'Not Assigned' },
      ],
    },
  },
  {
    accessorKey: 'system',
    header: ({ column }) => {
      return (
        <Button
          className="h-8"
          size="sm"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          System
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    cell: EditableCell,
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      return <Actions table={table} tableRow={row} />;
    },
  },
];
