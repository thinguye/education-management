// assets
import {
    SlGraduation,
    SlBadge,
    SlBriefcase,
    SlOrganization,
    SlCalender,
    SlFolder,
    SlInfo
  } from "react-icons/sl";
  import { GiArchiveRegister } from "react-icons/gi";
  import {
    IconChartInfographic,
    IconVocabulary,
    IconDashboard,
    IconUsers,
    IconLogout,
    IconBuildingCommunity,
  } from "@tabler/icons";
  
  // constant
  const icons = {
    SlCalender,
    SlBadge,
    SlOrganization,
    SlGraduation,
    IconChartInfographic,
    SlBriefcase,
    IconVocabulary,
    IconUsers,
    IconLogout,
    IconBuildingCommunity,
    SlFolder,
    GiArchiveRegister,
    SlInfo
  };
  
  // ==============================|| DASHBOARD MENU ITEMS ||============================== //
  
  const dashboardLecturer = {
    id: "dashboard",
    title: "Dashboard",
    type: "group",
    children: [
      {
        id: "dashboard",
        title: "Thống kê",
        type: "item",
        url: "/dashboard",
        icon: icons.IconChartInfographic,
        breadcrumbs: false,
      },
      {
        id: "infor",
        title: "Thông tin",
        type: "item",
        url: "/infor",
        icon: icons.SlInfo,
        breadcrumbs: false,
      },
      {
        id: "curriculum",
        title: "Chương trình đào tạo",
        type: "item",
        url: "/curriculum",
        icon: icons.SlOrganization,
        breadcrumbs: false,
      },
      {
        id: "subject",
        title: "Môn phụ trách",
        type: "item",
        url: "/subject",
        icon: icons.SlBadge,
        breadcrumbs: false,
      },
    ],
  };
  
  export default dashboardLecturer;
  