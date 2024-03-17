import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Card, Grid, Typography } from "@mui/material";
import studentApi from "controller/StudentController";
// project imports
import MainCard from "ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
const Information = () => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const { navType } = customization;
  const { primary } = theme.palette.text;
  const darkLight = theme.palette.dark.light;
  const grey200 = theme.palette.grey[200];
  const grey500 = theme.palette.grey[500];

  const primary200 = theme.palette.primary[200];
  const primaryLight = theme.palette.primary.light;
  const primaryDark = theme.palette.primary.dark;
  const primaryMain = theme.palette.primary.main;
  const secondaryMain = theme.palette.secondary.main;
  const secondaryLight = theme.palette.secondary.light;
  const secondary200 = theme.palette.secondary[200];
  const [isLoading, setIsLoading] = useState(false);
  const id = JSON.parse(sessionStorage.getItem("obj")).id;
  const [data, setData] = useState({});
  useEffect(() => {
    studentApi.getStudentById(id).then((res) => {
      setData(res);
      setIsLoading(true);
    });
  }, {});

  return (
    <>
      <div style={{ height: "auto", width: "100%" }}>
        <Card>
          <Grid container width="100%">
            <Grid container spacing={2}>
              <Grid item xs={12} bgcolor={secondaryLight}>
                <Typography padding="24px" variant="h4" color={secondaryMain}>
                  Thông tin sinh viên
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} padding="24px">
                <Grid item xs={4} sm={2}>
                  <Typography>Mã số SV</Typography>
                </Grid>
                <Grid item xs={8} sm={10}>
                  <Typography>{data.code}</Typography>
                </Grid>
                <Grid item xs={4} sm={2}>
                  <Typography>Họ và tên</Typography>
                </Grid>
                <Grid item xs={8} sm={10}>
                  <Typography>
                    {data.lastName} {data.middleName} {data.firstName}
                  </Typography>
                </Grid>

                <Grid item xs={4} sm={2}>
                  <Typography>Ngày sinh</Typography>
                </Grid>
                <Grid item xs={8} sm={10}>
                  <Typography>{data.code}</Typography>
                </Grid>
                <Grid item xs={4} sm={2}>
                  <Typography>Giới tính</Typography>
                </Grid>
                <Grid item xs={8} sm={10}>
                  <Typography>
                    {data.gender == "FEMALE" ? "Nữ" : "Nam"}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </div>
      <div style={{ height: "auto", width: "100%", marginTop: "1%" }}>
        <Card>
          <Grid container width="100%">
            <Grid container spacing={2}>
              <Grid item xs={12} bgcolor={secondaryLight}>
                <Typography padding="24px" variant="h4" color={secondaryMain}>
                  Thông tin khóa học
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} padding="24px">
                <Grid item xs={4} sm={2}>
                  <Typography>Mã số SV</Typography>
                </Grid>
                <Grid item xs={8} sm={10}>
                  <Typography>{data.code}</Typography>
                </Grid>
                <Grid item xs={4} sm={2}>
                  <Typography>Họ và tên</Typography>
                </Grid>
                <Grid item xs={8} sm={10}>
                  <Typography>
                    {data.lastName} {data.middleName} {data.firstName}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </div>
    </>
  );
};

export default Information;
