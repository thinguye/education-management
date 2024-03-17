import dashboard from "./dashboard";
import pages from "./pages";
import utilities from "./utilities";
import management from "./management";
import other from "./other";
import dashboardStudent from "./dashboard-student";
import dashboardLecturer from "./dashboard-lecturer";

// ==============================|| MENU ITEMS ||============================== //
const user = JSON.parse(sessionStorage.getItem("user"));
const menuItems = {
  items:
    user != null
      ? (user.roles.includes("ROLE_ADMIN")
        ? [dashboard]
        : user.roles.includes("ROLE_STUDENT")
        ? [dashboardStudent]
        : [dashboardLecturer])
      : [dashboard],
};

export default menuItems;
