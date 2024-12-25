'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ChangeEvent } from 'react';

interface DataTableSearchProps {
  searchKey: string;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export function DataTableSearch({
  searchKey,
  searchQuery,
  setSearchQuery
}: DataTableSearchProps) {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Input
      placeholder={`Search ${searchKey}...`}
      value={searchQuery ?? ''}
      onChange={handleSearch}
      className={cn('w-full md:max-w-sm')}
    />
  );
}
