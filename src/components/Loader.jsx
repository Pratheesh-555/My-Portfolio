const Loader = () => {
  return (
    <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 animate-spin"></div>
        </div>
        <h2 className="text-xl font-bold text-white">Loading Portfolio</h2>
        <div className="flex gap-1 justify-center mt-4">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
