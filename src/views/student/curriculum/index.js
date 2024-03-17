import React, { useMemo, useState, useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";
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
  Check,
  CheckBox,
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
import { IconButton, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import CustomTable from "ui-component/CustomTable";
import { ThemeProvider } from "@mui/material";
import studentApi from "controller/StudentController";
const Curriculum = () => {
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
  const id = JSON.parse(sessionStorage.getItem("obj")).curriculum.id;
  const [data, setData] = useState([]);
  const [data3, setData3] = useState([]);
  const [value, setValue] = useState("1");
  const [focus, setFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const subjects = JSON.parse(sessionStorage.getItem("obj")).subjects;
  const conditions = JSON.parse(sessionStorage.getItem("obj")).conditions;
  const [requirements, setRequirements] = useState([]);
  const [enable, setEnable] = useState(false);
  const columns = [
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
        customBodyRender: (value) => (value == null ? "" : value.name),
      },
    },
  ];
  const columns1 = [
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
              backgroundColor: isLoading?"#ede7f6":"white",
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
              fontWeight: "550",
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: "12px",
            },
          },
        },
      },
    });
    const getMuiTheme3 = () =>
    createTheme({
      components:{
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: "12px",
            },
          },
        },
      }
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
    textLabels: {
      body: {
        noMatch: isLoading ? "Không có dữ liệu" : "Đang tải dữ liệu...",
      },
    },
    selectableRows: "none",
    filterType: "dropdown",
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
      const options2 = {
        filter: true,
        selectableRows: "none",
        filterType: "dropdown",
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
                              TC thực hành
                            </TableCell>
                            <TableCell style={{ fontWeight: "400" }}>
                              Phân loại
                            </TableCell>
                            <TableCell align="center" style={{ fontWeight: "400" }}>
                              Hoàn thành
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
                                {row.mandatory == "COMPULSORY"
                                  ? "Bắt buộc"
                                  : "Tự chọn"}
                              </TableCell>
                              <TableCell
                                align="center"
                                style={{ fontWeight: "400" }}
                              >
                                {subjects.some(
                                  (s) => s.id == row.subject.id
                                ) ? (
                                  <CheckIcon color="success" />
                                ) : (
                                  ""
                                )}
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
    rowsPerPage: 10,
    expandableRows: true,
    renderExpandableRow: (dataIndex, rowIndex) => {
      const rows = data[rowIndex.rowIndex].subjects;
      if (rows.length > 0) {
        return <CustomTable rows={rows} />;
      }
    },
  };

  const columns3 = [
    {
      name: "code",
      label: "Mã",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "name",
      label: "Điều kiện",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "",
      label: "Hoàn thành",
      options: {
        setCellHeaderProps: () => {
          return { align: "center" };
        },
        setCellProps: () => {
          return { align: "center" };
        },
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          if (conditions.some((c) => c.id == requirements[dataIndex].id))
            return <CheckIcon color="success" />;
          return "";
        },
      },
    },
  ];
  const options3 = {
    filter: true,
    textLabels: {
      body: {
        noMatch: isLoading ? "Không có dữ liệu" : "Đang tải dữ liệu...",
      },
    },
    selectableRows: "none",
    filterType: "dropdown",
  };
  useEffect(() => {
    subjectInBlockApi.getSubjectsInCurriculum(id).then((result) => {
      setData3(result);
      blockApi.getBlocksByCurriculum(id).then((res) => {
        setData(res);
      });
      curriculumApi.getCurriculumById(id).then((res1) => {
        setRequirements(res1.conditions);
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
        <ThemeProvider theme={getMuiTheme3()}>
          <MUIDataTable
            data={requirements}
            columns={columns3}
            options={options3}
          />
        </ThemeProvider>
      </div>
    </>
  );
};

export default Curriculum;
