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
      title: "Dashboard",
      type: "item",
      url: "/dashboard",
      icon: icons.IconChartInfographic,
      breadcrumbs: false,
    },
    {
      id: "management",
      title: "Management",
      type: "collapse",
      icon: icons.IconVocabulary,
      children: [
        {
          id: "management-student",
          title: "Student",
          type: "item",
          url: "/student",
          icon: icons.IconUsers,
          breadcrumbs: false,
        },
        {
          id: "management-lecturer",
          title: "Lecturer",
          type: "item",
          url: "/lecturer",
          icon: icons.PiChalkboardTeacher,
          breadcrumbs: false,
        },
        {
          id: "management-curriculum",
          title: "Curriculum",
          url: "/curriculum",
          icon: icons.SlOrganization,
          breadcrumbs: false,
          type: "item",
        },
        {
          id: "management-subject-in-quarter",
          title: "Course Enrollment",
          type: "item",
          url: "/course-enrollment",
          icon: icons.SlGraduation,
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "component",
      title: "Component",
      type: "collapse",
      icon: icons.SlFolder,
      children: [
        {
          id: "component-year",
          title: "Academic Year",
          type: "item",
          url: "/year",
          icon: icons.SlCalender,
          breadcrumbs: false,
        },
        {
          id: "component-generation",
          title: "Generation",
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
          title: "School/Department",
          type: "item",
          url: "/organization",
          icon: icons.IconBuildingCommunity,
          breadcrumbs: false,
        },
        {
          id: "component-subject",
          title: "Subject",
          type: "item",
          url: "/subject",
          icon: icons.SlBook,
          breadcrumbs: false,
        },
      ],
    },
  ],
};

export default dashboard;
