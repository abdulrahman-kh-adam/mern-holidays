import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/Store";
import { useEffect } from "react";
import { hideToast } from "../redux/ToastSlice";

const Toast = () => {
  const dispatch: AppDispatch = useDispatch();
  const { show, message, type } = useSelector((state: RootState) => state.toast);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => dispatch(hideToast()), 3000);
      return () => clearTimeout(timer);
    }
  }, [show, dispatch]);

  if (!show) return null;

  const styles =
    type === "success"
      ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-green-600 text-white max-w-md"
      : "fixed top-4 right-4 z-50 p-4 rounded-md bg-red-600 text-white max-w-md";

  return (
    <div className={styles}>
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
