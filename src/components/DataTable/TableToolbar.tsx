'use client';

import { Input } from '../ui/input';
import { Table } from '@tanstack/react-table';
import FacetedFilter from './FacetedFilter';
import ViewOptions from './ViewOptions';

type TableToolBarProps<TData> = {
  table: Table<TData>;
};

export default function TableToolbar<TData>({
  table,
}: TableToolBarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center gap-2 py-4">
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
        value={(table.getColumn('ipAddress')?.getFilterValue() as string) ?? ''}
        onChange={(event) =>
          table.getColumn('ipAddress')?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      <FacetedFilter
        title="Filter Systems"
        column={table.getColumn('system')}
        filterOptions={DUMMY_SYSTEMS.systems}
      />
      <ViewOptions table={table} />
    </div>
  );
}

//delete this later
const DUMMY_SYSTEMS = {
  systems: [
    {
      id: 'a',
      name: 'KNX',
    },
    {
      id: 'b',
      name: 'CCTV',
    },
    {
      id: 'c',
      name: 'HVAC',
    },
  ],
};
