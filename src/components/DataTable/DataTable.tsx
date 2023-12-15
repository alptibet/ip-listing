'use client';

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  RowData,
} from '@tanstack/react-table';
import { DataTablePagination } from './Pagination';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Dispatch, SetStateAction, useState } from 'react';
import TableToolbar from './TableToolbar';
import { Device, columns } from './Columns';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    editRow: (rowIndex: number, columnId: string, value: string) => void;
    addRow: (newRow: Device) => void;
    removeRow: (rowIndex: number) => void;
    removeSelectedRows: (selectedRow: number[]) => void;
    revertData: (rowIndex: number, revert: boolean) => void;
    inEditMode: {};
    setInEditMode: Dispatch<SetStateAction<{}>>;
    project: { id: string; name: string };
  }
}

export function DataTable({ deviceData }: any) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState(() => [...deviceData?.devices]);
  const [originalData, setOriginalData] = useState(() => [
    ...deviceData.devices,
  ]);
  const [inEditMode, setInEditMode] = useState({});
  const table = useReactTable({
    data,
    columns,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    autoResetAll: false,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    meta: {
      project: deviceData,
      inEditMode,
      setInEditMode,
      revertData: (rowIndex: number, revert: boolean) => {
        if (revert) {
          setData((old) =>
            old.map((row, index) =>
              index === rowIndex ? originalData[rowIndex] : row
            )
          );
        } else {
          setOriginalData((old) =>
            old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
          );
        }
      },
      addRow: (newRow) => {
        setData((old) => [...old, newRow]);
        setOriginalData((old) => [...old, newRow]);
      },
      editRow: (rowIndex: number, columnId: string, value: string) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
      removeRow: (rowIndex: number) => {
        const oldData = [...data];
        const newData = oldData.filter(
          (_row: Device, index: number) => index !== rowIndex
        );
        setData(newData);
        setOriginalData(newData);
        setRowSelection({});
      },
      removeSelectedRows: (selectedRows: number[]) => {
        const oldData = [...data];
        const newData = oldData.filter(
          (_row: Device, index: number) => !selectedRows.includes(index)
        );
        setData(newData);
        setOriginalData(newData);
      },
    },
  });

  return (
    <>
      <TableToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Project empty.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <DataTablePagination table={table} />
        </div>
      </div>
    </>
  );
}
