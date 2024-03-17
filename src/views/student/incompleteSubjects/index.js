import React, { useMemo, useState, useEffect } from "react";
import Tab from "@mui/material/Tab/Tab";
import TabContext from "@mui/lab/TabContext/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel/TabPanel";
//MRT Imports
import MUIDataTable from "mui-datatables";
//Material-UI Imports
//Icons Imports
import { createTheme } from "@mui/material/styles";
import studentApi from "controller/StudentController";
import enrollmentApi from "controller/EnrollmentController";
import resultApi from "controller/ResultController";
import { useParams } from "react-router-dom";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
  Typography,
  Box,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CustomizedTabs from "ui-component/CustomizedTabs";
import { colors } from "@mui/material";
import CompulsorySubject from "./CompulsorySubject";
import CanLearnSubject from "./CanLearnSubject";
import AllSubjectInQuarter from "./AllSubjectInQuarter";
import { setLocale } from "yup";
const IncompleteSubject = () => {
  const getMuiTheme2 = () =>
    createTheme({
      components: {
        MuiTableHead: {
          styleOverrides: {
            root: {
              backgroundColor: "#000 !important",
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: "12px",
            },
          },
        },
        MuiToolbar: {
          styleOverrides: {
            root: {
              paddingLeft: "15px !important",
            },
          },
        },
      },
      class: {
        MUIDataTableToolbar: {
          titleText: {
            colors: "#ede7f6",
          },
        },
      },
    });
  const style = {
    boxStyle: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 700,
      bgcolor: "background.paper",
      border: "none",
      borderRadius: "12px",
      boxShadow: 24,
      p: 4,
    },
    formStyle: {
      marginTop: 2,
      marginBottom: 10,
    },
    textStyle: {
      fontSize: 20,
      marginBottom: 10,
    },
  };
  const id = JSON.parse(sessionStorage.getItem("obj")).id;
  const code = JSON.parse(sessionStorage.getItem("obj")).code;
  const [incompleteSubjects, setIncompleteSubjects] = useState([]);
  const [subjectsCanLearn, setSubjectsCanLearn] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [value, setValue] = React.useState(0);

  const handleEnrollment = (temp) => {
    enrollmentApi.createEnrollment(temp);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    resultApi.getSubjectInLastQuarterByStudent(id).then((res) => {
      studentApi.getIncompleteSubjects(id).then((res1) => {
        setIncompleteSubjects(res1);
        setIsLoading(true)
      });
      studentApi.getCanLearnSubjects(id).then((res2) => {
        setSubjectsCanLearn(res2);
      });
      setEnrollments(res);
    });
  }, []);
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <TabContext value={value}>
          <Box>
            <TabList onChange={handleChange}>
              <Tab label="Các môn đã đăng kí" value={0} />
              <Tab label="Các môn cần học" value={1} />
              <Tab label="Các môn có thể học" value={2} />
            </TabList>
          </Box>
          <Box>
          <TabPanel value={0} style={{ padding: "24px 0px" }}>
              <AllSubjectInQuarter
                id={id}
                isLoading={isLoading}
                code={code}
                handleEnrollment={handleEnrollment}
                enrollments={enrollments}
              />
            </TabPanel>
            <TabPanel value={1} style={{ padding: "24px 0px" }}>
              <CompulsorySubject
                id={id}
                isLoading={isLoading}
                code={code}
                handleEnrollment={handleEnrollment}
                incompleteSubjects={incompleteSubjects}
              />
            </TabPanel>
            <TabPanel value={2} style={{ padding: "24px 0px" }}>
            <CompulsorySubject
                id={id}
                isLoading={isLoading}
                code={code}
                handleEnrollment={handleEnrollment}
                incompleteSubjects={subjectsCanLearn}
              />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </>
  );
};

export default IncompleteSubject;
