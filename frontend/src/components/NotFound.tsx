const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h1 className="text-4xl font-bold text-center">404 Not Found</h1>
      <p className="text-lg text-center mt-4">The page you are looking for does not exist.</p>
      <a href="/" className="text-blue-500 hover:underline mt-4">
        Go back to Home
      </a>
    </div>
  );
};

export default NotFound;
