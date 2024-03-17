import React, { useMemo, useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
//MRT Imports
import MUIDataTable from "mui-datatables";
import {
  Delete,
  Edit,
  Save,
  Cancel,
  DeleteForeverOutlined,
  Add,
  Visibility,
  Upload,
  UploadFile,
  CloudUpload,
  Send,
  FindInPage,
} from "@mui/icons-material";
//Material-UI Imports
//Icons Imports
import departmentApi from "../../../controller/DepartmentController";
import curriculumApi from "../../../controller/CurriculumController";
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
import CurriculumDetails from "./CurriculumDetails";
import { useNavigate } from "react-router-dom";
const Curriculum = () => {
  const HeaderElements = () => (
    <>
      <Tooltip title="Add New">
        <IconButton
          onMouseEnter={() => setFocus1(true)}
          onMouseLeave={() => setFocus1(false)}
          onClick={(e) => handleShowAdd()}
        >
          <Add color={focus1 ? "primary" : "default"} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Upload File">
        <IconButton
          onMouseEnter={() => setFocus2(true)}
          onMouseLeave={() => setFocus2(false)}
          onClick={(e) => handleShowUploadFile()}
        >
          <CloudUpload color={focus2 ? "primary" : "default"} />
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
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [focus1, setFocus1] = useState(false);
  const [focus2, setFocus2] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [newCurriculum, setNewCurriculum] = useState({
    code: "",
    name: "",
    organization: {},
    generation: [],
  });
  const [file, setFile] = useState(null);
  const [curriculum, setCurriculum] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showUploadFile, setShowUploadFile] = useState(false);
  const handleShowAdd = () => {
    setShowAdd(true);
  };
  const handleCloseAdd = () => {
    setShowAdd(false);
  };
  const handleAdd = () => {
    console.log(newCurriculum);
    curriculumApi.createCurriculum(newCurriculum);
    setShowAdd(false);
  };
  const [showUpdate, setShowUpdate] = useState(false);
  const [value, setValue] = useState(null);
  const handleShowUpdate = (value) => {
    setCurriculum(value);
    setShowUpdate(true);
  };
  const handleCloseUpdate = () => {
    setShowUpdate(false);
    setCurriculum(null);
  };
  const handleUpdate = () => {
    curriculumApi.updateCurriculum(curriculum);
    handleCloseUpdate();
  };
  const handleShowUploadFile = () => {
    setShowUploadFile(true);
  };
  const handleCloseUploadFile = () => {
    setShowUploadFile(false);
  };
  const handleUploadFile = () => {
    console.log(file);
    curriculumApi.upload(file);
    setShowUploadFile(false);
  };
  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = (value) => {
    setCurriculum(value);
    setShowDelete(true);
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
    setCurriculum(null);
  };
  const handleDelete = (temp) => {
    curriculumApi.deleteCurriculum(temp);
    handleCloseDelete();
  };
  const columns = [
    {
      name: "code",
      label: "Curriculum code",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "organization",
      label: "Organization",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => (
          <Typography>{value != null ? value.name : ""}</Typography>
        ),
      },
    },
    {
      name: "generation",
      label: "Generation",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          var s = "";
          value.map((gen) => {
            s = s.concat(`${gen.name} `);
          });
          return <Typography>{s}</Typography>;
        },
      },
    },
    {
      name: "credit",
      label: "Total credit",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "",
      label: "",
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <>
              <Tooltip title="View Details">
                <IconButton
                  color="primary"
                  onClick={(e) => navigate(`/curriculum/${data[dataIndex].id}`)}
                >
                  <FindInPage />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit General Information">
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
            </>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    selectableRows: "none",
    customToolbar: () => <HeaderElements />,
  };

  useEffect(() => {
    curriculumApi.getAllCurriculums().then((res) => {
      setData(res);
    });
    generationApi.getAllGenerations().then((res2) => {
      setGenerations(res2);
    });
    departmentApi.getAllDepartments().then((res1) => {
      setDepartments(res1);
    });
  }, []);

  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
        <MUIDataTable
          title={"Curriculum List"}
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
              <Typography style={style.textStyle}>
                Add New Curriculum
              </Typography>
              <FormGroup>
                <Grid id="basic-infor" container spacing={2}>
                  <Grid item xs={12} sm={4} md={4}>
                    <FormControl>
                      <Input
                        id="code"
                        aria-describedby="code"
                        onChange={(e) =>
                          setNewCurriculum({
                            ...newCurriculum,
                            code: e.target.value,
                          })
                        }
                        required
                      />
                      <FormLabel id="code" style={style.formStyle}>
                        Curriculum code
                      </FormLabel>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <FormControl>
                      <Input
                        id="name"
                        aria-describedby="name"
                        onChange={(e) =>
                          setNewCurriculum({
                            ...newCurriculum,
                            name: e.target.value,
                          })
                        }
                        required
                      />
                      <FormLabel id="name" style={style.formStyle}>
                        Curriculum title
                      </FormLabel>
                    </FormControl>
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
                          setNewCurriculum({
                            ...newCurriculum,
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
                        onChange={(e, newValue) =>
                          setNewCurriculum({
                            ...newCurriculum,
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
                Update Curriculum Profile
              </Typography>
              {curriculum != null && (
                <FormGroup>
                  <Grid id="basic-infor" container spacing={2}>
                    <Grid item xs={12} sm={4} md={4}>
                      <FormControl>
                        <Input
                          id="code"
                          aria-describedby="code"
                          value={curriculum.code}
                          onChange={(e) =>
                            setCurriculum({
                              ...curriculum,
                              code: e.target.value,
                            })
                          }
                          required
                        />
                        <FormLabel id="code" style={style.formStyle}>
                          Curriculum code
                        </FormLabel>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <FormControl>
                        <Input
                          id="name"
                          aria-describedby="name"
                          value={curriculum.name}
                          onChange={(e) =>
                            setCurriculum({
                              ...curriculum,
                              name: e.target.value,
                            })
                          }
                          required
                        />
                        <FormLabel id="name" style={style.formStyle}>
                          Curriculum title
                        </FormLabel>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid id="basic-infor2" container spacing={2}>
                    <Grid item xs={12} sm={4} md={4}>
                      <FormControl>
                        <Autocomplete
                          id="department"
                          sx={{ width: 300 }}
                          value={curriculum.organization}
                          options={departments}
                          onChange={(e, newValue) => {
                            console.log(newValue);
                            setCurriculum({
                              ...curriculum,
                              organization: newValue,
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
                          value={curriculum.generation}
                          onChange={(e, newValue) =>
                            setCurriculum({
                              ...curriculum,
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
              {curriculum != null && (
                <Typography style={{ fontSize: 15 }}>
                  Do you want to delete {curriculum.name}?
                </Typography>
              )}
              {curriculum == null && (
                <Typography style={{ fontSize: 15 }}>
                  The curriculum you choose is undefined. Please check again!
                </Typography>
              )}
              <Grid container spacing={1} style={{ marginTop: 20 }}>
                <Grid item xs={6}>
                  <div style={{ textAlign: "right" }}>
                    {curriculum != null && (
                      <Button
                        color="primary"
                        startIcon={<Delete />}
                        onClick={(e) => handleDelete(curriculum.id)}
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
              <Typography style={style.textStyle}>
                Upload A Complete Curriculum
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

export default Curriculum;
