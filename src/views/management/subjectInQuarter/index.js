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
} from "@mui/icons-material";
//Material-UI Imports
//Icons Imports
import subjectInQuarterApi from "../../../controller/SubjectInQuarterController";
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
  const [data, setData] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [quarters, setQuarters] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [focus, setFocus] = useState(false);
  const [gradeFile, setGradeFile] = useState({
    subject: "",
    file: null,
  });
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
      id: value,
    });
    setShowUploadFile(true);
  };
  const handleCloseUploadFile = () => {
    setShowUploadFile(false);
    setGradeFile({
      id: "",
      file: null,
    });
  };
  const handleUploadFile = () => {
    console.log(gradeFile);
    enrollmentApi.updateGradeFile(gradeFile);
    setShowUploadFile(false);
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
                onClick={(e) =>
                  navigate(`/course-enrollment/${data[dataIndex].id}`)
                }
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
                        <TableCell>Code</TableCell>
                        <TableCell>Subject</TableCell>
                        <TableCell>Lecturer</TableCell>
                        <TableCell>N.o students</TableCell>
                        <TableCell>Max size</TableCell>
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
                                onClick={(e) =>
                                  navigate(`/course-enrollment/${row.id}`)
                                }
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
                            {/* <IconButton
                color="primary"
                onClick={(e) => handleShowUpdate(data[dataIndex])}
              >
                <Edit />
              </IconButton> */}
                            <Tooltip title="Delete">
                              <IconButton
                                color="error"
                                onClick={(e) => handleShowDelete(row)}
                              >
                                <Delete />
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
                        <TableCell>Code</TableCell>
                        <TableCell>Subject</TableCell>
                        <TableCell>Lecturer</TableCell>
                        <TableCell>N.o students</TableCell>
                        <TableCell>Max size</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody style={{ backgroundColor: "white" }}>
                      <TableRow>
                        <TableCell align="center" colSpan={6}>
                          Sorry, no matching records found
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
    subjectInQuarterApi.getAllSubjectInQuarters().then((res) => {
      setData(res);
      subjectApi.getAllSubjects().then((result1) => {
        setSubjects(result1);
      });
      lecturerApi.getAllLecturers().then((result2) => {
        setLecturers(result2);
      });
      quarterApi.getAllQuarters().then((result3) => {
        setQuarters(result3);
      });
    });
  }, []);

  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
        <ThemeProvider id="theme2" theme={getMuiTheme()}>
          <MUIDataTable data={quarters} columns={columns1} options={options} />
        </ThemeProvider>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={showAdd}
          onClose={handleCloseAdd}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={showAdd}>
            <Box sx={style.boxStyle}>
              <Typography style={style.textStyle}>
                Add New SubjectInQuarter
              </Typography>
              <FormGroup>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={8}>
                    <FormControl>
                      <Autocomplete
                        id="quarter"
                        sx={{ width: 300 }}
                        options={quarters}
                        autoHighlight
                        onChange={(e, newValue) =>
                          setNewSubjectInQuarter({
                            ...newSubjectInQuarter,
                            quarter: newValue,
                          })
                        }
                        getOptionLabel={(option) =>
                          `${option.name} ${option.year.name}`
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            inputProps={{
                              ...params.inputProps,
                            }}
                          />
                        )}
                      />
                      <FormLabel id="quarter" style={style.formStyle}>
                        Quarter
                      </FormLabel>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <FormControl>
                      <Autocomplete
                        id="subject"
                        sx={{ width: 300 }}
                        options={subjects}
                        autoHighlight
                        onChange={(e, newValue) =>
                          setNewSubjectInQuarter({
                            ...newSubjectInQuarter,
                            subject: newValue,
                          })
                        }
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            inputProps={{
                              ...params.inputProps,
                            }}
                          />
                        )}
                      />
                      <FormLabel id="subject" style={style.formStyle}>
                        Subject
                      </FormLabel>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <FormControl>
                      <Autocomplete
                        id="lecturer"
                        sx={{ width: 300 }}
                        options={lecturers}
                        autoHighlight
                        onChange={(e, newValue) =>
                          setNewSubjectInQuarter({
                            ...newSubjectInQuarter,
                            lecturer: newValue,
                          })
                        }
                        getOptionLabel={(option) =>
                          `${option.lastName} ${option.middleName} ${option.firstName}`
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            inputProps={{
                              ...params.inputProps,
                            }}
                          />
                        )}
                      />
                      <FormLabel id="lecturer" style={style.formStyle}>
                        Lecturer
                      </FormLabel>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <FormControl>
                      <TextField
                        type="number"
                        id="maxStudents"
                        sx={{ width: 300 }}
                        onChange={(e) =>
                          setNewSubjectInQuarter({
                            ...newSubjectInQuarter,
                            maxStudents: e.target.value,
                          })
                        }
                      />
                      <FormLabel id="maxStudents" style={style.formStyle}>
                        Quantity limit
                      </FormLabel>
                    </FormControl>
                  </Grid>
                </Grid>
              </FormGroup>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <div style={{ textAlign: "right" }}>
                    <Button
                      color="primary"
                      startIcon={<Save />}
                      onClick={handleAdd}
                    >
                      Save
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div style={{ textAlign: "left" }}>
                    <Button
                      color="error"
                      startIcon={<Cancel />}
                      onClick={handleCloseAdd}
                    >
                      Cancel
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Modal>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={showUpdate}
          onClose={handleCloseUpdate}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={showUpdate}>
            <Box sx={style.boxStyle}>
              <Typography style={style.textStyle}>
                Update SubjectInQuarter Profile
              </Typography>
              {subjectInQuarter != null && (
                <FormGroup>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={8}>
                      <FormControl>
                        <Autocomplete
                          id="quarter"
                          sx={{ width: 300 }}
                          options={quarters}
                          value={subjectInQuarter.quarter}
                          autoHighlight
                          onChange={(e, newValue) =>
                            setSubjectInQuarter({
                              ...subjectInQuarter,
                              quarter: newValue,
                            })
                          }
                          getOptionLabel={(option) =>
                            `${option.name} ${option.year.name}`
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              inputProps={{
                                ...params.inputProps,
                              }}
                            />
                          )}
                        />
                        <FormLabel id="quarter" style={style.formStyle}>
                          Quarter
                        </FormLabel>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <FormControl>
                        <Autocomplete
                          id="subject"
                          sx={{ width: 300 }}
                          options={subjects}
                          value={subjectInQuarter.subject}
                          autoHighlight
                          onChange={(e, newValue) =>
                            setSubjectInQuarter({
                              ...subjectInQuarter,
                              subject: newValue,
                            })
                          }
                          getOptionLabel={(option) => option.name}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              inputProps={{
                                ...params.inputProps,
                              }}
                            />
                          )}
                        />
                        <FormLabel id="subject" style={style.formStyle}>
                          Subject
                        </FormLabel>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <FormControl>
                        <Autocomplete
                          id="lecturer"
                          sx={{ width: 300 }}
                          options={lecturers}
                          value={subjectInQuarter.lecturer}
                          autoHighlight
                          onChange={(e, newValue) =>
                            setSubjectInQuarter({
                              ...subjectInQuarter,
                              lecturer: newValue,
                            })
                          }
                          getOptionLabel={(option) =>
                            `${option.lastName} ${option.middleName} ${option.firstName}`
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              inputProps={{
                                ...params.inputProps,
                              }}
                            />
                          )}
                        />
                        <FormLabel id="lecturer" style={style.formStyle}>
                          Lecturer
                        </FormLabel>
                      </FormControl>
                    </Grid>
                  </Grid>
                </FormGroup>
              )}
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <div style={{ textAlign: "right" }}>
                    <Button
                      color="primary"
                      startIcon={<Save />}
                      onClick={(e) => handleUpdate(newSubjectInQuarter)}
                    >
                      Save
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div style={{ textAlign: "left" }}>
                    <Button
                      color="error"
                      startIcon={<Cancel />}
                      onClick={handleCloseUpdate}
                    >
                      Cancel
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Modal>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={showDelete}
          onClose={handleCloseDelete}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={showDelete}>
            <Box sx={style.boxStyle}>
              {subjectInQuarter != null && (
                <Typography style={{ fontSize: 15 }}>
                  Do you want to delete {subjectInQuarter.name}?
                </Typography>
              )}
              {subjectInQuarter == null && (
                <Typography style={{ fontSize: 15 }}>
                  The subjectInQuarter you choose is undefined. Please check
                  again!
                </Typography>
              )}
              <Grid container spacing={1} style={{ marginTop: 20 }}>
                <Grid item xs={6}>
                  <div style={{ textAlign: "right" }}>
                    {subjectInQuarter != null && (
                      <Button
                        color="primary"
                        startIcon={<Delete />}
                        onClick={(e) => handleDelete(subjectInQuarter.id)}
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
                      onClick={handleCloseDelete}
                    >
                      Cancel
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Modal>
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
      </div>
    </>
  );
};

export default SubjectInQuarter;
