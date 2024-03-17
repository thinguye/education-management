import { useRoutes } from "react-router-dom";

// routes
import MainRoutes from "./MainRoutes";
import AuthenticationRoutes from "./AuthenticationRoutes";
import useToken from "useToken";
// ==============================|| ROUTING RENDER ||============================== //
const token = sessionStorage.getItem("token");
var listRoutes = [];
if (!token) {
  listRoutes = [AuthenticationRoutes];
} else {
  listRoutes = [MainRoutes, AuthenticationRoutes];
}
export default function ThemeRoutes() {
  return useRoutes(listRoutes);
}
