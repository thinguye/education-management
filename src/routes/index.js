import { useRoutes } from "react-router-dom";

// routes
import MainRoutes from "./MainRoutes";
import AuthenticationRoutes from "./AuthenticationRoutes";
import useToken from "useToken";
import StudentRoutes from "./StudentRoutes";
import LecturerRoutes from "./LecturerRoutes";
// ==============================|| ROUTING RENDER ||============================== //
const token = sessionStorage.getItem("token");
const user = JSON.parse(sessionStorage.getItem("user"));
var listRoutes = [];
if (!token) {
  listRoutes = [AuthenticationRoutes];
} else if (user.roles.includes("ROLE_ADMIN")) {
  listRoutes = [MainRoutes, AuthenticationRoutes];
} else if (user.roles.includes("ROLE_STUDENT")) {
  listRoutes = [StudentRoutes, AuthenticationRoutes];
}
else if (user.roles.includes("ROLE_LECTURER")) {
  listRoutes = [LecturerRoutes, AuthenticationRoutes];
}
export default function ThemeRoutes() {
  return useRoutes(listRoutes);
}
