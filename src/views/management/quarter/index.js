import React, { useMemo, useState, useEffect } from "react";

//MRT Imports
import MUIDataTable from "mui-datatables";
import dayjs from "dayjs";
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
} from "@mui/icons-material";
//Material-UI Imports
//Icons Imports
import quarterApi from "../../../controller/QuarterController";
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
} from "@mui/material";
import { render } from "@testing-library/react";
import { useParams } from "react-router-dom";
const Quarter = () => {
  const params = useParams().id;
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
  const [year, setYear] = useState([]);
  const [focus, setFocus] = useState(false);
  const [newQuarter, setNewQuarter] = useState({
    name: "",
    year: {},
    start: new Date(),
    end: new Date(),
  });
  const [quarter, setQuarter] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const handleShowAdd = () => {
    setShowAdd(true);
  };
  const handleCloseAdd = () => {
    setShowAdd(false);
  };
  const handleAdd = () => {
    console.log(newQuarter);
    quarterApi.createQuarter(newQuarter);
    setShowAdd(false);
  };
  const [showUpdate, setShowUpdate] = useState(false);
  const handleShowUpdate = (value) => {
    setQuarter(value);
    setShowUpdate(true);
  };
  const handleCloseUpdate = () => {
    setShowUpdate(false);
    setQuarter(null);
  };
  const handleUpdate = (value) => {
    quarterApi.updateQuarter(value);
    handleCloseUpdate();
  };
  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = (value) => {
    setQuarter(value);
    setShowDelete(true);
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
    setQuarter(null);
  };
  const handleDelete = (temp) => {
    quarterApi.deleteQuarter(temp);
    handleCloseDelete();
  };
  const columns = [
    {
      name: "name",
      label: "Quarter",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "start",
      label: "From",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => dayjs(value).format("DD/MM/YYYY"),
      },
    },
    {
      name: "end",
      label: "To",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => dayjs(value).format("DD/MM/YYYY"),
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
                color="primary"
                onClick={(e) => handleShowUpdate(data[dataIndex])}
              >
                <Edit />
              </IconButton>
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
    customToolbar: () => <HeaderElements />,
  };

  useEffect(() => {
    console.log(params);
    quarterApi.getQuartersByYear(params).then((res) => {
      setData(res);
      yearApi.getYearById(params).then((res) => {
        setNewQuarter({ ...newQuarter, year: res });
      });
    });
  }, []);

  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
        <MUIDataTable
          title={"Quarter List"}
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
              <Typography style={style.textStyle}>Add New Quarter</Typography>
              <FormGroup>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={8}>
                    <FormControl>
                      <Input
                        id="name"
                        aria-describedby="name"
                        onChange={(e) =>
                          setNewQuarter({
                            ...newQuarter,
                            name: e.target.value,
                          })
                        }
                        required
                      />
                      <FormLabel id="name" style={style.formStyle}>
                        Quarter name
                      </FormLabel>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid item xs={12} sm={4} md={6}>
                      <DatePicker
                        value={newQuarter.start}
                        renderInput={(props) => <TextField {...props} />}
                        onChange={(newValue) =>
                          setNewQuarter({ ...newQuarter, start: newValue })
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={6}>
                      <DatePicker
                        value={newQuarter.end}
                        renderInput={(props) => <TextField {...props} />}
                        onChange={(newValue) =>
                          setNewQuarter({ ...newQuarter, end: newValue })
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
                Update Quarter Profile
              </Typography>
              {quarter != null && (
                <FormGroup>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={8}>
                      <FormControl>
                        <Input
                          id="name"
                          aria-describedby="name"
                          value={quarter.name}
                          onChange={(e) =>
                            setQuarter({
                              ...quarter,
                              name: e.target.value,
                            })
                          }
                          required
                        />
                        <FormLabel id="name" style={style.formStyle}>
                          Quarter name
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
                      onClick={(e) => handleUpdate(newQuarter)}
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
              {quarter != null && (
                <Typography style={{ fontSize: 15 }}>
                  Do you want to delete {quarter.name}?
                </Typography>
              )}
              {quarter == null && (
                <Typography style={{ fontSize: 15 }}>
                  The quarter you choose is undefined. Please check again!
                </Typography>
              )}
              <Grid container spacing={1} style={{ marginTop: 20 }}>
                <Grid item xs={6}>
                  <div style={{ textAlign: "right" }}>
                    {quarter != null && (
                      <Button
                        color="primary"
                        startIcon={<Delete />}
                        onClick={(e) => handleDelete(quarter.id)}
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

export default Quarter;
