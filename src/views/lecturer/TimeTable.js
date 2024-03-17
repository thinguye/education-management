import PropTypes from "prop-types";
import { useState } from "react";
import dayjs from "dayjs";
// material-ui
import { styled, useTheme } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  Avatar,
  Box,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
} from "@mui/material";

// project imports
import MainCard from "ui-component/cards/MainCard";

// assets
import EarningIcon from "assets/images/icons/earning.svg";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import GetAppTwoToneIcon from "@mui/icons-material/GetAppOutlined";
import FileCopyTwoToneIcon from "@mui/icons-material/FileCopyOutlined";
import PictureAsPdfTwoToneIcon from "@mui/icons-material/PictureAsPdfOutlined";
import ArchiveTwoToneIcon from "@mui/icons-material/ArchiveOutlined";
import EarningCard from "ui-component/cards/Skeleton/EarningCard";
import GraduationStatistics from "ui-component/cards/Skeleton/GraduationStatistics";
import { gridSpacing } from "store/constant";
import MUIDataTable from "mui-datatables";
import { TableRow } from "@mui/material";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: theme.palette.grey[500],
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.primary.light,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: "#fff",
  overflow: "hidden",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: "50%",
    top: -85,
    right: -95,
    [theme.breakpoints.down("sm")]: {
      top: -105,
      right: -140,
    },
  },
  "&:before": {
    content: '""',
    position: "absolute",
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: "50%",
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down("sm")]: {
      top: -155,
      right: -70,
    },
  },
}));
// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const TimeTable = ({ isLoading, subjectsInQuarter }) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isLoading ? (
        <GraduationStatistics />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Typography variant="h3">Thời khóa biểu</Typography>
            </Grid>
            <Grid item xs={12} alignItems="right">
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Mã môn</StyledTableCell>
                      <StyledTableCell>Tên môn</StyledTableCell>
                      <StyledTableCell>Thời gian</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  {subjectsInQuarter.length>0?(
                  <TableBody>
                    {subjectsInQuarter.map((row) => (
                      <StyledTableRow key={row.id}>
                        <StyledTableCell component="th" scope="row">
                          {row.subject.code}
                        </StyledTableCell>
                        <StyledTableCell>{row.subject.name}</StyledTableCell>

                        {row.timeTable.map((detail) => (
                          <TableRow>
                            <StyledTableCell>
                              {detail.time} {detail.day} Từ{" "}
                              {dayjs(detail.from).format("DD/MM/YYYY")} đến{" "}
                              {dayjs(detail.to).format("DD/MM/YYYY")}
                            </StyledTableCell>
                          </TableRow>
                        ))}
                      </StyledTableRow>
                    ))}
                  </TableBody>):(<TableBody>
                      <StyledTableRow >
                        <StyledTableCell align="center" component="th" scope="row" colSpan={3}>
                          Không có dữ liệu
                        </StyledTableCell>
                      </StyledTableRow>
                  </TableBody>)}
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

TimeTable.propTypes = {
  isLoading: PropTypes.bool,
};

export default TimeTable;
