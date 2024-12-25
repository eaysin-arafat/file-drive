import FileBrowser from '@/components/file-browser';

const Trash = () => {
  return (
    <FileBrowser
      title="Trash"
      description="View and manage files that have been deleted."
      fileType="TRASH"
    />
  );
};

export default Trash;
