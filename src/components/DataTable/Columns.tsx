'use client';

import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import Actions from './Actions';

export type Device = {
  name: string;
  location: string;
  ipAddress: string;
  subnet: string;
  gateway: string;
  status: 'Assigned' | 'Not Assigned';
  system: string;
};

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
  },
  {
    accessorKey: 'subnet',
    header: 'Subnet',
  },
  {
    accessorKey: 'gateway',
    header: 'Gateway',
  },
  {
    accessorKey: 'location',
    header: 'Location',
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
          <span>Status</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
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
  },
  {
    id: 'actions',
    cell: ({ row, table }) => {
      const tableRow = row.original;

      return <Actions table={table} tableRow={tableRow} />;
    },
  },
];
