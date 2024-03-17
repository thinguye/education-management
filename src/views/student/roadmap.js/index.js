import React, { useMemo, useState, useEffect } from "react";
import Tab from "@mui/material/Tab/Tab";
import TabContext from "@mui/lab/TabContext/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel/TabPanel";
//MRT Imports
import MUIDataTable from "mui-datatables";
//Material-UI Imports
//Icons Imports
import uploadApi from "controller/UploadController";
import { createTheme } from "@mui/material/styles";
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
const Roadmap = ({ id }) => {
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
  const fileName = JSON.parse(sessionStorage.getItem("obj")).curriculum
    .pathImage;
  return (
    <>
      <div borderRadius="12px" width="100%">
        <img
          width="100%"
          src={
            fileName == null ? "" : require(`../../../curriculum/${fileName}`)
          }
          alt={
            fileName == null ? "Lộ trình chưa được cập nhật" : "Lộ trình học"
          }
          loading="lazy"
        />
      </div>
    </>
  );
};

export default Roadmap;
