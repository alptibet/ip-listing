import { Input } from '../ui/input';
import { Table } from '@tanstack/react-table';
import FacetedFilter from './FacetedFilter';
import ViewOptions from './ViewOptions';
import { Button } from '../ui/button';

type TableToolBarProps<TData> = {
  table: Table<TData>;
};

export default function TableToolbar<TData>({
  table,
}: TableToolBarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const handleRemove = function () {
    table.options.meta?.removeSelectedRows(
      table.getSelectedRowModel().rows.map((row) => row.index)
    );
    table.resetRowSelection();
  };

  const handleAddDevice = function () {
    table.options.meta?.addRow();
  };

  const handleSaveChanges = function () {
    const editedRows = table.options.meta?.editedRows;
    console.log(editedRows);

    editedRows?.forEach((item) => {
      if (item.hasOwnProperty('id')) {
        console.log(item, ' will patch this');
      } else {
        console.log(item, ' will create this');
      }
    });
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
          placeholder="Filter devices..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Input
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
      <div className="flex gap-2 mb-4">
        <div className="flex gap-2">
          <Button onClick={handleAddDevice}>Add Device</Button>
          <Button variant="destructive" onClick={handleRemove}>
            Remove Selected
          </Button>
        </div>
        <div className="ml-auto flex gap-2">
          <Button onClick={handleSaveChanges} className="font-bold">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
