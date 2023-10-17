const ImageLoader = () => {
  return (
    <div
      role="status"
      className="max-w-md p-4 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 "
    >
      <div className="flex items-center justify-between">
          <div className="h-28 w-28 bg-gray-300 rounded-full dark:bg-gray-600 mb-2.5 "></div>
        
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default ImageLoader;
