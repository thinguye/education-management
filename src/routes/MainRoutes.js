import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Year from 'views/management/year';
import Generation from 'views/management/generation';
import Quarter from 'views/management/quarter';
import SubjectUI from 'views/management/subject';
import SubjectInQuarter from 'views/management/subjectInQuarter';
import CurriculumDetails from 'views/management/cirriculum/CurriculumDetails';
import Enrollment from 'views/management/enrollment';
import Elective from 'views/management/subject/Elective';
import AuthLogin3 from "views/pages/authentication/authentication3/Login3";
import StudentResult from 'views/management/student/StudentResult';
import Certificate from 'views/management/certificate';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
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

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: '',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-typography',
                    element: <UtilsTypography />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-color',
                    element: <UtilsColor />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-shadow',
                    element: <UtilsShadow />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'tabler-icons',
                    element: <UtilsTablerIcons />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'material-icons',
                    element: <UtilsMaterialIcons />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'student',
            children: [
                {
                    path: '',
                    element: <Student />
                }
            ]
        },
        {
            path: 'student',
            children: [
                {
                    path: ':id',
                    element: <StudentResult />
                }
            ]
        },
        {
            path: 'subject',
            children: [
                {
                    path: '',
                    element: <SubjectUI />
                }
            ]
        },
        {
            path: 'organization',
            children: [
                {
                    path: '',
                    element: <Department />
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
            path: 'lecturer',
            children: [
                {
                    path: '',
                    element: <Lecturer />
                }
            ]
        },
        {
            path: 'year',
            element: <Year />,
        },
        {
            path: 'year',
            children: [
                {
                    path: ':id',
                    element: <Quarter />
                }
            ]
        },
        {
            path: 'generation',
            children: [
                {
                    path: '',
                    element: <Generation />
                }
            ]
        },

        {
            path: 'course-enrollment',
            children: [
                {
                    path: '',
                    element: <SubjectInQuarter />
                }
            ]
        },
        {
            path: 'course-enrollment',
            children: [
                {
                    path: ':id',
                    element: <Enrollment />
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
                    path: "id",
                    element: <Elective />
                }
            ]
        },
        {
            path: 'certificate',
            children: [
                {
                    path:'',
                    element: <Certificate />
                }
            ]
        },
        
    ]
};

export default MainRoutes;
