// assets
import {
  SlGraduation,
  SlBadge,
  SlBriefcase,
  SlOrganization,
  SlCalender,
  SlFolder,
  SlBook
} from "react-icons/sl";
import { GiArchiveRegister } from "react-icons/gi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { PiChalkboardTeacher } from "react-icons/pi";
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
  LiaChalkboardTeacherSolid,
  PiChalkboardTeacher
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
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
      id: "management",
      title: "Quản lý",
      type: "collapse",
      isOpen: true,
      icon: icons.IconVocabulary,
      children: [
        {
          id: "management-student",
          title: "Sinh viên",
          type: "item",
          url: "/student",
          icon: icons.IconUsers,
          breadcrumbs: false,
        },
        {
          id: "management-lecturer",
          title: "Giảng viên",
          type: "item",
          url: "/lecturer",
          icon: icons.PiChalkboardTeacher,
          breadcrumbs: false,
        },
        {
          id: "management-curriculum",
          title: "Chương trình đào tạo",
          url: "/curriculum",
          icon: icons.SlOrganization,
          breadcrumbs: false,
          type: "item",
        },
        {
          id: "management-subject-in-quarter",
          title: "Môn theo học kì",
          type: "item",
          url: "/course-enrollment",
          icon: icons.SlGraduation,
          breadcrumbs: false,
        },
        {
          id: "management-certificate",
          title: "Chứng chỉ",
          type: "item",
          url: "/certificate",
          icon: icons.SlBadge,
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "component",
      title: "Thành phần",
      type: "collapse",
      icon: icons.SlFolder,
      children: [
        {
          id: "component-year",
          title: "Năm học",
          type: "item",
          url: "/year",
          icon: icons.SlCalender,
          breadcrumbs: false,
        },
        {
          id: "component-generation",
          title: "Khóa học",
          type: "item",
          url: "/generation",
          icon: icons.SlFolder,
          breadcrumbs: false,
        },
        // {
        //   id: "component-quarter",
        //   title: "Quarter",
        //   type: "item",
        //   url: "/quarter",
        //   icon: icons.SlCalender,
        //   breadcrumbs: false,
        // },
        {
          id: "component-organization",
          title: "Khoa/Ngành",
          type: "item",
          url: "/organization",
          icon: icons.IconBuildingCommunity,
          breadcrumbs: false,
        },
        {
          id: "component-subject",
          title: "Môn học",
          type: "item",
          url: "/subject",
          icon: icons.SlBriefcase,
          breadcrumbs: false,
        },
      ],
    },
  ],
};

export default dashboard;
