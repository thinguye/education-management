import { lazy, useEffect } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";
import Year from "views/management/year";
import Generation from "views/management/generation";
import Quarter from "views/management/quarter";
import SubjectUI from "views/management/subject";
import SubjectInQuarter from "views/management/subjectInQuarter";
import CurriculumDetails from "views/management/cirriculum/CurriculumDetails";
import Enrollment from "views/management/enrollment";
import Elective from "views/management/subject/Elective";
import AuthLogin3 from "views/pages/authentication/authentication3/Login3";
import StudentResult from "views/management/student/StudentResult";
import Certificate from "views/management/certificate";
import studentApi from "controller/StudentController";
import IncompleteSubject from "views/student/incompleteSubjects";
// import Curriculum from "views/student/curriculum";
import Result from "views/student/result";
import Roadmap from "views/student/roadmap.js";
import Information from "views/student/information";
import Dashboard from "views/student/dashboard";
import Curriculum from "views/student/curriculum";
// const Student = Loadable(lazy(() => import("views/management/student")));
// const Department = Loadable(lazy(() => import("views/management/department")));
// const Lecturer = Loadable(lazy(() => import("views/management/lecturer")));
// utilities routing
const UtilsTypography = Loadable(
  lazy(() => import("views/utilities/Typography"))
);
const UtilsColor = Loadable(lazy(() => import("views/utilities/Color")));
const UtilsShadow = Loadable(lazy(() => import("views/utilities/Shadow")));
const UtilsMaterialIcons = Loadable(
  lazy(() => import("views/utilities/MaterialIcons"))
);
const UtilsTablerIcons = Loadable(
  lazy(() => import("views/utilities/TablerIcons"))
);

// sample page routing
const SamplePage = Loadable(lazy(() => import("views/sample-page")));

// ==============================|| MAIN ROUTING ||============================== //
const StudentRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "dashboard",
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
      ],
    },
    {
      path: "curriculum",
      children: [
        {
          path: "",
          element: <Curriculum/>,
        },
      ],
    },
    {
      path: "infor",
      children: [
        {
          path: "",
          element: <Information/>,
        },
      ],
    },
    {
      path: "result",
      children: [
        {
          path: "",
          element: <Result/>,
        },
      ],
    },
    {
      path: "incomplete-subjects",
      children: [
        {
          path: "",
          element: <IncompleteSubject/>,
        },
      ],
    },
    {
      path: "roadmap",
      children: [
        {
          path: "",
          element: <Roadmap/>,
        },
      ],
    },
  ],
};

export default StudentRoutes;
