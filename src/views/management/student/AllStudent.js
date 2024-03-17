import React, { useMemo, useState, useEffect } from "react";

//MRT Imports
import MUIDataTable from "mui-datatables";
import {
  Delete,
  Edit,
  Save,
  Cancel,
  Visibility,
  DeleteForeverOutlined,
  Add,
  PlaylistAddCheck,
  AssignmentTurnedIn,
  EditNotifications,
  Stop,
  DisabledByDefault,
  UploadFile,
  UploadFileSharp,
  Send,
} from "@mui/icons-material";
//Material-UI Imports
//Icons Imports
import majorApi from "../../../controller/MajorController";
import studentApi from "../../../controller/StudentController";
import generationApi from "../../../controller/GenerationController";
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
  Tooltip,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { render } from "@testing-library/react";
import { Link, useNavigate } from "react-router-dom";
const AllStudent = () => {
  const HeaderElements = () => (
    <>
      <Tooltip title="Add New Student">
        <IconButton
          onMouseEnter={() => setFocus(true)}
          onMouseLeave={() => setFocus(false)}
          onClick={(e) => handleShowAdd()}
        >
          <Add color={focus ? "primary" : "default"} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Import List Of Students">
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
  const [focus, setFocus] = useState(false);
  const [focus1, setFocus1] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [file, setFile] = useState(null);
  const [newStudent, setNewStudent] = useState({
    code: "",
    lastName: "",
    middleName: "",
    firstName: "",
    email: "",
    gender: "",
    department: {},
    generation: {},
    dateOfBirth: new Date(),
  });
  const [student, setStudent] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const handleShowAdd = () => {
    setShowAdd(true);
  };
  const handleCloseAdd = () => {
    setShowAdd(false);
  };
  const handleAdd = () => {
    console.log(newStudent);
    studentApi.createStudent(newStudent);
    setShowAdd(false);
  };
  const [showUpdate, setShowUpdate] = useState(false);
  const [value, setValue] = useState(null);
  const handleShowUpdate = (value) => {
    const temp = {
      id: value.id,
      code: value.code,
      lastName: value.lastName,
      middleName: value.middleName,
      firstName: value.firstName,
      email: value.email,
      gender: value.gender,
      department: value.curriculum != null ? value.curriculum.organization : {},
      generation: value.generation,
      dateOfBirth: value.dateOfBirth,
    };
    setStudent(temp);
    setShowUpdate(true);
  };
  const handleCloseUpdate = () => {
    setShowUpdate(false);
    setStudent(null);
  };
  const handleUpdate = () => {
    studentApi.updateStudent(student);
    handleCloseUpdate();
  };
  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = (value) => {
    setStudent(value);
    setShowDelete(true);
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
    setStudent(null);
  };
  const handleDelete = (temp) => {
    studentApi.deleteStudent(temp);
    handleCloseDelete();
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
    studentApi.upload(file).then(() => {
      handleCloseUpload();
    });
  };

  const [showLeaved, setShowLeaved] = useState(false);
  const handleShowLeaved = (value) => {
    setStudent(value);
    setShowLeaved(true);
  };
  const handleCloseLeaved = () => {
    setShowLeaved(false);
    setStudent(null);
  };
  const handleLeaved = () => {
    studentApi.setAsLeaved(student.id);
    handleCloseLeaved();
  };
  const columns = [
    {
      name: "code",
      label: "Mã số",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "firstname",
      label: "Họ và tên",
      options: {
        filter: false,
        sort: true,
        // customBodyRender: (dataIndex, rowIndex) => {
        //   return <Typography>
        //     {data[rowIndex.rowIndex].lastName}{" "}
        //     {data[rowIndex.rowIndex].middleName}{" "}
        //     {data[rowIndex.rowIndex].firstName}
        //   </Typography>;
        // },
        customBodyRender: (value, meta) => {
          const record = data[meta.currentTableData[meta.rowIndex].index];
          return `${record.lastName} ${record.middleName} ${record.firstName}`;
        },
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "gpa",
      label: "GPA",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return value == null ? "" : value.toFixed(2);
        },
        // customFilterListOptions: {
        //   render: (val) => {
        //     if (val < 2.0) {
        //       return "Thấp hơn 2.00";
        //     } else if (val >= 2.0 && val < 3.2) {
        //       return "Từ 2.00 đến 3.20";
        //     } else if (val >= 3.2 && val < 3.6) {
        //       return "Từ 3.20 đến 3.60";
        //     } else if (val >= 3.6) {
        //       return "Từ 3.60 trở lên";
        //     } else return "(empty)";
        //   },
        // },
        filterOptions: {
          names: [
            "Thấp hơn 2.00",
            "Từ 2.00 đến 3.20",
            "Từ 3.20 đến 3.60",
            "Từ 3.60 trở lên",
          ],
          logic(value, filterVal) {
            const show =
              (filterVal.indexOf("Thấp hơn 2.00") >= 0 && value < 2.0) ||
              (filterVal.indexOf("Từ 2.00 đến 3.20") >= 0 &&
                value >= 2.0 &&
                value < 3.2) ||
              (filterVal.indexOf("Từ 3.20 đến 3.60") >= 0 &&
                value >= 3.2 &&
                value < 3.6) ||
              (filterVal.indexOf("Từ 3.60 trở lên") >= 0 && value >= 3.6);
            return !show;
          },
        },
      },
    },
    {
      name: "credit",
      label: "Số tín chỉ",
      options: {
        filter: true,
        sort: true,
        filterOptions: {
          names: [
            "Ít hơn 100",
            "Từ 100 đến 150",
            "Từ 150 trở lên",
          ],
          logic(value, filterVal) {
            const show =
              (filterVal.indexOf("Ít hơn 100") >= 0 && value < 100) ||
              (filterVal.indexOf("Từ 100 đến 150") >= 0 &&
                value >= 100 &&
                value < 150) ||
              (filterVal.indexOf("Từ 150 trở lên") >= 0 &&
                value >= 150)
            return !show;
          },
        },
      },
    },
    {
      name: "",
      label: "",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <>
              <Tooltip title={'Tick for "Leaved"'}>
                <IconButton
                  color="warnig"
                  onClick={(e) => handleShowLeaved(data[dataIndex])}
                >
                  <DisabledByDefault />
                </IconButton>
              </Tooltip>
              <Tooltip title="View Result">
                <IconButton
                  color="primary"
                  onClick={(e) => navigate(`/student/${data[dataIndex].id}`)}
                >
                  <AssignmentTurnedIn />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit Information">
                <IconButton
                  color="secondary"
                  onClick={(e) => handleShowUpdate(data[dataIndex])}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  color="error"
                  onClick={(e) => handleShowDelete(data[dataIndex])}
                >
                  <Delete />
                </IconButton>
              </Tooltip>

              {/* <IconButton
                color="default"
                onClick={(e) => handleShowUpdate(data[dataIndex])}
              >
                <Visibility />
              </IconButton> */}
            </>
          );
        },
      },
    },
    {
      name: "generation",
      label: "Khóa",
      options: {
        display: false,
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value) => {
          return value == null ? "" : value.name;
        },
      },
    },
    {
      name: "curriculum",
      label: "Chuyên ngành",
      options: {
        display: "excluded",
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value) => {
          return value == null ? "" : value.organization.name;
        },
      },
    },
    {
      name: "status",
      label: "Trạng thái",
      options: {
        display: false,
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value) => {
          return value == null
            ? ""
            : value == "LEAVED"
            ? "Bỏ học"
            : value == "GRADUATED"
            ? "Đã tốt nghiệp"
            : value == "COMPLETED"
            ? "Đã hoàn thành"
            : "Đang theo học";
        },
      },
    },
  ];

  const options = {
    filterType: "dropdown",
    selectableRows: "none",
    viewColumns:false,
    download:false,
    customToolbar: () => <HeaderElements />,
  };

  useEffect(() => {
    studentApi.getAllStudents().then((res) => {
      setData(res);
      majorApi.getAllMajors().then((res1) => {
        setDepartments(res1);
      });
      generationApi.getAllGenerations().then((res2) => {
        setGenerations(res2);
      });
    });
  }, []);

  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
        <MUIDataTable data={data} columns={columns} options={options} />
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
                Thêm sinh viên mới
              </Typography>
              <FormGroup>
                <Grid id="name" container spacing={2}>
                  <Grid item xs={12} sm={4} md={4}>
                    <FormControl>
                      <Input
                        id="lastName"
                        aria-describedby="lastName"
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            lastName: e.target.value,
                          })
                        }
                        required
                      />
                      <FormLabel id="lastName" style={style.formStyle}>
                        Họ
                      </FormLabel>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <FormControl>
                      <Input
                        id="middleName"
                        aria-describedby="middleName"
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            middleName: e.target.value,
                          })
                        }
                        required
                      />
                      <FormLabel id="middleName" style={style.formStyle}>
                        Tên đệm
                      </FormLabel>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <FormControl>
                      <Input
                        id="firstName"
                        aria-describedby="firstName"
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            firstName: e.target.value,
                          })
                        }
                        required
                      />
                      <FormLabel id="firstName" style={style.formStyle}>
                        Tên
                      </FormLabel>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid id="basic-infor" container spacing={2}>
                  <Grid item xs={12} sm={4} md={4}>
                    <FormControl>
                      <Input
                        id="code"
                        aria-describedby="code"
                        onChange={(e) =>
                          setNewStudent({ ...newStudent, code: e.target.value })
                        }
                      />
                      <FormLabel id="code" style={style.formStyle}>
                        Mã số SV
                      </FormLabel>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <FormControl>
                      <Input
                        id="email"
                        aria-describedby="email"
                        onChange={(e) =>
                          setNewStudent({
                            ...newStudent,
                            email: e.target.value,
                          })
                        }
                      />
                      <FormLabel id="email" style={style.formStyle}>
                        Email
                      </FormLabel>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={newStudent.dateOfBirth}
                        renderInput={(props) => <TextField {...props} />}
                        onChange={(newValue) =>
                          setNewStudent({
                            ...newStudent,
                            dateOfBirth: newValue,
                          })
                        }
                      />
                    </LocalizationProvider>
                    <FormLabel id="dateOfBirth" style={style.formStyle}>
                      Ngày sinh
                    </FormLabel>
                  </Grid>
                </Grid>
                <Grid id="basic-infor2" container spacing={2}>
                  <Grid item xs={12} sm={4} md={4}>
                    <FormControl>
                      <Autocomplete
                        id="department"
                        sx={{ width: 300 }}
                        options={departments}
                        onChange={(e, newValue) => {
                          console.log(newValue);
                          setNewStudent({
                            ...newStudent,
                            department: newValue,
                          });
                        }}
                        autoHighlight
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
                      <FormLabel id="department" style={style.formStyle}>
                        Chuyên ngành
                      </FormLabel>
                    </FormControl>
                    <FormControl>
                      <Autocomplete
                        id="generation"
                        sx={{ width: 300 }}
                        options={generations}
                        onChange={(e, newValue) =>
                          setNewStudent({
                            ...newStudent,
                            generation: newValue,
                          })
                        }
                        autoHighlight
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
                      <FormLabel id="generation" style={style.formStyle}>
                        Khóa
                      </FormLabel>
                    </FormControl>
                  </Grid>
                </Grid>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="gender"
                    name="row-radio-buttons-group"
                    onChange={(e, newValue) =>
                      setNewStudent({ ...newStudent, gender: newValue })
                    }
                    style={{ paddingBottom: 0, marginBottom: 0 }}
                  >
                    <FormControlLabel
                      value="FEMALE"
                      control={<Radio />}
                      label="Female"
                      style={{ paddingBottom: 0, marginBottom: 0 }}
                    />
                    <FormControlLabel
                      value="MALE"
                      control={<Radio />}
                      label="Male"
                      style={{ paddingBottom: 0, marginBottom: 0 }}
                    />
                    <FormControlLabel
                      value="OTHER"
                      control={<Radio />}
                      label="Other"
                      style={{ paddingBottom: 0, marginBottom: 0 }}
                    />
                  </RadioGroup>
                  <FormLabel id="gender" style={style.formStyle}>
                    Giới tính
                  </FormLabel>
                </FormControl>
              </FormGroup>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <div style={{ textAlign: "right" }}>
                    <Button
                      color="primary"
                      startIcon={<Save />}
                      onClick={handleAdd}
                    >
                      Lưu
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
                      Thoát
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
                Update Student Profile
              </Typography>
              {student != null && (
                <FormGroup>
                  <Grid id="name" container spacing={2}>
                    <Grid item xs={12} sm={4} md={4}>
                      <FormControl>
                        <Input
                          id="lastName"
                          value={student.lastName}
                          aria-describedby="lastName"
                          onChange={(e) =>
                            setStudent({
                              ...student,
                              lastName: e.target.value,
                            })
                          }
                          required
                        />
                        <FormLabel id="lastName" style={style.formStyle}>
                          Last Name
                        </FormLabel>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <FormControl>
                        <Input
                          id="middleName"
                          aria-describedby="middleName"
                          value={student.middleName}
                          onChange={(e) =>
                            setStudent({
                              ...student,
                              middleName: e.target.value,
                            })
                          }
                          required
                        />
                        <FormLabel id="middleName" style={style.formStyle}>
                          Middle Name
                        </FormLabel>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <FormControl>
                        <Input
                          id="firstName"
                          value={student.firstName}
                          aria-describedby="firstName"
                          onChange={(e) =>
                            setStudent({
                              ...student,
                              firstName: e.target.value,
                            })
                          }
                          required
                        />
                        <FormLabel id="firstName" style={style.formStyle}>
                          First Name
                        </FormLabel>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid id="basic-infor" container spacing={2}>
                    <Grid item xs={12} sm={4} md={4}>
                      <FormControl>
                        <Input
                          id="code"
                          value={student.code}
                          aria-describedby="code"
                          onChange={(e) =>
                            setStudent({ ...student, code: e.target.value })
                          }
                        />
                        <FormLabel id="code" style={style.formStyle}>
                          Student IRN
                        </FormLabel>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          required
                          aria-describedby="email"
                          value={student.email}
                          onChange={(e) =>
                            setStudent({
                              ...student,
                              email: e.target.value,
                            })
                          }
                        />
                        <FormLabel id="email" style={style.formStyle}>
                          Email
                        </FormLabel>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          value={student.dateOfBirth}
                          renderInput={(props) => <TextField {...props} />}
                          onChange={(newValue) =>
                            setStudent({
                              ...student,
                              dateOfBirth: newValue,
                            })
                          }
                        />
                      </LocalizationProvider>
                      <FormLabel id="dateOfBirth" style={style.formStyle}>
                        Date of birth
                      </FormLabel>
                    </Grid>
                  </Grid>
                  <Grid id="basic-infor2" container spacing={2}>
                    <Grid item xs={12} sm={4} md={4}>
                      <FormControl>
                        <Autocomplete
                          id="department"
                          sx={{ width: 300 }}
                          value={student.department}
                          options={departments}
                          onChange={(e, newValue) => {
                            console.log(newValue);
                            setStudent({
                              ...student,
                              department: newValue,
                            });
                          }}
                          autoHighlight
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
                        <FormLabel id="department" style={style.formStyle}>
                          Department
                        </FormLabel>
                      </FormControl>
                      <FormControl>
                        <Autocomplete
                          id="generation"
                          sx={{ width: 300 }}
                          options={generations}
                          value={student.generation}
                          onChange={(e, newValue) =>
                            setStudent({
                              ...student,
                              generation: newValue,
                            })
                          }
                          autoHighlight
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
                        <FormLabel id="generation" style={style.formStyle}>
                          Generation
                        </FormLabel>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="gender"
                      name="row-radio-buttons-group"
                      value={student.gender}
                      onChange={(e, newValue) =>
                        setStudent({ ...student, gender: newValue })
                      }
                      style={{ paddingBottom: 0, marginBottom: 0 }}
                    >
                      <FormControlLabel
                        value="FEMALE"
                        control={<Radio />}
                        label="Female"
                        style={{ paddingBottom: 0, marginBottom: 0 }}
                      />
                      <FormControlLabel
                        value="MALE"
                        control={<Radio />}
                        label="Male"
                        style={{ paddingBottom: 0, marginBottom: 0 }}
                      />
                      <FormControlLabel
                        value="OTHER"
                        control={<Radio />}
                        label="Other"
                        style={{ paddingBottom: 0, marginBottom: 0 }}
                      />
                    </RadioGroup>
                    <FormLabel id="gender" style={style.formStyle}>
                      Gender
                    </FormLabel>
                  </FormControl>
                </FormGroup>
              )}
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <div style={{ textAlign: "right" }}>
                    <Button
                      color="primary"
                      startIcon={<Save />}
                      onClick={(e) => handleUpdate()}
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
              {student != null && (
                <Typography style={{ fontSize: 15 }}>
                  Do you want to delete {student.lastName} {student.middleName}{" "}
                  {student.firstName} - IRN {student.code}?
                </Typography>
              )}
              {student == null && (
                <Typography style={{ fontSize: 15 }}>
                  The student you choose is undefined. Please check again!
                </Typography>
              )}
              <Grid container spacing={1} style={{ marginTop: 20 }}>
                <Grid item xs={6}>
                  <div style={{ textAlign: "right" }}>
                    {student != null && (
                      <Button
                        color="primary"
                        startIcon={<Delete />}
                        onClick={(e) => handleDelete(student.id)}
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
          open={showLeaved}
          onClose={handleCloseLeaved}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={showLeaved}>
            <Box sx={style.boxStyle}>
              {student != null && (
                <Typography style={{ fontSize: 15 }}>
                  Do you want to mark {student.lastName} {student.middleName}{" "}
                  {student.firstName} - IRN {student.code} as list of leaved
                  students?
                </Typography>
              )}
              {student == null && (
                <Typography style={{ fontSize: 15 }}>
                  The student you choose is undefined. Please check again!
                </Typography>
              )}
              <Grid container spacing={1} style={{ marginTop: 20 }}>
                <Grid item xs={6}>
                  <div style={{ textAlign: "right" }}>
                    {student != null && (
                      <Button
                        color="primary"
                        startIcon={<Stop />}
                        onClick={(e) => handleLeaved(student.id)}
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
                      onClick={handleCloseLeaved}
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
                Import A List Of Students
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

export default AllStudent;
