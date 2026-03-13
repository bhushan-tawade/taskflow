import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getCurrentUserAPI, updateUserAPI, deleteUserAPI, changePasswordAPI } from "../services/userService";

const useUser = () => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {

      setLoading(true);
      const res = await getCurrentUserAPI();
      setUser(res.data);

    } catch (err) {

      console.error(err);
      toast.error("Failed to fetch user");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const updateProfile = async (data) => {
    try {
      const res = await updateUserAPI(data);
      setUser(res.data);
      toast.success("Profile updated");
    } catch {
      toast.error("Update failed");
    }
  };


  const changePassword = async (data) => {
    try {

      await changePasswordAPI(data);
      toast.success("Password changed successfully");
      return true;

    } catch (err) {

      const message = err.response?.data?.message || "Failed to change password";
      toast.error(message);
      return false;

    }
  };

  const deleteUser = async () => {
    try {

      await deleteUserAPI();
      toast.success("Account deleted");

      localStorage.removeItem("token");
      window.location.href = "/";

    } catch {

      toast.error("Failed to delete account");

    }
  };

  return {
    user,
    loading,
    fetchUser,
    updateProfile,
    changePassword,
    deleteUser
  };
};

export default useUser;