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
} from "@mui/icons-material";
//Material-UI Imports
//Icons Imports
import subjectApi from "../../../controller/SubjectController";
import blockApi from "../../../controller/BlockController";
import curriculumApi from "../../../controller/CurriculumController";
import subjectInBlockApi from "../../../controller/SubjectInBlockController";
import { styled, lighten, darken } from "@mui/system";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  createTheme,
} from "@mui/material";
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
  Checkbox,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { render } from "@testing-library/react";
import { useParams } from "react-router-dom";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import CustomMuiDataTable from "ui-component/CustomMuiDataTable";
import CustomTable from "ui-component/CustomTable";
import { ThemeProvider } from "@mui/material";
const CurriculumDetails = () => {
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
  const cId = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [data3, setData3] = useState([]);
  const [value, setValue] = useState("1");
  const [focus, setFocus] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [enable, setEnable] = useState(false);
  const [newCurriculum, setNewCurriculum] = useState({
    id: useParams().id,
    subjects: [],
  });
  const [curriculum, setCurriculum] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const handleShowAdd = () => {
    setShowAdd(true);
  };
  const handleCloseAdd = () => {
    setShowAdd(false);
  };
  const handleAdd = () => {
    console.log(newCurriculum);
    curriculumApi.addSubjectToCurriculum(newCurriculum);
    setShowAdd(false);
  };
  const [showUpdate, setShowUpdate] = useState(false);
  const handleShowUpdate = (value) => {
    setCurriculum(value);
    setShowUpdate(true);
  };
  const handleCloseUpdate = () => {
    setShowUpdate(false);
    setCurriculum(null);
  };
  const handleUpdate = (value) => {};
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
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const columns = [
    {
      name: "code",
      label: "Mã khối",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "name",
      label: "Khối",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "credit",
      label: "Số tín chỉ",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "paraBlock",
      label: "Trực thuộc",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return <Typography>{value == null ? "" : value.name}</Typography>;
        },
      },
    },
    // {
    //   name: "action",
    //   label: "Action",
    //   options: {
    //     filter: true,
    //     sort: false,
    //     empty: true,
    //     customBodyRenderLite: (dataIndex, rowIndex) => {
    //       return (
    //         <>
    //           <IconButton
    //             color="primary"
    //             onClick={(e) => handleShowUpdate(data[dataIndex])}
    //           >
    //             <Edit />
    //           </IconButton>
    //           <IconButton
    //             color="secondary"
    //             onClick={(e) => handleShowDelete(data[dataIndex])}
    //           >
    //             <Delete />
    //           </IconButton>
    //         </>
    //       );
    //     },
    //   },
    // },
  ];
  const columns1 = [
    {
      name: "code",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "credit",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "paraBlock",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return value == null ? "" : value.name;
        },
      },
    },
    // {
    //   name: "action",
    //   options: {
    //     filter: true,
    //     sort: false,
    //     empty: true,
    //     customBodyRenderLite: (dataIndex, rowIndex) => {
    //       return (
    //         <>
    //           <IconButton
    //             color="primary"
    //             onClick={(e) => handleShowUpdate(data[dataIndex])}
    //           >
    //             <Edit />
    //           </IconButton>
    //           <IconButton
    //             color="secondary"
    //             onClick={(e) => handleShowDelete(data[dataIndex])}
    //           >
    //             <Delete />
    //           </IconButton>
    //         </>
    //       );
    //     },
    //   },
    // },
  ];

  // const options = {
  //   filterType: "checkbox",

  // };
  const data1 = data.filter((block) => block.paraBlock == null);
  const getMuiTheme2 = () =>
    createTheme({
      components: {
        MuiTable: {
          styleOverrides: {
            root: {
              minWidth: "100%",
            },
          },
        },
        MuiTableBody: {
          styleOverrides: {
            root: {
              backgroundColor: isLoading ? "#ede7f6" : "white",
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            paddingCheckbox: {
              display: "none",
            },
            root: {
              fontWeight: "550",
            },
          },
        },
      },
    });
  const getMuiTheme = () =>
    createTheme({
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              boxShadow: "none",
            },
          },
        },
        MuiTableHead: {
          styleOverrides: {
            root: {
              display: "none",
            },
          },
        },
        MuiTable: {
          styleOverrides: {
            root: {
              minWidth: "100%",
            },
          },
        },
        MuiTableBody: {
          styleOverrides: {
            root: {
              backgroundColor: "white",
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            paddingCheckbox: {
              display: "none",
            },
            root: {
              width: "max-content",
              fontWeight: enable ? "550" : "400",
            },
          },
        },
      },
    });
  const options1 = {
    filter: true,
    selectableRows: "none",
    filterType: "dropdown",
    textLabels: {
      body: {
        noMatch: isLoading ? "Không có dữ liệu" : "Đang tải dữ liệu...",
      },
    },
    onFilterChange: (changedColumn, filterList) => {
      console.log(changedColumn, filterList);
    },
    // customToolbar: () => <HeaderElements />,
    rowsPerPage: 10,
    expandableRows: true,
    rowsExpanded: data1.map((el, i) => {
      return i;
    }),
    renderExpandableRow: (dataIndex, rowIndex) => {
      const tempPara = data1[rowIndex.rowIndex];
      const data2 = data.filter(function (block) {
        if (block.paraBlock != null) {
          if (block.paraBlock.id === tempPara.id) {
            return block;
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
        rowsExpanded: data2.map((el, i) => {
          return i;
        }),
        renderExpandableRow: (dataIndex, rowIndex) => {
          const tempBlock = data2[rowIndex.rowIndex];
          const rows = data3.filter(function (s) {
            if (s.block.id === tempBlock.id) {
              return s;
            }
          });
          if (rows.length > 0) {
            setEnable(true);
            return (
              <>
                <tr>
                  <td colSpan={6}>
                    <TableContainer>
                      <Table style={{ minWidth: "100%" }}>
                        <TableHead style={{ display: "table-header-group" }}>
                          <TableRow>
                            <TableCell style={{ fontWeight: "400" }}>
                              Mã môn
                            </TableCell>
                            <TableCell style={{ fontWeight: "400" }}>
                              Tên môn học
                            </TableCell>
                            <TableCell style={{ fontWeight: "400" }}>
                              TC lý thuyết
                            </TableCell>
                            <TableCell style={{ fontWeight: "400" }}>
                              Tc thực hành
                            </TableCell>
                            <TableCell style={{ fontWeight: "400" }}>
                              Phân loại
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow key={row.id}>
                              <TableCell style={{ fontWeight: "400" }}>
                                {row.code}
                              </TableCell>
                              <TableCell style={{ fontWeight: "400" }}>
                                {row.subject.name}
                              </TableCell>
                              <TableCell style={{ fontWeight: "400" }}>
                                {row.subject.theoryCredit}
                              </TableCell>
                              <TableCell style={{ fontWeight: "400" }}>
                                {row.subject.labCredit}
                              </TableCell>
                              <TableCell style={{ fontWeight: "400" }}>
                                {row.mandatory}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </td>
                </tr>
              </>
            );
          } else {
            setEnable(true);
            return (
              <>
                <tr>
                  <td colSpan={6}>
                    <TableContainer>
                      <Table style={{ minWidth: "100%" }}>
                        <TableHead style={{ display: "table-header-group" }}>
                          <TableRow>
                            <TableCell style={{ fontWeight: "400" }}>
                              Mã môn
                            </TableCell>
                            <TableCell style={{ fontWeight: "400" }}>
                              Tên môn học
                            </TableCell>
                            <TableCell style={{ fontWeight: "400" }}>
                              TC lý thuyết
                            </TableCell>
                            <TableCell style={{ fontWeight: "400" }}>
                              Tc thực hành
                            </TableCell>
                            <TableCell style={{ fontWeight: "400" }}>
                              Phân loại
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell style={{ fontWeight: "400" }} align="center" colSpan={6}>
                              {{ isLoading }
                                ? "Không có dữ liệu"
                                : "Đang tải dữ liệu..."}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </td>
                </tr>
              </>
            );
          }
        },
      };
      return (
        <>
          <tr style={{ padding: "0", margin: "0" }}>
            <td colSpan="25%">
              <div style={{ height: "auto", width: "100%" }}>
                <ThemeProvider theme={getMuiTheme()}>
                  <MUIDataTable
                    data={data2}
                    columns={columns1}
                    options={options2}
                    components={{
                      TableToolbar(props) {
                        return null;
                      },
                    }}
                  />
                </ThemeProvider>
              </div>
            </td>
          </tr>
        </>
      );
      // return (
      //   <React.Fragment>
      //     <tr>
      //       <td colSpan={6}>
      //         <TableContainer component={Paper}>
      //           <Table style={{ minWidth: "650" }} aria-label="simple table">
      //             <TableHead>
      //               <TableRow>
      //                 <TableCell align="center">Subject code</TableCell>
      //                 <TableCell align="center">Title</TableCell>
      //                 <TableCell align="center">Theory Credits</TableCell>
      //                 <TableCell align="center">Lab Credits</TableCell>
      //                 <TableCell align="center">Note</TableCell>
      //               </TableRow>
      //             </TableHead>
      //             <TableBody>
      //               {rows.map((row) => (
      //                 <TableRow key={row.id}>
      //                   <TableCell align="center">{row.code}</TableCell>
      //                   <TableCell align="center">
      //                     {row.subject.name}
      //                   </TableCell>
      //                   <TableCell align="center">
      //                     {row.subject.theoryCredit}
      //                   </TableCell>
      //                   <TableCell align="center">
      //                     {row.subject.labCredit}
      //                   </TableCell>
      //                   <TableCell align="center">{row.mandatory}</TableCell>
      //                 </TableRow>
      //               ))}
      //             </TableBody>
      //           </Table>
      //         </TableContainer>
      //       </td>
      //     </tr>
      //   </React.Fragment>
      // );
    },
  };
  const options = {
    filter: true,
    selectableRows: "single",
    filterType: "dropdown",
    onFilterChange: (changedColumn, filterList) => {
      console.log(changedColumn, filterList);
    },
    customToolbar: () => <HeaderElements />,
    rowsPerPage: 10,
    expandableRows: true,
    renderExpandableRow: (dataIndex, rowIndex) => {
      const rows = data[rowIndex.rowIndex].subjects;
      if (rows.length > 0) {
        return <CustomTable rows={rows} />;
        // return (
        //   <React.Fragment>
        //     <tr>
        //       <td colSpan={6}>
        //         <TableContainer component={Paper}>
        //           <Table style={{ minWidth: "650" }} aria-label="simple table">
        //             <TableHead>
        //               <TableRow>
        //                 <TableCell align="center">Subject code</TableCell>
        //                 <TableCell align="center">Title</TableCell>
        //                 <TableCell align="center">Theory Credits</TableCell>
        //                 <TableCell align="center">Lab Credits</TableCell>
        //                 <TableCell align="center">Note</TableCell>
        //               </TableRow>
        //             </TableHead>
        //             <TableBody>
        //               {rows.map((row) => (
        //                 <TableRow key={row.id}>
        //                   <TableCell align="center">{row.code}</TableCell>
        //                   <TableCell align="center">
        //                     {row.subject.name}
        //                   </TableCell>
        //                   <TableCell align="center">
        //                     {row.subject.theoryCredit}
        //                   </TableCell>
        //                   <TableCell align="center">
        //                     {row.subject.labCredit}
        //                   </TableCell>
        //                   <TableCell align="center">{row.mandatory}</TableCell>
        //                 </TableRow>
        //               ))}
        //             </TableBody>
        //           </Table>
        //         </TableContainer>
        //       </td>
        //     </tr>
        //   </React.Fragment>
        // );
      }
    },
  };

  const columns3 = [
    {
      name: "code",
      label: "Mã",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "name",
      label: "Điều kiện",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];
  const options3 = {
    filter: true,
    selectableRows: "none",
    filterType: "dropdown",
    textLabels: {
      body: {
        noMatch: isLoading?"Không có dữ liệu":"Đang tải dữ liệu...",
      }
    }
  };
  useEffect(() => {
    subjectInBlockApi.getSubjectsInCurriculum(cId.id).then((result) => {
      setData3(result);
      blockApi.getBlocksByCurriculum(cId.id).then((res) => {
        setData(res);
        setNewCurriculum({ ...newCurriculum, subjects: res });
      });
      curriculumApi.getCurriculumById(cId.id).then((res) => {
        setRequirements(res.conditions);
      });
      setIsLoading(true);
    });
  }, []);

  return (
    <>
      <div style={{ height: "auto", width: "100%" }}>
        <ThemeProvider theme={getMuiTheme2()}>
          <MUIDataTable data={data1} columns={columns} options={options1} />
        </ThemeProvider>
      </div>
      {/* <CustomMuiDataTable data={data}></CustomMuiDataTable> */}
      <div style={{ height: "auto", width: "100%", marginTop: "1%" }}>
        <MUIDataTable
          data={requirements}
          columns={columns3}
          options={options3}
        />
      </div>

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
            <Typography style={style.textStyle}>Add New Subject</Typography>
            <FormGroup>
              <FormControl>
                <Autocomplete
                  multiple
                  id="subject"
                  sx={{ width: 300 }}
                  options={subjects}
                  value={newCurriculum.subjects}
                  getOptionSelected={(option, value) => option === value}
                  onChange={(e, newValue) => {
                    console.log(newValue);
                    setNewCurriculum({
                      ...newCurriculum,
                      subjects: newValue,
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
                <FormLabel id="subject" style={style.formStyle}>
                  Subjects
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
    </>
  );
};

export default CurriculumDetails;
