import { DotsHorizontalIcon } from '@radix-ui/react-icons';
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

type ActionsProps = { tableRow: Device; table: Table<Device> };

export default function Actions({ tableRow, table }: ActionsProps) {
  const meta = table.options.meta;
  return (
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
        <DropdownMenuItem>Duplicate Item</DropdownMenuItem>
        <DropdownMenuItem>Edit Item</DropdownMenuItem>
        <DropdownMenuItem>Delete Item</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
