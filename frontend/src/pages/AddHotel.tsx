import { useMutation } from "react-query";
import ManageHotelForm from "../forms/manageHotelForm/ManageHotelForm";
import * as apiClient from "../api-client";
import { useDispatch } from "react-redux";
import { showToast } from "../redux/ToastSlice";

const AddHotel = () => {
  const dispatch = useDispatch();

  const handleNotify = (
    message: string,
    type: "success" | "error" | "info" | "warning"
  ) => {
    dispatch(showToast({ message, type }));
  };

  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      handleNotify("Hotel added successfully", "success");
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      handleNotify(errorMessage, "error");
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddHotel;
