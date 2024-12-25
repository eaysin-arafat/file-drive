'use client';

import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { TYPE_OPTIONS } from '@/constants/data';
import { useFileBrowser } from '@/hooks/use-file-browser';
import { DataTable } from '../ui/table/data-table';
import { DataTableResetFilter } from '../ui/table/data-table-reset-filter';
import { DataTableSearch } from '../ui/table/data-table-search';
import DataTableSelect from '../ui/table/data-table-select';
import { DataTableSkeleton } from '../ui/table/data-table-skeleton';
import { UploadButton } from '../ui/upload-button';
import { columns } from './columns';

export type FileType = 'ALLFILES' | 'TRASH' | 'FAVORITE';

type FileBrowserProps = {
  title: string;
  description: string;
  fileType: FileType;
};

export default function FileBrowser({
  title,
  description,
  fileType
}: FileBrowserProps) {
  const {
    query,
    setQuery,
    setType,
    isAnyFilterActive,
    modifiedFiles,
    resetFilters,
    isLoading
  } = useFileBrowser(fileType);

  return (
    <PageContainer scrollable>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <Heading title={title} description={description} />
          <UploadButton />
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <DataTableSearch
              searchKey="name"
              searchQuery={query}
              setSearchQuery={setQuery}
            />

            <DataTableSelect
              options={TYPE_OPTIONS}
              placeholder="Select File Type"
              label="File Types"
              onChange={(value) =>
                setType(value as 'image' | 'csv' | 'pdf' | 'all')
              }
            />

            <DataTableResetFilter
              isFilterActive={isAnyFilterActive}
              onReset={resetFilters}
            />
          </div>

          {isLoading ? (
            <DataTableSkeleton columnCount={5} rowCount={10} />
          ) : (
            <DataTable
              columns={columns(fileType)}
              data={modifiedFiles}
              isAllFile={fileType === 'ALLFILES'}
            />
          )}
        </div>
      </div>
    </PageContainer>
  );
}
