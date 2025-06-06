import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const imageUrls = watch("images");

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, imageUrl: string) => {
    event.preventDefault();
    setValue(
      "images",
      imageUrls.filter((url) => url !== imageUrl)
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        {imageUrls && (
          <div className="grid grid-cols-6 gap-4 ">
            {imageUrls.map((imageUrl, index) => (
              <div className="relative group">
                <img src={imageUrl} alt="Hotel Image" key={index} className="min-h-full object-cover" />
                <button
                  onClick={(event) => handleDelete(event, imageUrl)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = (imageFiles ? imageFiles.length : 0) + (imageUrls ? imageUrls.length : 0);
              if (totalLength === 0) {
                return "At least one image is required";
              }
              if (totalLength > 6) {
                return "Total Number of images should not exceed 6";
              }
              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-bold">{errors.imageFiles.message}</span>
      )}
    </div>
  );
};

export default ImagesSection;
