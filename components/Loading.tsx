export default function Loading() {
  return (
    <>
      <div className="flex items-center space-x-2 bg-amber-50 w-dvh h-dvh absolute">
        <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce delay-100"></div>
        <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce delay-200"></div>
      </div>
      <p className="mt-3 text-gray-700">Loading coins data...</p>
    </>
  );
}