import React, { useMemo, useState, useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
//MRT Imports
import MUIDataTable from "mui-datatables";
import {
  DatePicker,
  LocalizationProvider,
  StaticDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Delete,
  Edit,
  Save,
  Cancel,
  DeleteForeverOutlined,
  Add,
  Visibility,
  Grading,
  Send,
  Assessment,
  FindInPage,
  UploadFileSharp,
} from "@mui/icons-material";
//Material-UI Imports
//Icons Imports
import subjectInQuarterApi from "controller/SubjectInQuarterController";
import subjectApi from "controller/SubjectController";
import enrollmentApi from "controller/EnrollmentController";
import lecturerApi from "controller/LecturerController";
import quarterApi from "controller/QuarterController";
import { styled, lighten, darken } from "@mui/system";
import {
  IconButton,
  Modal,
  Fade,
  Box,
  Typography,
  Backdrop,
  FormControl,
  FormGroup,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Input,
  InputAdornment,
  FormHelperText,
  Grid,
  Autocomplete,
  TextField,
  Button,
  TableCell,
  TableRow,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Tooltip,
} from "@mui/material";
import { render } from "@testing-library/react";
import { Icon } from "@mui/material";
import { useNavigate } from "react-router-dom";
const SubjectInQuarter = () => {
  const HeaderElements = () => (
    <>
      <Tooltip title="Add New">
        <IconButton
          onMouseEnter={() => setFocus(true)}
          onMouseLeave={() => setFocus(false)}
          onClick={(e) => handleShowAdd()}
        >
          <Add color={focus ? "primary" : "default"} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Import Subjects">
        <IconButton
          onMouseEnter={() => setFocus1(true)}
          onMouseLeave={() => setFocus1(false)}
          onClick={(e) => handleShowUpload()}
        >
          <UploadFileSharp color={focus1 ? "primary" : "default"} />
        </IconButton>
      </Tooltip>
    </>
  );
  const GroupHeader = styled("div")(({ theme }) => ({
    position: "sticky",
    top: "-8px",
    padding: "4px 10px",
    color: theme.palette.primary.main,
    backgroundColor:
      theme.palette.mode === "light"
        ? lighten(theme.palette.primary.light, 0.85)
        : darken(theme.palette.primary.main, 0.8),
  }));

  const GroupItems = styled("ul")({
    padding: 0,
  });
  const [enable, setEnable] = useState(false);
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
  const navigate = useNavigate();
  const id = JSON.parse(sessionStorage.getItem("obj")).id;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [quarters, setQuarters] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [focus, setFocus] = useState(false);
  const [focus1, setFocus1] = useState(false);
  const [gradeFile, setGradeFile] = useState({
    subject: "",
    file: null,
  });
  const [file, setFile] = useState(null);
  const [newSubjectInQuarter, setNewSubjectInQuarter] = useState({
    quarter: {},
    subject: {},
    lecturer: {},
    maxStudents: 0,
  });
  const [subjectInQuarter, setSubjectInQuarter] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const handleShowAdd = () => {
    setShowAdd(true);
  };
  const handleCloseAdd = () => {
    setShowAdd(false);
  };
  const handleAdd = () => {
    console.log(newSubjectInQuarter);
    subjectInQuarterApi.createSubjectInQuarter(newSubjectInQuarter);
    setShowAdd(false);
  };
  const [showUpdate, setShowUpdate] = useState(false);
  const handleShowUpdate = (value) => {
    setSubjectInQuarter(value);
    setShowUpdate(true);
  };
  const handleCloseUpdate = () => {
    setShowUpdate(false);
    setSubjectInQuarter(null);
  };
  const handleUpdate = (value) => {
    subjectInQuarterApi.updateSubjectInQuarter(value);
    handleCloseUpdate();
  };
  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = (value) => {
    setSubjectInQuarter(value);
    setShowDelete(true);
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
    setSubjectInQuarter(null);
  };
  const handleDelete = (temp) => {
    subjectInQuarterApi.deleteSubjectInQuarter(temp);
    handleCloseDelete();
  };
  const [showUploadFile, setShowUploadFile] = useState(false);
  const handleShowUploadFile = (value) => {
    setGradeFile({
      ...gradeFile,
      subject: value,
    });
    setShowUploadFile(true);
  };
  const handleCloseUploadFile = () => {
    setShowUploadFile(false);
    setGradeFile({
      subject: "",
      file: null,
    });
  };
  const handleUploadFile = () => {
    console.log(gradeFile);
    enrollmentApi.updateGradeFile(gradeFile);
    setShowUploadFile(false);
  };
  const [showUpload, setShowUpload] = useState(false);
  const handleShowUpload = () => {
    setShowUpload(true);
  };
  const handleCloseUpload = () => {
    setShowUpload(false);
    setFile(null);
  };
  const handleUpload = () => {
    subjectInQuarterApi.upload(file);
    handleCloseUpload();
  };

  const columns = [
    {
      name: "subject",
      label: "Subject",
      options: {
        sort: true,
        filter: false,
        customBodyRender: (value) => {
          return value == null ? "" : value.name;
        },
      },
    },
    {
      name: "lecturer",
      label: "Lecturer",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return `${value.lastName} ${value.middleName} ${value.firstName}`;
        },
      },
    },
    {
      name: "numberOfStudents",
      label: "No. students",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "maxStudents",
      label: "Max size",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <>
              <IconButton
                color="default"
                onClick={(e) => navigate(`/subject/${data[dataIndex].id}`)}
              >
                <Visibility />
              </IconButton>
              {/* <IconButton
                color="primary"
                onClick={(e) => handleShowUpdate(data[dataIndex])}
              >
                <Edit />
              </IconButton> */}
              <IconButton
                color="error"
                onClick={(e) => handleShowDelete(data[dataIndex])}
              >
                <Delete />
              </IconButton>
            </>
          );
        },
      },
    },
  ];
  const options = {
    filterType: "dropdown",
    selectableRows: "none",
    textLabels: {
      body: {
        noMatch: isLoading ? "Không có dữ liệu" : "Đang tải dữ liệu...",
      },
    },
    onFilterChange: (changedColumn, filterList) => {
      console.log(changedColumn, filterList);
    },
    customToolbar: () => <HeaderElements />,
    expandableRows: true,
    rowsExpanded: quarters.map((el, i) => {
      return i;
    }),
    renderExpandableRow: (dataIndex, rowIndex) => {
      setEnable(true);
      const tempPara = quarters[rowIndex.dataIndex];
      const rows = data.filter(function (subject) {
        if (subject.quarter.id === tempPara.id) {
          return subject;
        }
      });
      if (rows.length > 0) {
        return (
          <React.Fragment>
            <tr>
              <td>
                <TableContainer style={{ backgroundColor: "white !important" }}>
                  <Table style={{ minWidth: "100%" }}>
                    <TableHead
                      style={{
                        display: "table-header-group",
                        backgroundColor: "white",
                      }}
                    >
                      <TableRow>
                        <TableCell>Mã môn</TableCell>
                        <TableCell>Tên môn học</TableCell>
                        <TableCell>Giảng viên</TableCell>
                        <TableCell>Sỉ số</TableCell>
                        <TableCell>Sỉ số tối đa</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody style={{ backgroundColor: "white" }}>
                      {rows.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.subject.code}</TableCell>
                          <TableCell>{row.subject.name}</TableCell>
                          <TableCell>
                            {row.lecturer.lastName} {row.lecturer.middleName}{" "}
                            {row.lecturer.firstName}
                          </TableCell>
                          <TableCell>{row.numberOfStudents}</TableCell>
                          <TableCell>{row.maxStudents}</TableCell>
                          <TableCell>
                            <Tooltip title="View Details">
                              <IconButton
                                color="primary"
                                onClick={(e) => navigate(`/subject/${row.id}`)}
                              >
                                <FindInPage />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Input Grade">
                              <IconButton
                                color="secondary"
                                onClick={(e) => handleShowUploadFile(row.id)}
                              >
                                <Assessment />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* <MUIDataTable
                  data={rows}
                  columns={columns}
                  options={options1}
                /> */}
              </td>
            </tr>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <tr>
              <td colSpan={6}>
                <TableContainer style={{ backgroundColor: "white !important" }}>
                  <Table style={{ minWidth: "100%" }} aria-label="simple table">
                    <TableHead
                      style={{
                        display: "table-header-group",
                        backgroundColor: "white",
                      }}
                    >
                      <TableRow>
                        <TableCell>Mã môn</TableCell>
                        <TableCell>Tên môn học</TableCell>
                        <TableCell>Giảng viên</TableCell>
                        <TableCell>Sỉ số</TableCell>
                        <TableCell>Sỉ số tối đa</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody style={{ backgroundColor: "white" }}>
                      <TableRow>
                        <TableCell align="center" colSpan={6}>
                          {{ isLoading }
                            ? "Không có dữ liệu"
                            : "Đang tải dữ liệu..."}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </td>
            </tr>
          </React.Fragment>
        );
      }
    },
  };

  const columns1 = [
    {
      name: "title",
      label: "Title",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (dataIndex, rowIndex) => {
          return `${quarters[rowIndex.rowIndex].name} ${
            quarters[rowIndex.rowIndex].year.name
          }`;
        },
      },
    },
    {
      name: "name",
      label: "Quarter",
      options: {
        filter: true,
        sort: true,
        display: "none",
      },
    },
    {
      name: "year",
      label: "Year",
      options: {
        filter: true,
        sort: true,
        display: "none",
        customBodyRender: (value) => {
          return value == null ? "" : value.name;
        },
      },
    },
  ];
  const options1 = {
    filterType: "dropdown",
    selectableRows: "none",
  };

  useEffect(() => {
    subjectInQuarterApi.getByLecturer(id).then((res) => {
      setData(res);
      subjectApi.getAllSubjects().then((result1) => {
        setSubjects(result1);
      });
      lecturerApi.getAllLecturers().then((result2) => {
        setLecturers(result2);
      });
      quarterApi.getAllQuarters().then((result3) => {
        setQuarters(result3);
        setIsLoading(true);
      });
    });
  }, []);

  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
        <ThemeProvider theme={getMuiTheme()}>
          <MUIDataTable data={quarters} columns={columns1} options={options} />
        </ThemeProvider>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={showUploadFile}
          onClose={handleCloseUploadFile}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={showUploadFile}>
            <Box sx={style.boxStyle}>
              <Typography style={style.textStyle}>Update Grade</Typography>
              <FormGroup>
                <TextField
                  type="file"
                  onChange={(e) =>
                    setGradeFile({
                      ...gradeFile,
                      file: e.target.files[0],
                    })
                  }
                ></TextField>
              </FormGroup>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <div style={{ textAlign: "right" }}>
                    <Button
                      color="primary"
                      startIcon={<Send />}
                      onClick={handleUploadFile}
                    >
                      Submit
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div style={{ textAlign: "left" }}>
                    <Button
                      color="error"
                      startIcon={<Cancel />}
                      onClick={handleCloseUploadFile}
                    >
                      Cancel
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Modal>

        {/* Import file of subjects */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={showUpload}
          onClose={handleCloseUpload}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={showUpload}>
            <Box sx={style.boxStyle}>
              <Typography style={style.textStyle}>
                Import A List Of Subjects
              </Typography>
              <FormGroup>
                <TextField
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                ></TextField>
              </FormGroup>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <div style={{ textAlign: "right" }}>
                    <Button
                      color="primary"
                      startIcon={<Send />}
                      onClick={handleUpload}
                    >
                      Submit
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div style={{ textAlign: "left" }}>
                    <Button
                      color="error"
                      startIcon={<Cancel />}
                      onClick={handleCloseUpload}
                    >
                      Cancel
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
};

export default SubjectInQuarter;
