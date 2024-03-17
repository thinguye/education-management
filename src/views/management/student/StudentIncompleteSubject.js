import React, { useMemo, useState, useEffect } from "react";

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
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CustomizedTabs from "ui-component/CustomizedTabs";
import { colors } from "@mui/material";
const StudentIncompleteSubject = ({ id }) => {
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

  const [isLoading, setIsLoading] = useState(false);
  const [incompleteSubjects, setIncompleteSubjects] = useState([]);
  const options1 = {
    filter: true,
    selectableRows: "none",
    filterType: "dropdown",
    textLabels: {
      body: {
        noMatch: isLoading ? "Không có dữ liệu" : "Đang tải dữ liệu...",
      },
    },
  };
  const columns2 = [
    {
      name: "code",
      label: "Mã môn",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "subject",
      label: "Môn học",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return value == null ? "" : value.name;
        },
      },
    },
    {
      name: "subject",
      label: "Số tín chỉ",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return value == null ? "" : `${value.theoryCredit + value.labCredit}`;
        },
      },
    },
    {
      name: "mandatory",
      label: "Phân loại",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return value == null
            ? ""
            : value === "COMPULSORY"
            ? "Bắt buộc"
            : "Tự chọn";
        },
      },
    },
  ];

  useEffect(() => {
    studentApi.getIncompleteSubjects(id).then((res1) => {
      setIncompleteSubjects(res1);
      setIsLoading(true);
    });
  }, []);

  return (
    <>
      <div style={{ height: "auto", width: "100%" }}>
        <ThemeProvider theme={getMuiTheme2()}>
          <MUIDataTable
            data={incompleteSubjects}
            columns={columns2}
            options={options1}
          />
        </ThemeProvider>
      </div>
    </>
  );
};

export default StudentIncompleteSubject;
