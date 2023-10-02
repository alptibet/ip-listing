import { Input } from '../ui/input';

export default function Search() {
  return (
    <div>
      <Input
        className="md:w-[100px] lg:w-[300px]"
        type="search"
        placeholder="Search..."
      />
    </div>
  );
}
