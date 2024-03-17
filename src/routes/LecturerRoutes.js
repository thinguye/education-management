import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Year from 'views/management/year';
import Generation from 'views/management/generation';
import Quarter from 'views/management/quarter';
import SubjectUI from 'views/management/subject';
import CurriculumDetails from 'views/management/cirriculum/CurriculumDetails';
import Enrollment from 'views/management/enrollment';
import Elective from 'views/management/subject/Elective';
import AuthLogin3 from "views/pages/authentication/authentication3/Login3";
import StudentResult from 'views/management/student/StudentResult';
import Certificate from 'views/management/certificate';
import SubjectInQuarter from 'views/lecturer/SubjectInQuarter';
import Dashboard from 'views/lecturer';

const Student = Loadable(lazy(()=>import('views/management/student')));
const Department = Loadable(lazy(()=>import('views/management/department')));
const Curriculum = Loadable(lazy(()=>import('views/management/cirriculum')));
const Lecturer = Loadable(lazy(()=>import('views/management/lecturer')));
// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const LecturerRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Dashboard />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: '',
                    element: <Dashboard />
                }
            ]
        },
        {
            path: 'info',
            children: [
                {
                    path: '',
                    element: <></>
                }
            ]
        },
        {
            path: 'curriculum',
            children: [
                {
                    path: '',
                    element: <Curriculum />
                }
            ]
        },
        {
            path: 'curriculum',
            children: [
                {
                    path: ":id",
                    element: <CurriculumDetails />
                }
            ]
        },
        {
            path: 'subject',
            children: [
                {
                    path: "",
                    element: <SubjectInQuarter />
                }
            ]
        },
        {
            path: 'subject',
            children: [
                {
                    path: ":id",
                    element: <Enrollment />
                }
            ]
        },
        
    ]
};

export default LecturerRoutes;
