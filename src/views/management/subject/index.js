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
  Visibility,
  Send,
  CloudUpload,
} from "@mui/icons-material";
//Material-UI Imports
//Icons Imports
import electiveApi from "../../../controller/ElectiveController";
import subjectApi from "../../../controller/SubjectController";
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
  Tab,
  Tooltip,
} from "@mui/material";
import { render } from "@testing-library/react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useNavigate } from "react-router-dom";
const SubjectUI = () => {
  const HeaderElements1 = () => (
    <>
      <Tooltip title="Add New">
        <IconButton
          onMouseEnter={() => setFocus(true)}
          onMouseLeave={() => setFocus(false)}
          onClick={(e) => handleShowAdd1()}
        >
          <Add color={focus ? "primary" : "default"} />
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
  const [data1, setData1] = useState([]);
  const [focus, setFocus] = useState(false);
  const [focus2, setFocus2] = useState(false);
  const [showUploadFile, setShowUploadFile] = useState(false);
  const [file, setFile] = useState();
  const [newSubject, setNewSubject] = useState({
    code: "",
    name: "",
    theoryCredit: 0,
    labCredit: 0,
  });
  const [newGroup, setNewGroup] = useState({
    name: "",
    credit: 0,
  });
  const [subject, setSubject] = useState(null);
  const [showAdd1, setShowAdd1] = useState(false);
  const handleShowAdd1 = () => {
    setShowAdd1(true);
  };
  const handleCloseAdd1 = () => {
    setShowAdd1(false);
  };
  const handleAdd1 = () => {
    console.log(newSubject);
    subjectApi.createSubject(newSubject);
    setShowAdd1(false);
  };
  const [showUpdate1, setShowUpdate1] = useState(false);
  const [value, setValue] = useState("1");
  const handleShowUpdate1 = (e, value) => {
    setSubject(value);
    setShowUpdate1(true);
  };
  const handleCloseUpdate1 = () => {
    setShowUpdate1(false);
    setSubject(null);
  };
  const handleUpdate1 = (value) => {};
  const [showDelete1, setShowDelete1] = useState(false);
  const handleShowDelete1 = (e, value) => {
    setSubject(value);
    setShowDelete1(true);
  };
  const handleCloseDelete1 = () => {
    setShowDelete1(false);
    setSubject(null);
  };
  const handleDelete1 = (temp) => {
    subjectApi.deleteSubject(temp);
    handleCloseDelete1();
  };
  const handleShowUploadFile = () => {
    setShowUploadFile(true);
  };
  const handleCloseUploadFile = () => {
    setShowUploadFile(false);
  };
  const handleUploadFile = () => {
    console.log(file);
    subjectApi.upload(file);
    setShowUploadFile(false);
  };
  const columns = [
    {
      name: "code",
      label: "Subject code",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "name",
      label: "Title",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "theoryCredit",
      label: "Theory Credit",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "labCredit",
      label: "Lab Credit",
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
              <Tooltip title="Edit">
                <IconButton
                  color="secondary"
                  onClick={(e) => handleShowUpdate1(e, data[dataIndex])}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  color="error"
                  onClick={(e) => handleShowDelete1(e, data[dataIndex])}
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
  const options1 = {
    filterType: "dropdown",
    selectableRows: "none",
    customToolbar: () => <HeaderElements1 />,
  };

  useEffect(() => {
    subjectApi.getAllSubjects().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <>
      <div style={{ height: "auto", width: "100%" }}>
        <MUIDataTable data={data} columns={columns} options={options1} />
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={showAdd1}
          onClose={handleCloseAdd1}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={showAdd1}>
            <Box sx={style.boxStyle}>
              <Typography style={style.textStyle}>Add New Subject</Typography>
              <FormGroup>
                <Grid id="basic-infor" container spacing={2}>
                  <Grid item xs={12} sm={4} md={4}>
                    <FormControl>
                      <Input
                        id="code"
                        aria-describedby="code"
                        onChange={(e) =>
                          setNewSubject({
                            ...newSubject,
                            code: e.target.value,
                          })
                        }
                        required
                      />
                      <FormLabel id="code" style={style.formStyle}>
                        Subject code
                      </FormLabel>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <FormControl>
                      <Input
                        id="name"
                        aria-describedby="name"
                        onChange={(e) =>
                          setNewSubject({
                            ...newSubject,
                            name: e.target.value,
                          })
                        }
                        required
                      />
                      <FormLabel id="name" style={style.formStyle}>
                        Subject title
                      </FormLabel>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid id="basic-infor2" container spacing={2}>
                  <Grid item xs={12} sm={4} md={4}>
                    <FormControl>
                      <Input
                        id="credit"
                        type="number"
                        defaultValue={4}
                        aria-describedby="credit"
                        onChange={(e) =>
                          setNewSubject({
                            ...newSubject,
                            credit: e.target.value,
                          })
                        }
                        required
                      />
                      <FormLabel id="credit" style={style.formStyle}>
                        Credit
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
                      onClick={handleAdd1}
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
                      onClick={handleCloseAdd1}
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
          open={showUpdate1}
          onClose={handleCloseUpdate1}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={showUpdate1}>
            <Box sx={style.boxStyle}>
              <Typography style={style.textStyle}>
                Update Subject Profile
              </Typography>
              {subject != null && (
                <FormGroup>
                  <Grid id="basic-infor" container spacing={2}>
                    <Grid item xs={12} sm={4} md={4}>
                      <FormControl>
                        <Input
                          id="code"
                          aria-describedby="code"
                          value={subject.code}
                          onChange={(e) =>
                            setSubject({
                              ...subject,
                              code: e.target.value,
                            })
                          }
                          required
                        />
                        <FormLabel id="code" style={style.formStyle}>
                          Subject code
                        </FormLabel>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <FormControl>
                        <Input
                          id="name"
                          aria-describedby="name"
                          value={subject.name}
                          onChange={(e) =>
                            setSubject({
                              ...subject,
                              name: e.target.value,
                            })
                          }
                          required
                        />
                        <FormLabel id="name" style={style.formStyle}>
                          Subject title
                        </FormLabel>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid id="basic-infor2" container spacing={2}>
                    <Grid item xs={12} sm={4} md={4}>
                      <FormControl>
                        <Input
                          id="credit"
                          type="number"
                          value={subject.credit}
                          aria-describedby="credit"
                          onChange={(e) =>
                            setSubject({
                              ...subject,
                              credit: e.target.value,
                            })
                          }
                          required
                        />
                        <FormLabel id="credit" style={style.formStyle}>
                          Credit
                        </FormLabel>
                      </FormControl>
                    </Grid>
                  </Grid>
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
                      onClick={handleCloseUpdate1}
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
          open={showDelete1}
          onClose={handleCloseDelete1}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={showDelete1}>
            <Box sx={style.boxStyle}>
              {subject != null && (
                <Typography style={{ fontSize: 15 }}>
                  Do you want to delete {subject.name}?
                </Typography>
              )}
              {subject == null && (
                <Typography style={{ fontSize: 15 }}>
                  The subject you choose is undefined. Please check again!
                </Typography>
              )}
              <Grid container spacing={1} style={{ marginTop: 20 }}>
                <Grid item xs={6}>
                  <div style={{ textAlign: "right" }}>
                    {subject != null && (
                      <Button
                        color="primary"
                        startIcon={<Delete />}
                        onClick={(e) => handleDelete1(subject.id)}
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
                      onClick={handleCloseDelete1}
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
                Upload A List Of Subjects
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

export default SubjectUI;
