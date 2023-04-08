import { useDispatch } from "react-redux";
import { userLoggedIn } from "../../features/auth/authSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const auth = JSON.parse(localStorage.getItem("user"));
  auth?.accessToken && dispatch(userLoggedIn({ ...auth }));

  if (auth?.accessToken && auth?.user?.role === "student") {
    return true;
  } else {
    return false;
  }
};

export default useAuth;
