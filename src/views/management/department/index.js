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
import departmentApi from "../../../controller/DepartmentController";
import parentApi from "../../../controller/YearController";
import majorApi from "../../../controller/MajorController";
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
  Table,
  TableContainer,
  TableHead,
  TableBody,
  Paper,
} from "@mui/material";
import { render } from "@testing-library/react";
const Department = () => {
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
  const [data3, setData3] = useState([]);
  const [focus, setFocus] = useState(false);
  const [newDepartment, setNewDepartment] = useState({
    code: "",
    name: "",
    parent: null,
  });
  const [department, setDepartment] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const handleShowAdd = () => {
    setShowAdd(true);
  };
  const handleCloseAdd = () => {
    setShowAdd(false);
  };
  const handleAdd = () => {
    console.log(newDepartment);
    majorApi.createMajor(newDepartment);
    setShowAdd(false);
  };
  const [showUpdate, setShowUpdate] = useState(false);
  const handleShowUpdate = (value) => {
    setDepartment(value);
    setShowUpdate(true);
  };
  const handleCloseUpdate = () => {
    setShowUpdate(false);
    setDepartment(null);
  };
  const handleUpdate = (value) => {
    departmentApi.updateDepartment(value);
    handleCloseUpdate();
  };
  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = (value) => {
    setDepartment(value);
    setShowDelete(true);
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
    setDepartment(null);
  };
  const handleDelete = (temp) => {
    departmentApi.deleteDepartment(temp);
    handleCloseDelete();
  };
  const columns = [
    {
      name: "code",
      label: "Code",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "name",
      label: "Department",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "parent",
      label: "Managed by",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return value != null ? `${value.code}` : "None";
        },
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

  const data1 = data.filter((block) => block.parent === null);

  const options1 = {
    filter: true,
    selectableRows: "none",
    filterType: "dropdown",
    onFilterChange: (changedColumn, filterList) => {
      console.log(changedColumn, filterList);
    },
    customToolbar: () => <HeaderElements />,
    rowsPerPage: 10,
    expandableRows: true,
    renderExpandableRow: (dataIndex, rowIndex) => {
      const tempPara = data1[rowIndex.rowIndex];
      const data2 = data.filter(function (department) {
        if (department.parent != null) {
          if (department.parent.id === tempPara.id) {
            return department;
          }
        }
      });
      console.log(data2);
      const options2 = {
        filter: true,
        selectableRows: "none",
        filterType: "dropdown",
        onFilterChange: (changedColumn, filterList) => {
          console.log(changedColumn, filterList);
        },
        rowsPerPage: 10,
        expandableRows: true,
        pagination: false,
        renderExpandableRow: (dataIndex, rowIndex) => {
          const rows = data3.filter(
            (major) => major.department === data2[rowIndex.rowIndex]
          );
          if (rows.length > 0) {
            return (
              <React.Fragment>
                <tr>
                  <td colSpan={6}>
                    <TableContainer component={Paper}>
                      <Table
                        style={{ minWidth: "650" }}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">Code</TableCell>
                            <TableCell align="center">Major</TableCell>
                            <TableCell align="center">Theory Credits</TableCell>
                            <TableCell align="center">Lab Credits</TableCell>
                            <TableCell align="center">Note</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow key={row.id}>
                              <TableCell align="center">{row.code}</TableCell>
                              <TableCell align="center">
                                {row.subject.name}
                              </TableCell>
                              <TableCell align="center">
                                {row.subject.theoryCredit}
                              </TableCell>
                              <TableCell align="center">
                                {row.subject.labCredit}
                              </TableCell>
                              <TableCell align="center">
                                {row.mandatory}
                              </TableCell>
                            </TableRow>
                          ))}
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
      if (data2.length == 0) {
        const tempDepartment = data1[rowIndex.rowIndex];
        const rowMajors = data3.filter(function (major) {
          if (major.department != null) {
            if (major.department.id === tempDepartment.id) {
              return major;
            }
          }
        });
        if (rowMajors.length > 0) {
          return (
            <React.Fragment>
              <tr>
                <td colSpan={6}>
                  <TableContainer component={Paper}>
                    <Table
                      style={{ minWidth: "650" }}
                      aria-label="simple table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Code</TableCell>
                          <TableCell align="center">Major</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rowMajors.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell align="center">{row.code}</TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </td>
              </tr>
            </React.Fragment>
          );
        }
      }
      if (data2 > 0) {
        return (
          <React.Fragment>
            <tr>
              <td colSpan={12}>
                <MUIDataTable
                  data={data2}
                  columns={columns}
                  options={options2}
                  components={{
                    TableToolbar(props) {
                      return null;
                    },
                  }}
                />
              </td>
            </tr>
          </React.Fragment>
        );
      }
    },
  };
  const options = {
    filterType: "checkbox",
    customToolbar: () => <HeaderElements />,
  };

  useEffect(() => {
    departmentApi.getAllDepartments().then((res) => {
      setData(res);
      majorApi.getAllMajors().then((res1) => {
        setData3(res1);
      });
    });
  }, []);

  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
        <MUIDataTable
          title={"Organization List"}
          data={data}
          columns={columns}
          options={options1}
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
                Add New Department
              </Typography>
              <FormGroup>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={8}>
                    <FormControl>
                      <Input
                        id="code"
                        aria-describedby="code"
                        onChange={(e) =>
                          setNewDepartment({
                            ...newDepartment,
                            code: e.target.value,
                          })
                        }
                        required
                      />
                      <FormLabel id="code" style={style.formStyle}>
                        Department code
                      </FormLabel>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <FormControl>
                      <Input
                        id="name"
                        aria-describedby="name"
                        onChange={(e) =>
                          setNewDepartment({
                            ...newDepartment,
                            name: e.target.value,
                          })
                        }
                        required
                      />
                      <FormLabel id="name" style={style.formStyle}>
                        Department name
                      </FormLabel>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <FormControl>
                      <Autocomplete
                        id="parent"
                        sx={{ width: 300 }}
                        options={data}
                        autoHighlight
                        onChange={(e, newValue) =>
                          setNewDepartment({
                            ...newDepartment,
                            parent: newValue,
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
                      <FormLabel id="parent" style={style.formStyle}>
                        School
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
                Update Department Profile
              </Typography>
              {department != null && (
                <FormGroup>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={8}>
                      <FormControl>
                        <Input
                          id="code"
                          aria-describedby="code"
                          value={department.code}
                          onChange={(e) =>
                            setDepartment({
                              ...department,
                              code: e.target.value,
                            })
                          }
                          required
                        />
                        <FormLabel id="code" style={style.formStyle}>
                          Department code
                        </FormLabel>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <FormControl>
                        <Input
                          id="name"
                          aria-describedby="name"
                          value={department.name}
                          onChange={(e) =>
                            setDepartment({
                              ...department,
                              name: e.target.value,
                            })
                          }
                          required
                        />
                        <FormLabel id="name" style={style.formStyle}>
                          Department name
                        </FormLabel>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <FormControl>
                        <Autocomplete
                          id="parent"
                          sx={{ width: 300 }}
                          options={data}
                          value={department.parent}
                          autoHighlight
                          onChange={(e, newValue) =>
                            setDepartment({
                              ...department,
                              parent: newValue,
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
                        <FormLabel id="parent" style={style.formStyle}>
                          School
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
                      onClick={(e) => handleUpdate(newDepartment)}
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
              {department != null && (
                <Typography style={{ fontSize: 15 }}>
                  Do you want to delete {department.name}?
                </Typography>
              )}
              {department == null && (
                <Typography style={{ fontSize: 15 }}>
                  The department you choose is undefined. Please check again!
                </Typography>
              )}
              <Grid container spacing={1} style={{ marginTop: 20 }}>
                <Grid item xs={6}>
                  <div style={{ textAlign: "right" }}>
                    {department != null && (
                      <Button
                        color="primary"
                        startIcon={<Delete />}
                        onClick={(e) => handleDelete(department.id)}
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

export default Department;
