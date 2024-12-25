import FileBrowser from '@/components/file-browser';

const Favorite = () => {
  return (
    <FileBrowser
      title="Favorite Files"
      description="Access and manage your favorite files."
      fileType="FAVORITE"
    />
  );
};

export default Favorite;
