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
// constant

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const management = {
    id: "management",
    title: "Management",
    type: "group",
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
};

export default management;
