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
  CloudUpload,
  Send,
  Grading,
  UploadFileSharp,
} from "@mui/icons-material";
//Material-UI Imports
//Icons Imports
import enrollmentApi from "../../../controller/EnrollmentController";
import yearApi from "../../../controller/YearController";
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
import { render } from "@testing-library/react";
import { useParams } from "react-router-dom";
import AlertDialog from "ui-component/AlertDialog";
const Enrollment = () => {
  const HeaderElements = () => (
    <>
      <Tooltip title="Add New">
        <IconButton
          onMouseEnter={() => setFocus2(true)}
          onMouseLeave={() => setFocus2(false)}
          onClick={(e) => handleShowAdd()}
        >
          <Add color={focus2 ? "primary" : "default"} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Import Enrollment">
        <IconButton
          onMouseEnter={() => setFocus1(true)}
          onMouseLeave={() => setFocus1(false)}
          onClick={(e) => handleShowUpload()}
        >
          <UploadFileSharp color={focus1 ? "primary" : "default"} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Upload File">
        <IconButton
          onMouseEnter={() => setFocus3(true)}
          onMouseLeave={() => setFocus3(false)}
          onClick={(e) => handleShowUploadFile()}
        >
          <CloudUpload color={focus3 ? "primary" : "default"} />
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
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [focus1, setFocus1] = useState(false);
  const [focus2, setFocus2] = useState(false);
  const [focus3, setFocus3] = useState(false);
  const [newEnrollment, setNewEnrollment] = useState({
    student: "",
    subject: id,
  });

  const [gradeFile, setGradeFile] = useState({
    subject: id,
    file: null,
  });
  const [student, setStudent] = useState(null);
  const [tempFile, setTempFile] = useState({
    id: id,
    file: null,
  });
  const [enrollment, setEnrollment] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const handleShowAdd = () => {
    setShowAdd(true);
  };
  const handleCloseAdd = () => {
    setShowAdd(false);
  };
  const handleAdd = () => {
    console.log(newEnrollment);
    enrollmentApi.createEnrollment(newEnrollment);
    setShowAdd(false);
  };
  const [showUploadFile, setShowUploadFile] = useState(false);
  const handleShowUploadFile = () => {
    setShowUploadFile(true);
  };
  const handleCloseUploadFile = () => {
    setShowUploadFile(false);
  };
  const handleUploadFile = () => {
    console.log(gradeFile);
    enrollmentApi.updateGradeFile(gradeFile).then((res) => {
      setShowUploadFile(false);
      handleShowAlert()
    });
    
  };
  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = (value) => {
    setEnrollment(value);
    setShowDelete(true);
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
    setEnrollment(null);
  };
  const handleDelete = (temp) => {
    enrollmentApi.deleteEnrollment(temp);
    handleCloseDelete();
  };
  const [showUpload, setShowUpload] = useState(false);
  const handleShowUpload = () => {
    setShowUpload(true);
  };
  const handleCloseUpload = () => {
    setShowUpload(false);
  };
  const handleUpload = () => {
    enrollmentApi.importEnrollment(tempFile).then((res) => {
      handleCloseUpload();
      handleShowAlert()
    });
    
  };
  const [showUpdate, setShowUpdate] = useState(false);
  const handleShowUpdate = (value) => {
    setStudent(value);
    setShowUpdate(true);
  };
  const handleCloseUpdate = () => {
    setShowUpdate(false);
    setStudent(null);
  };
  const [showAlert,setShowAlert] = useState(false);
  const handleUpdate = () => {
    const ele = {
      id: student.id,
      grade: student.grade,
    };
    console.log(ele);
    enrollmentApi.updateEnrollment(ele);
  };
  const columns = [
    {
      name: "student",
      label: "Họ và tên",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => (
          <Typography>
            {value.lastName} {value.middleName} {value.firstName}
          </Typography>
        ),
      },
    },
    {
      name: "student",
      label: "Mã số",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => <Typography>{value.code}</Typography>,
      },
    },
    {
      name: "gradeLetter",
      label: "Xếp loại",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "grade",
      label: "GPA",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return value == null ? "" : value.toFixed(2);
        },
      },
    },
    {
      name: "",
      label: "",
      options: {
        filter: true,
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
    textLabels: {
      body: {
        noMatch: isLoading ? "Không có dữ liệu" : "Đang tải dữ liệu...",
      },
    },
    filterType: "dropdown",
    selectableRows: "none",
    customToolbar: () => <HeaderElements />,
  };
const handleCloseAlert=()=>{
  setShowAlert(false)
}
const handleShowAlert=()=>{
  setShowAlert(true)
}
  useEffect(() => {
    enrollmentApi.getEnrollmentSubject(id).then((res) => {
      setData(res);
      setIsLoading(true);
    });
  }, []);

  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
        <MUIDataTable data={data} columns={columns} options={options} />

        {/* Add New */}
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
                Add New Enrollment
              </Typography>
              <FormGroup>
                <FormControl>
                  <Input
                    id="code"
                    aria-describedby="code"
                    onChange={(e) =>
                      setNewEnrollment({
                        ...newEnrollment,
                        student: e.target.value,
                      })
                    }
                    required
                  />
                  <FormLabel id="code" style={style.formStyle}>
                    Student IRN
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
        {/* Delete */}
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
              {enrollment != null && (
                <Typography style={{ fontSize: 15 }}>
                  Do you want to delete {enrollment.student.lastName}{" "}
                  {enrollment.student.middleName} {enrollment.student.firstName}{" "}
                  from the list of {enrollment.subject.subject.name}?
                </Typography>
              )}
              {enrollment == null && (
                <Typography style={{ fontSize: 15 }}>
                  The enrollment you choose is undefined. Please check again!
                </Typography>
              )}
              <Grid container spacing={1} style={{ marginTop: 20 }}>
                <Grid item xs={6}>
                  <div style={{ textAlign: "right" }}>
                    {enrollment != null && (
                      <Button
                        color="primary"
                        startIcon={<Delete />}
                        onClick={(e) => handleDelete(enrollment.id)}
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
        {/* Update */}
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
              <Typography style={style.textStyle}>Update grade</Typography>
              <FormGroup>
                <FormControl>
                  <Input
                    id="grade"
                    type="number"
                    aria-describedby="grade"
                    onChange={(e) =>
                      setStudent({
                        ...student,
                        grade: e.target.value,
                      })
                    }
                    required
                  />
                  <FormLabel id="grade" style={style.formStyle}>
                    Grade
                  </FormLabel>
                </FormControl>
              </FormGroup>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <div style={{ textAlign: "right" }}>
                    <Button
                      color="primary"
                      startIcon={<Save />}
                      onClick={handleUpdate}
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
        {/* Upload Grade */}
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

        {/* Import list of enrollment */}
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
                Import enrollments
              </Typography>
              <FormGroup>
                <TextField
                  type="file"
                  onChange={(e) =>
                    setTempFile({
                      ...tempFile,
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

        {/* Alert */}
        <AlertDialog type={"success"} title={"Thành công"} message={"Cập nhật điểm thành công"} showAlert={showAlert} handleClose={handleCloseAlert}/>
      </div>
    </>
  );
};

export default Enrollment;
