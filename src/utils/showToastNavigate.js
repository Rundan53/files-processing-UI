import { toast } from "react-toastify";

export function showToastMessage  (response, Navigate ,navigateTo="")  {
    if (response?.success || response?.data) {
      toast.success(response?.message || "action success");
      if (Navigate) {
        Navigate(navigateTo);
      }
    } else {
      toast.error(response?.message || "Error Notification !");
    }
  };