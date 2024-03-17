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
const CanLearnSubject = ({id, code, isLoading, handleEnrollment,incompleteSubjects}) => {
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
      name: "subject",
      label: "Mã môn",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return value == null ? "" : value.code;
        },
      },
    },
    {
      name: "subject",
      label: "Môn học",
      options: {
        filter: false,
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
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return value == null ? "" : value.theoryCredit + value.labCredit;
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

  return (
    <>
      <ThemeProvider theme={getMuiTheme2()}>
        <MUIDataTable
          data={incompleteSubjects}
          columns={columns2}
          options={options1}
        />
      </ThemeProvider>
    </>
  );
};

export default CanLearnSubject;
