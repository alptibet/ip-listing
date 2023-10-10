import { useEffect, useState } from 'react';
import { Input } from '../ui/input';

export default function DataCell({ getValue }) {
  const initialValue = getValue();
  const [cellValue, setCellValue] = useState(initialValue);

  useEffect(() => {
    setCellValue(initialValue);
  }, [initialValue]);

  return (
    <Input
      className="w-32"
      disabled
      value={cellValue}
      onChange={(e) => setCellValue(e.target.value)}
    />
  );
}
