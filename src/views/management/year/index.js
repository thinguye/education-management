import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//MRT Imports
import MUIDataTable from "mui-datatables";
import {
  DatePicker,
  LocalizationProvider,
  StaticDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Visibility,
  Delete,
  Edit,
  Save,
  Cancel,
  DeleteForeverOutlined,
  Add,
} from "@mui/icons-material";
//Material-UI Imports
//Icons Imports
import yearApi from "../../../controller/YearController";
import quarterApi from "../../../controller/QuarterController";
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
import dayjs from "dayjs";
const Year = () => {
  const navigate = useNavigate();
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
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [focus, setFocus] = useState(false);
  const [newYear, setNewYear] = useState({
    code: "",
    name: "",
    startYear: new Date(),
    endYear: new Date(),
  });
  const [year, setYear] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const handleShowAdd = () => {
    setShowAdd(true);
  };
  const handleCloseAdd = () => {
    setShowAdd(false);
  };
  const handleAdd = () => {
    console.log(newYear);
    yearApi.createYear(newYear);
    setShowAdd(false);
  };
  const [showUpdate, setShowUpdate] = useState(false);
  const handleShowUpdate = (value) => {
    setYear(value);
    setShowUpdate(true);
  };
  const handleCloseUpdate = () => {
    setShowUpdate(false);
    setYear(null);
  };
  const handleUpdate = (value) => {
    yearApi.updateYear(value);
    handleCloseUpdate();
  };
  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = (value) => {
    setYear(value);
    setShowDelete(true);
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
    setYear(null);
  };
  const handleDelete = (temp) => {
    yearApi.deleteYear(temp);
    handleCloseDelete();
  };
  const columns = [
    // {
    //   name: "code",
    //   label: "Year code",
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
    {
      name: "name",
      label: "Year name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "startYear",
      label: "Start from",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => (
          <Typography>{dayjs(value).format("DD/MM/YYYY")}</Typography>
        ),
      },
    },
    {
      name: "endYear",
      label: "To",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => (
          <Typography>{dayjs(value).format("DD/MM/YYYY")}</Typography>
        ),
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
            <>
              <IconButton
                color="accent"
                onClick={(e) => navigate(`/year/${data[dataIndex].id}`)}
              >
                <Visibility />
              </IconButton>
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
    filterType: "checkbox",
    customToolbar: () => <HeaderElements />,
  };

  useEffect(() => {
    yearApi.getAllYears().then((res) => {
      setData(res);
      quarterApi.getAllQuarters().then((res) => {
        setData1(res);
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
              <Typography style={style.textStyle}>Add New Year</Typography>
              <FormGroup>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={8}>
                    <FormControl>
                      <Input
                        id="code"
                        aria-describedby="code"
                        onChange={(e) =>
                          setNewYear({
                            ...newYear,
                            code: e.target.value,
                          })
                        }
                        required
                      />
                      <FormLabel id="code" style={style.formStyle}>
                        Year code
                      </FormLabel>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <FormControl>
                      <Input
                        id="name"
                        aria-describedby="name"
                        onChange={(e) =>
                          setNewYear({
                            ...newYear,
                            name: e.target.value,
                          })
                        }
                        required
                      />
                      <FormLabel id="name" style={style.formStyle}>
                        Year name
                      </FormLabel>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid item xs={12} sm={4} md={6}>
                      <DatePicker
                        value={newYear.startYear}
                        renderInput={(props) => <TextField {...props} />}
                        onChange={(newValue) =>
                          setNewYear({ ...newYear, startYear: newValue })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={6}>
                      <DatePicker
                        value={newYear.endYear}
                        renderInput={(props) => <TextField {...props} />}
                        onChange={(newValue) =>
                          setNewYear({ ...newYear, endYear: newValue })
                        }
                      />
                    </Grid>
                  </LocalizationProvider>
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
                Update Year Profile
              </Typography>
              {year != null && (
                <FormGroup>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4} md={4}>
                      <FormControl>
                        <Input
                          id="code"
                          aria-describedby="code"
                          value={year.code}
                          onChange={(e) =>
                            setYear({
                              ...year,
                              code: e.target.value,
                            })
                          }
                          required
                        />
                        <FormLabel id="code" style={style.formStyle}>
                          Year code
                        </FormLabel>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                      <FormControl>
                        <Input
                          id="name"
                          aria-describedby="name"
                          value={year.name}
                          onChange={(e) =>
                            setYear({
                              ...year,
                              name: e.target.value,
                            })
                          }
                          required
                        />
                        <FormLabel id="name" style={style.formStyle}>
                          Year name
                        </FormLabel>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          value={year.startYear}
                          renderInput={(props) => <TextField {...props} />}
                          onChange={(e, newValue) =>
                            setYear({ ...year, startYear: newValue })
                          }
                        />
                        <DatePicker
                          value={year.endYear}
                          renderInput={(props) => <TextField {...props} />}
                          onChange={(e, newValue) =>
                            setYear({ ...year, endYear: newValue })
                          }
                        />
                      </LocalizationProvider>
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
                      onClick={(e) => handleUpdate(newYear)}
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
              {year != null && (
                <Typography style={{ fontSize: 15 }}>
                  Do you want to delete {year.lastName} {year.middleName}{" "}
                  {year.firstName} - IRN {year.code}?
                </Typography>
              )}
              {year == null && (
                <Typography style={{ fontSize: 15 }}>
                  The year you choose is undefined. Please check again!
                </Typography>
              )}
              <Grid container spacing={1} style={{ marginTop: 20 }}>
                <Grid item xs={6}>
                  <div style={{ textAlign: "right" }}>
                    {year != null && (
                      <Button
                        color="primary"
                        startIcon={<Delete />}
                        onClick={(e) => handleDelete(year.id)}
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

export default Year;
