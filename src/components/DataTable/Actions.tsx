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

interface ActionsProps<TData> {
  tableRow: Row<Device>;
  table: Table<TData>;
}

export default function Actions({ tableRow, table }: ActionsProps<Device>) {
  const [viewEditActions, setViewEditActions] = useState(false);
  const tableMeta = table.options.meta;
  const editRow = table.options.meta?.editRow;
  const addRow = table.options.meta?.addRow;
  const removeRow = function() {
    tableMeta?.removeRow(tableRow.index);
  };

  const setEditedRows = function(e: React.MouseEvent<HTMLButtonElement>) {
    const elementName = e.currentTarget.name;
    table.options.meta?.setEditedRows((old: []) => ({
      ...old,
      [tableRow.index]: !old[tableRow.index],
    }));
    if (elementName !== 'edit') {
      tableMeta?.revertData(tableRow.index, e.currentTarget.name === 'cancel');
    }
  };

  return viewEditActions ? (
    <div className="flex gap-2">
      <Button name="edit">
        <CheckIcon />
      </Button>
      <Button
        name="cancel"
        variant="destructive"
        onClick={() => setViewEditActions(false)}
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
            navigator.clipboard.writeText(tableRow.original.ipAddress)
          }
        >
          Copy IP Address
        </DropdownMenuItem>
        <DropdownMenuItem onClick={addRow}>Add Row</DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setViewEditActions(true);
            setEditedRows;
          }}
        >
          Edit Item
        </DropdownMenuItem>
        <DropdownMenuItem onClick={removeRow}>Delete Item</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
