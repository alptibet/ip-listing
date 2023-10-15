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
import { Table } from '@tanstack/react-table';
import { useState } from 'react';

interface ActionsProps<TData> {
  tableRow: Device;
  table: Table<TData>;
}

export default function Actions({ tableRow, table }: ActionsProps<Device>) {
  const [viewEdits, setViewEdits] = useState(false);
  const meta = table.options.meta?.editRow;
  const addRow = table.options.meta?.addRow;
  return viewEdits ? (
    <div className="flex gap-2">
      <Button>
        <CheckIcon />
      </Button>
      <Button variant="destructive" onClick={() => setViewEdits(false)}>
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
          onClick={() => navigator.clipboard.writeText(tableRow.ipAddress)}
        >
          Copy IP Address
        </DropdownMenuItem>
        <DropdownMenuItem onClick={addRow}>Duplicate Item</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setViewEdits(true)}>
          Edit Item
        </DropdownMenuItem>
        <DropdownMenuItem>Delete Item</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
