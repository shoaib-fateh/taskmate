import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const useAuth = () => {
  const token = Cookies.get("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  }
};

export default useAuth;
