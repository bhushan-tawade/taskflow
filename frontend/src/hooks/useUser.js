import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getCurrentUserAPI, updateUserAPI, deleteUserAPI } from "../services/userService";

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

  const updateUser = async (data) => {
    try {

      const res = await updateUserAPI(data);
      setUser(res.data);
      toast.success("Profile updated");

    } catch {

      toast.error("Update failed");

    }
  };

  const deleteUser = async () => {
    try {

      await deleteUserAPI();
      toast.success("Account deleted");

      localStorage.removeItem("token");
      window.location.href = "/login";

    } catch {

      toast.error("Failed to delete account");

    }
  };

  return {
    user,
    loading,
    fetchUser,
    updateUser,
    deleteUser
  };
};

export default useUser;