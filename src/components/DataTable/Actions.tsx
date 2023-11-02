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
  const [error, setError] = useState();
  const tableMeta = table.options.meta;

  const addRow = tableMeta?.addRow;

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

  const saveRow = async function () {
    const newDevice = {
      ...tableRow.original,
      projectId: tableMeta?.project.id,
    };
    const projectName = tableMeta?.project.name;
    if (tableRow.original.hasOwnProperty('id')) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/projects/${projectName}`,
          {
            method: 'PATCH',
            body: JSON.stringify(newDevice),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        if (!response.ok) {
          const errorResponse = await response.json();
          const error = errorResponse.message;
          setError(error);
        }
      } catch (error) {
        throw new Error('There was an error creating project');
      } finally {
      }
    } else {
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
          setError(error);
        }
      } catch (error) {
        throw new Error('There was an error creating project');
      } finally {
      }
    }
  };

  return viewEditActions ? (
    <div className="flex gap-2">
      <Button
        onClick={(e) => {
          setViewEditActions(false);
          setInEditMode(e);
          saveRow();
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
        <DropdownMenuItem onClick={addRow}>Add Row</DropdownMenuItem>
        <DropdownMenuItem
          id="edit"
          onClick={(e) => {
            setViewEditActions(true);
            setInEditMode(e);
          }}
        >
          Edit Item
        </DropdownMenuItem>
        <DropdownMenuItem id="remove" onClick={removeRow}>
          Delete Item
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
