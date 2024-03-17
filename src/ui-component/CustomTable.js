import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    Paper,
  } from "@mui/material";

const CustomTable = ({rows}) => {
    return (
      <React.Fragment>
        <tr>
          <td colSpan={6}>
            <TableContainer component={Paper}>
              <Table style={{ minWidth: "650" }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Subject code</TableCell>
                    <TableCell align="center">Title</TableCell>
                    <TableCell align="center">Theory Credits</TableCell>
                    <TableCell align="center">Lab Credits</TableCell>
                    <TableCell align="center">Note</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell align="center">{row.code}</TableCell>
                      <TableCell align="center">{row.subject.name}</TableCell>
                      <TableCell align="center">
                        {row.subject.theoryCredit}
                      </TableCell>
                      <TableCell align="center">
                        {row.subject.labCredit}
                      </TableCell>
                      <TableCell align="center">{row.mandatory}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </td>
        </tr>
      </React.Fragment>
    );
};
export default CustomTable;
