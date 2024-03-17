import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Autocomplete,
  Button,
  Grid,
  Icon,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import studentApi from "controller/StudentController";
// third-party
import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";
// project imports
import SkeletonGraduationStatistics from "ui-component/cards/Skeleton/GraduationStatistics";
import MainCard from "ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import { PieChart } from "@mui/x-charts";
import { Download, Filter, FilterAlt } from "@mui/icons-material";
import Department from "views/management/department";

const CurriclumProgress = ({ id, isLoading, category }) => {
  const statusList = [
    {
      value: "all",
      name: "Tất cả",
    },
    {
      value: "compulsory",
      name: "Bắt buộc",
    },
    {
      value: "elective",
      name: "Tự chọn",
    },
  ];
  const theme = useTheme();
  const [status, setStatus] = useState(statusList[0]);
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

  //   useEffect(() => {
  //     const newChartData = {
  //       ...chartData.options,
  //       colors: [primary200, primaryDark, secondaryMain, secondaryLight],
  //       xaxis: {
  //         labels: {
  //           style: {
  //             colors: [
  //               primary,
  //               primary,
  //               primary,
  //               primary,
  //               primary,
  //               primary,
  //               primary,
  //               primary,
  //               primary,
  //               primary,
  //               primary,
  //               primary,
  //             ],
  //           },
  //         },
  //       },
  //       yaxis: {
  //         labels: {
  //           style: {
  //             colors: [primary],
  //           },
  //         },
  //       },
  //       grid: {
  //         borderColor: grey200,
  //       },
  //       tooltip: {
  //         theme: "light",
  //       },
  //       legend: {
  //         labels: {
  //           colors: grey500,
  //         },
  //       },
  //     };

  //     // do not load chart when loading
  //     if (!isLoading) {
  //       ApexCharts.exec(`bar-chart`, "updateOptions", newChartData);
  //     }
  //   }, [
  //     navType,
  //     primary200,
  //     primaryDark,
  //     secondaryMain,
  //     secondaryLight,
  //     primary,
  //     darkLight,
  //     grey200,
  //     isLoading,
  //     grey500,
  //   ]);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  useEffect(() => {
    studentApi.getCredits(id).then((res) => {
      setData([res.completeCredit, res.credit - res.completeCredit]);
      setData1([
        res.completeCredit,
        res.credit - res.completeCredit,
      ]);
      setData2([
        res.completeCompulsory,
        res.compulsory - res.completeCompulsory,
      ]);
      setData3([
        res.completeElective,
        res.elective - res.completeElective,
      ]);
    });
    // do not load chart when loading
    if (!isLoading) {
      ApexCharts.exec(`pie`, "updateOptions");
    }
  }, []);
  const handleChange = (newValue) => {
    if (newValue == "all") {
      setData(data1);
    } else if (newValue == "compulsory") {
      setData(data2);
    } else setData(data3);
  };

  const options = {
    chart: {
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 500,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
      toolbar: {
        show: false,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true | '<img src="/static/icons/reset.png" width="20">',
          customIcons: [],
        },
      },
    },
    colors: [primary200, primaryMain, secondaryMain, grey500],
    tooltip: {
      theme: "light",
      enabled: true,
      enabledOnSeries: undefined,
      shared: true,
      followCursor: false,
      intersect: false,
      inverseOrder: false,
      custom: undefined,
      hideEmptySeries: true,
      fillSeriesColor: false,
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
      onDatasetHover: {
        highlightDataSeries: false,
      },
      items: {
        display: "flex",
      },
      fixed: {
        enabled: false,
        position: "topRight",
        offsetX: 0,
        offsetY: 0,
      },
    },
    legend: {
      show: true,
      fontSize: "14px",
      fontFamily: `'Roboto', sans-serif`,
      position: "bottom",
      labels: {
        colors: grey500,
        useSeriesColors: false,
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5,
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8,
      },
    },
    plotOptions: {
      pie: {
        size: 100,
      },
    },
    height: 400,
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
        fontFamily: "Roboto, sans-serif",
        fontWeight: "normal",
      },
    },
    labels: category,
  };
  return (
    <>
      {isLoading ? (
        <SkeletonGraduationStatistics />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="h3">Tình trạng sinh viên</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} alignItems="right">
              <Grid container spacing={gridSpacing}alignItems="right">
                <Grid item xs={12} sm={8}>
                  <Autocomplete
                    value={status}
                    options={statusList}
                    onChange={(event, newValue) => {
                      setStatus(newValue);
                      handleChange(newValue.value);
                    }}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField {...params} label="Phân loại" />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} alignItems="center">
              <Chart options={options} series={data} type="donut" />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

CurriclumProgress.propTypes = {
  isLoading: PropTypes.bool,
};

export default CurriclumProgress;
