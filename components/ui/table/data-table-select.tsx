import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '../select';

interface DataTableSelectProps<T extends string | number> {
  options: { value: T; label: string }[];
  placeholder?: string;
  label?: string;
  onChange: (value: T) => void;
  className?: string;
}

const DataTableSelect = <T extends string | number>({
  options,
  placeholder = 'Select an option',
  label,
  onChange,
  className = 'w-[180px]'
}: DataTableSelectProps<T>) => {
  return (
    <Select onValueChange={(value) => onChange(value as T)}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {label && (
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
          </SelectGroup>
        )}
        {options.map((option) => (
          <SelectItem key={option.value} value={String(option.value)}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DataTableSelect;
