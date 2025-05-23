import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { showToast } from "../redux/ToastSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const dispatch = useDispatch();

  const handleNotify = (message: string, type: "success" | "error" | "info" | "warning") => {
    dispatch(showToast({ message, type }));
  };

  const navigate = useNavigate();

  const mutation = useMutation(apiClient.signout, {
    onSuccess: () => {
      handleNotify("Signed out successfully", "success");
      window.location.reload();
      navigate("/");
    },
    onError: (error: Error) => {
      handleNotify(error.message, "error");
    },
  });

  const onClick = () => {
    mutation.mutate();
  };

  return (
    <button
      className="flex items-center text-blue-600 px-3 font-bold hover:bg-gray-100 bg-white h-10"
      onClick={onClick}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
