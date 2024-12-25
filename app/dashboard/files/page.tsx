import FileBrowser from '@/components/file-browser';

const Files = () => {
  return (
    <FileBrowser
      title="All Files"
      description="View and manage all your uploaded files, including favorites and trash."
      fileType="ALLFILES"
    />
  );
};

export default Files;
