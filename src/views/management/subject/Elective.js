import React, { useMemo, useState, useEffect } from "react";

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
  UploadFile,
} from "@mui/icons-material";
//Material-UI Imports
//Icons Imports
import electiveApi from "../../../controller/ElectiveController";
import subjectApi from "../../../controller/SubjectController";
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
import { render } from "@testing-library/react";
import { useParams } from "react-router-dom";
const Elective = () => {
  const HeaderElements = () => (
    <>
      <IconButton
        onMouseEnter={() => setFocus1(true)}
        onMouseLeave={() => setFocus1(false)}
        onClick={(e) => handleShowUpload()}
      >
        <UploadFile color={focus1 ? "primary" : "default"} />
      </IconButton>
      <IconButton
        onMouseEnter={() => setFocus2(true)}
        onMouseLeave={() => setFocus2(false)}
        onClick={(e) => handleShowAdd()}
      >
        <Add color={focus2 ? "primary" : "default"} />
      </IconButton>
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
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [focus1, setFocus1] = useState(false);
  const [focus2, setFocus2] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [newElective, setNewElective] = useState({
    subject: {},
    id: id,
  });
  const [tempFile, setTempFile] = useState(null);
  const [elective, setElective] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const handleShowAdd = () => {
    setShowAdd(true);
  };
  const handleCloseAdd = () => {
    setShowAdd(false);
  };
  const handleAdd = () => {
    console.log(newElective);
    electiveApi.createElective(newElective);
    setShowAdd(false);
  };
  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = (value) => {
    setElective(value);
    setShowDelete(true);
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
    setElective(null);
  };
  const handleDelete = (temp) => {
    electiveApi.deleteElective(temp);
    handleCloseDelete();
  };
  const [showUpload, setShowUpload] = useState(false);
  const handleShowUpload = (value) => {
    setElective(value);
    setShowUpload(true);
  };
  const handleCloseUpload = () => {
    setShowUpload(false);
    setElective(null);
  };
  const handleUpload = () => {
    const ele = {
      id: id,
      file: tempFile[0],
    };
    console.log(ele);
    electiveApi.importElective(ele);
    handleCloseUpload();
  };
  const columns = [
    {
      name: "subject",
      label: "Subject",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => <Typography>{value.name}</Typography>,
      },
    },
    {
      name: "subject",
      label: "Credit",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => <Typography>{value.credit}</Typography>,
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <IconButton
              color="error"
              onClick={(e) => handleShowDelete(data[dataIndex])}
            >
              <Delete />
            </IconButton>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    customToolbar: () => <HeaderElements />,
  };

  useEffect(() => {
    electiveApi.getElectiveByGroup(id).then((res) => {
      setData(res);
    });
    subjectApi.getAllSubjects().then((res1) => {
        setSubjects(res1);
      });
  }, []);

  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
        <MUIDataTable
          title={"Elective List"}
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
              <Typography style={style.textStyle}>Add New Elective</Typography>
              <FormGroup>
              <FormControl>
                        <Autocomplete
                          id="subject"
                          sx={{ width: 300 }}
                          options={subjects}
                          onChange={(e, newValue) => {
                            console.log(newValue);
                            setNewElective({
                              ...newElective,
                              subject: newValue,
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
                          Subject
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
              {elective != null && (
                <Typography style={{ fontSize: 15 }}>
                  Do you want to delete {elective.subject.name} from the list?
                </Typography>
              )}
              {elective == null && (
                <Typography style={{ fontSize: 15 }}>
                  The elective you choose is undefined. Please check again!
                </Typography>
              )}
              <Grid container spacing={1} style={{ marginTop: 20 }}>
                <Grid item xs={6}>
                  <div style={{ textAlign: "right" }}>
                    {elective != null && (
                      <Button
                        color="primary"
                        startIcon={<Delete />}
                        onClick={(e) => handleDelete(elective.id)}
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
                Import list of students
              </Typography>
              <FormGroup>
                <FormControl>
                  <Input
                    id="file"
                    aria-describedby="file"
                    onChange={(e) => setTempFile(e.target.files)}
                    type="file"
                    required
                  />
                </FormControl>
              </FormGroup>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <div style={{ textAlign: "right" }}>
                    <Button
                      color="primary"
                      startIcon={<Save />}
                      onClick={handleUpload}
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

export default Elective;
