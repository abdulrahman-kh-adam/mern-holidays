import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/manageHotelForm/ManageHotelForm";
import { useDispatch } from "react-redux";
import { showToast } from "../redux/ToastSlice";

const EditHotel = () => {
  const { hotelId } = useParams();
  const dispatch = useDispatch();

  const handleNotify = (message: string, type: "success" | "error") => {
    dispatch(showToast({ message, type }));
  };

  const { data: hotelData } = useQuery("getMyHotelById", () => apiClient.getMyHotelById(hotelId || ""), {
    enabled: !!hotelId,
  });

  const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {
      handleNotify("Hotel updated successfully", "success");
      window.location.reload();
    },
    onError: (error) => {
      handleNotify(
        error instanceof Error ? error.message : "An error occurred while updating the hotel",
        "error"
      );
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return <ManageHotelForm hotel={hotelData} isLoading={isLoading} onSave={handleSave} />;
};

export default EditHotel;
