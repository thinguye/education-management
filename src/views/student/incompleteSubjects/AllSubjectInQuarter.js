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
  Tooltip,
  IconButton,
  Grid,
  Button,
  Fade,
  Modal,
  Backdrop,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CustomizedTabs from "ui-component/CustomizedTabs";
import { colors } from "@mui/material";
import { Cancel, Check } from "@mui/icons-material";
import { Box } from "@mui/system";
const AllSubjectInQuarter = ({ id, code, isLoading, handleEnrollment, enrollments }) => {
  const style = {
    boxStyle: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 700,
      height: "content",
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

  const [showRegist, setShowRegist] = useState(false);
  const [enrollment, setEnrollment] = useState({
    id: code,
    subject: null,
  });
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
      name: "lecturer",
      label: "Giảng viên",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return value == null
            ? ""
            : `${value.lastName} ${value.middleName} ${value.firstName}`;
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
      name: "",
      label: "",
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <>
              <Tooltip title={"Register Subject"}>
                <IconButton
                  color="warnig"
                  onClick={(e) =>
                    handleShowRegist(enrollments[dataIndex])
                  }
                >
                  <Check />
                </IconButton>
              </Tooltip>
            </>
          );
        },
      },
    },
  ];

  const handleShowRegist = (value) => {
    setEnrollment({ ...enrollment, subject: value.id });
    setShowRegist(true);
  };
  const handleCloseRegist = () => {
    setShowRegist(false);
    setEnrollment({ ...enrollment, subject: null });
  };
  const handleRegist = () => {
    handleEnrollment(enrollment);
    handleCloseRegist();
  };

  return (
    <>
      <ThemeProvider theme={getMuiTheme2()}>
        <MUIDataTable
          data={enrollments}
          columns={columns2}
          options={options1}
        />
      </ThemeProvider>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={showRegist}
        onClose={handleCloseRegist}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={showRegist}>
          <Box sx={style.boxStyle}>
            {enrollment.subject != null && (
              <Typography style={{ fontSize: 15 }}>
                Vui lòng chọn "Xác nhận" nếu bạn muốn đăng kí môn{" "}
                {enrollment.subject.name}?
              </Typography>
            )}
            {enrollment.subject == null && (
              <Typography style={{ fontSize: 15 }}>Không có dữ liệu</Typography>
            )}
            <Grid container spacing={1} style={{ marginTop: 20 }}>
              <Grid item xs={6}>
                <div style={{ textAlign: "right" }}>
                  {enrollment != null && (
                    <Button
                      color="primary"
                      startIcon={<Check />}
                      onClick={(e) => handleRegist(enrollment)}
                    >
                      Confirm
                    </Button>
                  )}
                </div>
              </Grid>
              <Grid item xs={6}>
                <div style={{ textAlign: "left" }}>
                  <Button
                    color="error"
                    startIcon={<Cancel />}
                    onClick={handleCloseRegist}
                  >
                    Cancel
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default AllSubjectInQuarter;
