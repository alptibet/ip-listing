import { Cell } from '@tanstack/react-table';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useEffect, useState } from 'react';
import { Device } from './Columns';

type Option = {
  label: string;
  value: string;
};

export default function EditableCell({
  getValue,
  row,
  column,
  table,
}: ReturnType<Cell<Device, unknown>['getContext']>) {
  const initValue = getValue();
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;
  const [cellData, setCellData] = useState(initValue);

  const onBlur = function () {
    tableMeta?.editRow(row.index, column.id, cellData as string);
  };

  const onSelectChange = function (value: string) {
    setCellData(value);
    tableMeta?.editRow(row.index, column.id, value);
  };

  useEffect(() => {
    setCellData(initValue);
  }, [initValue]);

  if (tableMeta?.editedRows[row.index]) {
    return columnMeta?.type === 'select' ? (
      <Select onValueChange={onSelectChange}>
        <SelectTrigger>
          <SelectValue placeholder={cellData as string} />
        </SelectTrigger>
        <SelectContent>
          {columnMeta?.options?.map((option: Option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ) : (
      <Input
        className="w-32"
        value={cellData as string}
        onChange={(e) => setCellData(e.target.value)}
        onBlur={onBlur}
        type={columnMeta?.type || 'text'}
      />
    );
  }
  return <span>{cellData as string}</span>;
}
