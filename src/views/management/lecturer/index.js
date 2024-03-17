import React, { useMemo, useState, useEffect } from "react";

//MRT Imports
import MUIDataTable from "mui-datatables";
import {
  Delete,
  Edit,
  Save,
  Cancel,
  DeleteForeverOutlined,
  Add,
} from "@mui/icons-material";
//Material-UI Imports
//Icons Imports
import departmentApi from "../../../controller/DepartmentController";
import lecturerApi from "../../../controller/LecturerController";
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
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { render } from "@testing-library/react";
const Lecturer = () => {
  const HeaderElements = () => (
    <>
      <IconButton
        onMouseEnter={() => setFocus(true)}
        onMouseLeave={() => setFocus(false)}
        onClick={(e) => handleShowAdd()}
      >
        <Add color={focus ? "primary" : "default"} />
      </IconButton>
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
  const [data, setData] = useState([]);
  const [focus, setFocus] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [newLecturer, setNewLecturer] = useState({
    code: "",
    lastName: "",
    middleName: "",
    firstName: "",
    email: "",
    gender: "",
    department: {},
    // dateOfBirth: new Date(),
  });
  const [lecturer, setLecturer] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const handleShowAdd = () => {
    setShowAdd(true);
  };
  const handleCloseAdd = () => {
    setShowAdd(false);
  };
  const handleAdd = () => {
    console.log(newLecturer);
    lecturerApi.createLecturer(newLecturer);
    setShowAdd(false);
  };
  const [showUpdate, setShowUpdate] = useState(false);
  const [value, setValue] = useState(null);
  const handleShowUpdate = (value) => {
    setLecturer(value);
    setShowUpdate(true);
  };
  const handleCloseUpdate = () => {
    setShowUpdate(false);
    setLecturer(null);
  };
  const handleUpdate = (value) => {};
  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = (value) => {
    setLecturer(value);
    setShowDelete(true);
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
    setLecturer(null);
  };
  const handleDelete = (temp) => {
    lecturerApi.deleteLecturer(temp);
    handleCloseDelete();
  };
  const columns = [
    {
      name: "lastName",
      label: "Fullname",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (dataIndex, rowIndex) => {
          return `${data[rowIndex.rowIndex].lastName} ${data[rowIndex.rowIndex].middleName} ${data[rowIndex.rowIndex].firstName}`;
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
      name: "organization",
      label: "Department",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return value == null?"":value.name;
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
              <IconButton
                color="primary"
                onClick={(e) => handleShowUpdate(data[dataIndex])}
              >
                <Edit />
              </IconButton>
              <IconButton
                color="secondary"
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
    customToolbar: () => <HeaderElements />,
  };

  useEffect(() => {
    lecturerApi.getAllLecturers().then((res) => {
      setData(res);
      departmentApi.getAllDepartments().then((res1) => {
        setDepartments(res1);
      });
    });
  }, []);

  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
        <MUIDataTable
          title={"Lecturer List"}
          data={data}
          columns={columns}
          options={options}
        />
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
              <Typography style={style.textStyle}>Add New Lecturer</Typography>
              <FormGroup>
                <Grid id="name" container spacing={2}>
                  <Grid item xs={12} sm={4} md={4}>
                    <FormControl>
                      <Input
                        id="lastName"
                        aria-describedby="lastName"
                        onChange={(e) =>
                          setNewLecturer({
                            ...newLecturer,
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
                        onChange={(e) =>
                          setNewLecturer({
                            ...newLecturer,
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
                        aria-describedby="firstName"
                        onChange={(e) =>
                          setNewLecturer({
                            ...newLecturer,
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
                        aria-describedby="code"
                        onChange={(e) =>
                          setNewLecturer({
                            ...newLecturer,
                            code: e.target.value,
                          })
                        }
                      />
                      <FormLabel id="code" style={style.formStyle}>
                        Lecturer code
                      </FormLabel>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <FormControl>
                      <Input
                        id="email"
                        aria-describedby="email"
                        onChange={(e) =>
                          setNewLecturer({
                            ...newLecturer,
                            email: e.target.value,
                          })
                        }
                      />
                      <FormLabel id="email" style={style.formStyle}>
                        Email
                      </FormLabel>
                    </FormControl>
                  </Grid>
                  {/* <Grid item xs={12} sm={4} md={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={newLecturer.dateOfBirth}
                        renderInput={(props) => <TextField {...props} />}
                        onChange={(newValue) =>
                          setNewLecturer({
                            ...newLecturer,
                            dateOfBirth: newValue,
                          })
                        }
                      />
                    </LocalizationProvider>
                    <FormLabel id="dateOfBirth" style={style.formStyle}>
                      Date of birth
                    </FormLabel>
                  </Grid> */}
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
                          setNewLecturer({
                            ...newLecturer,
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
                  </Grid>
                </Grid>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="gender"
                    name="row-radio-buttons-group"
                    onChange={(e, newValue) =>
                      setNewLecturer({ ...newLecturer, gender: newValue })
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
                Update Lecturer Profile
              </Typography>
              {lecturer != null && (
                <FormGroup>
                  <Grid id="name" container spacing={2}>
                    <Grid item xs={12} sm={4} md={4}>
                      <FormControl>
                        <Input
                          id="lastName"
                          aria-describedby="lastName"
                          value={lecturer.lastName}
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
                          value={lecturer.middleName}
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
                          aria-describedby="firstName"
                          value={lecturer.firstName}
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
                          aria-describedby="code"
                          value={lecturer.code}
                        />
                        <FormLabel id="code" style={style.formStyle}>
                          Lecturer IRN
                        </FormLabel>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={8} md={8}>
                      <FormControl>
                        <Input
                          id="email"
                          aria-describedby="email"
                          value={lecturer.email}
                        />
                        <FormLabel id="email" style={style.formStyle}>
                          Email
                        </FormLabel>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <FormControl>
                        <Autocomplete
                          id="department"
                          sx={{ width: 300 }}
                          value={lecturer.organization}
                          options={departments}
                          autoHighlight
                          getOptionLabel={(option) => option.name}
                          renderOption={(props, option) => (
                            <Box
                              component="li"
                              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                              {...props}
                            >
                              {option}
                            </Box>
                          )}
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
                    </Grid>
                  </Grid>
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="gender"
                      name="row-radio-buttons-group"
                      value={lecturer.gender}
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
                    <Button color="primary" startIcon={<Save />}>
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
              {lecturer != null && (
                <Typography style={{ fontSize: 15 }}>
                  Do you want to delete {lecturer.lastName}{" "}
                  {lecturer.middleName} {lecturer.firstName} - IRN{" "}
                  {lecturer.code}?
                </Typography>
              )}
              {lecturer == null && (
                <Typography style={{ fontSize: 15 }}>
                  The lecturer you choose is undefined. Please check again!
                </Typography>
              )}
              <Grid container spacing={1} style={{ marginTop: 20 }}>
                <Grid item xs={6}>
                  <div style={{ textAlign: "right" }}>
                    {lecturer != null && (
                      <Button
                        color="primary"
                        startIcon={<Delete />}
                        onClick={(e) => handleDelete(lecturer.id)}
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
      </div>
    </>
  );
};

export default Lecturer;
