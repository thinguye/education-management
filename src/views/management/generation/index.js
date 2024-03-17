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
} from "@mui/icons-material";
//Material-UI Imports
//Icons Imports
import generationApi from "../../../controller/GenerationController";
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
const Generation = () => {
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
  const [years, setYears] = useState([]);
  const [focus, setFocus] = useState(false);
  const [newGeneration, setNewGeneration] = useState({
    code: "",
    name: "",
    startGeneration: new Date(),
    endGeneration: new Date(),
  });
  const [generation, setGeneration] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const handleShowAdd = () => {
    setShowAdd(true);
  };
  const handleCloseAdd = () => {
    setShowAdd(false);
  };
  const handleAdd = () => {
    console.log(newGeneration);
    generationApi.createGeneration(newGeneration);
    setShowAdd(false);
  };
  const [showUpdate, setShowUpdate] = useState(false);
  const handleShowUpdate = (value) => {
    setGeneration(value);
    setShowUpdate(true);
  };
  const handleCloseUpdate = () => {
    setShowUpdate(false);
    setGeneration(null);
  };
  const handleUpdate = (value) => {
    generationApi.updateGeneration(value);
    handleCloseUpdate();
  };
  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = (value) => {
    setGeneration(value);
    setShowDelete(true);
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
    setGeneration(null);
  };
  const handleDelete = (temp) => {
    generationApi.deleteGeneration(temp);
    handleCloseDelete();
  };
  const columns = [
    {
      name: "name",
      label: "Generation",
      options: {
        filter: true,
        sort:false
      },
    },
    {
      name: "year",
      label: "Year enroll",
      options: {
        filter: true,
        sort:false,
        customBodyRender: (value) => {
          return value.name;
        },
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        filter:false,
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
    filterType: "checkbox",
    customToolbar: () => <HeaderElements />,
  };

  useEffect(() => {
    generationApi.getAllGenerations().then((res) => {
      setData(res);
      yearApi.getAllYears().then((result) => {
        setYears(result);
      });
    });
  }, []);

  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
        <MUIDataTable
          title={"Generation List"}
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
                Add New Generation
              </Typography>
              <FormGroup>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={8}>
                    <FormControl>
                      <Input
                        id="code"
                        aria-describedby="code"
                        onChange={(e) =>
                          setNewGeneration({
                            ...newGeneration,
                            code: e.target.value,
                          })
                        }
                        required
                      />
                      <FormLabel id="code" style={style.formStyle}>
                        Generation code
                      </FormLabel>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <FormControl>
                      <Input
                        id="name"
                        aria-describedby="name"
                        onChange={(e) =>
                          setNewGeneration({
                            ...newGeneration,
                            name: e.target.value,
                          })
                        }
                        required
                      />
                      <FormLabel id="name" style={style.formStyle}>
                        Generation name
                      </FormLabel>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <FormControl>
                      <Autocomplete
                        id="year"
                        sx={{ width: 300 }}
                        options={years}
                        autoHighlight
                        onChange={(e, newValue) =>
                          setNewGeneration({
                            ...newGeneration,
                            year: newValue,
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
                      <FormLabel id="year" style={style.formStyle}>
                        Year enroll
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
                Update Generation Profile
              </Typography>
              {generation != null && (
                <FormGroup>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={8}>
                      <FormControl>
                        <Input
                          id="code"
                          aria-describedby="code"
                          value={generation.code}
                          onChange={(e) =>
                            setGeneration({
                              ...generation,
                              code: e.target.value,
                            })
                          }
                          required
                        />
                        <FormLabel id="code" style={style.formStyle}>
                          Generation code
                        </FormLabel>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <FormControl>
                        <Input
                          id="name"
                          aria-describedby="name"
                          value={generation.name}
                          onChange={(e) =>
                            setGeneration({
                              ...generation,
                              name: e.target.value,
                            })
                          }
                          required
                        />
                        <FormLabel id="name" style={style.formStyle}>
                          Generation name
                        </FormLabel>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <FormControl>
                        <Autocomplete
                          id="year"
                          sx={{ width: 300 }}
                          options={years}
                          value={generation.year}
                          autoHighlight
                          onChange={(e, newValue) =>
                            setGeneration({
                              ...generation,
                              year: newValue,
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
                        <FormLabel id="year" style={style.formStyle}>
                          Year enroll
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
                      onClick={(e) => handleUpdate(newGeneration)}
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
              {generation != null && (
                <Typography style={{ fontSize: 15 }}>
                  Do you want to delete {generation.lastName}{" "}
                  {generation.middleName} {generation.firstName} - IRN{" "}
                  {generation.code}?
                </Typography>
              )}
              {generation == null && (
                <Typography style={{ fontSize: 15 }}>
                  The generation you choose is undefined. Please check again!
                </Typography>
              )}
              <Grid container spacing={1} style={{ marginTop: 20 }}>
                <Grid item xs={6}>
                  <div style={{ textAlign: "right" }}>
                    {generation != null && (
                      <Button
                        color="primary"
                        startIcon={<Delete />}
                        onClick={(e) => handleDelete(generation.id)}
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

export default Generation;
