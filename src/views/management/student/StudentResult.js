import React, { useMemo, useState, useEffect } from "react";
import Tab from "@mui/material/Tab/Tab";
import TabContext from "@mui/lab/TabContext/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel/TabPanel";
//MRT Imports
import MUIDataTable from "mui-datatables";
//Material-UI Imports
//Icons Imports
import resultApi from "../../../controller/ResultController";
import { createTheme } from "@mui/material/styles";
import studentApi from "../../../controller/StudentController";
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
import StudentIncompleteSubject from "./StudentIncompleteSubject";
import StudentCondition from "./StudentCondition";
import StudentCompletedSubject from "./StudentCompletedSubject";
const StudentResult = () => {
  // const GroupHeader = styled("div")(({ theme }) => ({
  //   position: "sticky",
  //   top: "-8px",
  //   padding: "4px 10px",
  //   color: theme.palette.primary.main,
  //   backgroundColor:
  //     theme.palette.mode === "light"
  //       ? lighten(theme.palette.primary.light, 0.85)
  //       : darken(theme.palette.primary.main, 0.8),
  // }));

  // const GroupItems = styled("ul")({
  //   padding: 0,
  // });
  const getMuiTheme = () =>
    createTheme({
      components: {
        MuiTableHead: {
          styleOverrides: {
            root: {
              display: "none",
            },
          },
        },
        MuiTableBody: {
          styleOverrides: {
            root: {
              backgroundColor: enable ? "#ede7f6" : "white",
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            paddingCheckbox: {
              display: "none",
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
      },
    });
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
  const id = useParams().id;
  const [enable, setEnable] = useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <TabContext value={value}>
          <Box>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Kết quả học tập" value={0} />
              <Tab label="Các môn chưa học" value={1} />
              <Tab label="Các môn có thể học" value={2} />
              <Tab label="Chứng chỉ bắt buộc" value={3} />
            </TabList>
          </Box>
          <Box>
            <TabPanel value={0} style={{ padding: "24px 0px" }}>
              <StudentCompletedSubject id={id} />
            </TabPanel>
            <TabPanel value={1} style={{ padding: "24px 0px" }}>
              <StudentIncompleteSubject id={id} />
            </TabPanel>
            <TabPanel value={2} style={{ padding: "24px 0px" }}>
              <StudentIncompleteSubject id={id} />
            </TabPanel>
            <TabPanel value={3} style={{ padding: "24px 0px" }}>
              <StudentCondition id={id} />
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    </>
  );
};

export default StudentResult;
