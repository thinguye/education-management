import React, { useMemo, useState, useEffect } from "react";

//MRT Imports
import MUIDataTable from "mui-datatables";
//Material-UI Imports
//Icons Imports
import resultApi from "../../../controller/ResultController";
import { createTheme } from "@mui/material/styles";
import studentApi from "../../../controller/StudentController";
import { useParams } from "react-router-dom";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
const StudentResult = () => {
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
  const getMuiTheme = () =>
    createTheme({
      components: {
        MuiTableHead: {
          styleOverrides: {
            root: {
              display: "none",
            },
          },
        },
        MuiTableBody: {
          styleOverrides: {
            root: {
              backgroundColor: enable ? "#ede7f6" : "white",
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            paddingCheckbox: {
              display: "none",
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
  const id = useParams().id;
  const [data, setData] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [enable, setEnable] = useState(false);
  const columns = [
    {
      name: "title",
      label: "",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (dataIndex, rowIndex) => {
          return `${data[rowIndex.rowIndex].quarter.name} ${
            data[rowIndex.rowIndex].quarter.year.name
          }    GPA: ${data[rowIndex.rowIndex].gpa}   Credits: ${
            data[rowIndex.rowIndex].credit
          }`;
        },
      },
    },
    {
      name: "quarter",
      label: "Quarter",
      options: {
        filter: true,
        sort: true,
        display: "none",
        customBodyRender: (value) => {
          return value == null ? "" : `${value.name}`;
        },
      },
    },
    {
      name: "quarter",
      label: "Year",
      options: {
        filter: true,
        sort: true,
        display: "none",
        customBodyRender: (value) => {
          return value == null ? "" : `${value.year.name}`;
        },
      },
    },
    {
      name: "gpa",
      label: "GPA",
      options: {
        filter: true,
        sort: true,
        display: "none",
        customBodyRender: (value) => {
          return value == null ? "" : `${value.toFixed(2)}`;
        },
      },
    },
    {
      name: "credit",
      label: "Credits",
      options: {
        display: "none",
        filter: true,
        sort: true,
      },
    },
  ];
  const options = {
    selectableRows: "none",
    filterType: "dropdown",
    onFilterChange: (changedColumn, filterList) => {
      console.log(changedColumn, filterList);
    },
    expandableRows: true,
    rowsExpanded: data.map((el, i) => {
      return i;
    }),
    renderExpandableRow: (dataIndex, rowIndex) => {
      const rows = data[rowIndex.dataIndex].enrollments;
      setEnable(true);
      if (rows.length > 0) {
        return (
          <React.Fragment>
            <tr>
              <td colSpan={6}>
                <TableContainer style={{ backgroundColor: "white !important" }}>
                  <Table style={{ minWidth: "650" }} aria-label="simple table">
                    <TableHead
                      style={{
                        display: "table-header-group",
                        backgroundColor: "white",
                      }}
                    >
                      <TableRow>
                        <TableCell>Subject code</TableCell>
                        <TableCell>Subject</TableCell>
                        <TableCell>GPA</TableCell>
                        <TableCell>Grade</TableCell>
                        <TableCell>Credits</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody style={{ backgroundColor: "white" }}>
                      {rows.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.subject.subject.code}</TableCell>
                          <TableCell>{row.subject.subject.name}</TableCell>
                          <TableCell>
                            {row.grade != null ? row.grade.toFixed(2) : ""}
                          </TableCell>
                          <TableCell>{row.gradeLetter}</TableCell>
                          <TableCell>
                            {row.subject.subject.theoryCredit +
                              row.subject.subject.labCredit}
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
      } else {
        return (
          <React.Fragment>
            <tr>
              <td colSpan={6}>
                <TableContainer style={{ backgroundColor: "white !important" }}>
                  <Table style={{ minWidth: "650" }} aria-label="simple table">
                    <TableHead
                      style={{
                        display: "table-header-group",
                        backgroundColor: "white",
                      }}
                    >
                      <TableRow>
                        <TableRow>
                          <TableCell>Subject code</TableCell>
                          <TableCell>Subject</TableCell>
                          <TableCell>GPA</TableCell>
                          <TableCell>Grade</TableCell>
                          <TableCell>Credits</TableCell>
                        </TableRow>
                      </TableRow>
                    </TableHead>
                    <TableBody style={{ backgroundColor: "white" }}>
                      <TableRow>
                        <TableCell align="center" colSpan={6}>
                          Sorry, no matching records found
                        </TableCell>
                      </TableRow>
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
  const columns1 = [
    {
      name: "name",
      label: "Condition",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return value == null ? "" : `${value.name} ${value.year.name}`;
        },
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return value == null ? "" : `${value.toFixed(2)}`;
        },
      },
    },
    {
      name: "credit",
      label: "Credits",
      options: {
        filter: true,
        sort: true,
      },
    },
  ];
  const options1 = {
    filter: true,
    selectableRows: "none",
    filterType: "dropdown",
  };

  useEffect(() => {
    studentApi.getStudentById(id).then((result) => {
      setConditions(result.conditions);
      resultApi.getResultsByStudent(id).then((res) => {
        setData(res);
      });
    });
  }, []);

  return (
    <>
      <div style={{ height: "auto", width: "100%" }}>
        <ThemeProvider id="theme1" theme={getMuiTheme()}>
          <MUIDataTable data={data} columns={columns} options={options} />
        </ThemeProvider>
      </div>
      <div style={{ height: "auto", width: "100%", marginTop: "1%" }}>
        <MUIDataTable data={conditions} columns={columns1} options={options1} />
      </div>
    </>
  );
};

export default StudentResult;
