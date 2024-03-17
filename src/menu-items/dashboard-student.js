// assets
import {
    SlGraduation,
    SlBadge,
    SlBriefcase,
    SlOrganization,
    SlCalender,
    SlFolder,
    SlInfo,
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
  
  const dashboardStudent = {
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
        id:"result",
        title:"Kết quả học tập",
        type:"item",
        url: "/result",
        icon: icons.SlGraduation,
        breadcrumbs: false,
      },
      {
        id:"incomplete-subjects",
        title:"Các môn chưa học",
        type:"item",
        url: "/incomplete-subjects",
        icon: icons.SlGraduation,
        breadcrumbs: false,
      },
      {
        id:"roadmap",
        title:"Lộ trình học",
        type:"item",
        url: "/roadmap",
        icon: icons.SlGraduation,
        breadcrumbs: false,
      }
    ],
  };
  
  export default dashboardStudent;
  