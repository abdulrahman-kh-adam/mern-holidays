const Footer = () => {
  return (
    <div className="bg-blue-800 py-10">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-white text-3xl font-bold tracking-tight text-lg sm:text-3xl">MernHolidays.com</span>
        <span className="text-white font-bold tracking-tight flex gap-2 sm:gap-4 text-sm sm:text-base">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Service</p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
