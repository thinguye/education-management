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
import chartData from "./chart-data/graduation-statistics";
// project imports
import SkeletonGraduationStatistics from "ui-component/cards/Skeleton/GraduationStatistics";
import MainCard from "ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import { PieChart } from "@mui/x-charts";
import { Download, Filter, FilterAlt } from "@mui/icons-material";
import Department from "views/management/department";

const status = [
  {
    value: "today",
    label: "Today",
  },
  {
    value: "month",
    label: "This Month",
  },
  {
    value: "year",
    label: "This Year",
  },
];
const GraduationStatistics = ({
  isLoading,
  category,
  generations,
  departments,
}) => {
  const [value, setValue] = useState("today");
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const [generation, setGeneration] = useState(generations[0]);
  const [department, setDepartment] = useState(departments[0]);
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
  useEffect(() => {
    studentApi.getStatusByFilter("", "", "").then((res) => {
      setData(res);
    });
    // do not load chart when loading
    if (!isLoading) {
      ApexCharts.exec(`pie`, "updateOptions");
    }
  }, []);
  const handleChange = (newValue) => {
    studentApi
      .getStatusByFilter(
        newValue.id == null ? "" : newValue.id,
        department.id == null ? "" : department.id
      )
      .then((res) => {
        setData(res);
      });
  };

  const handleChange1 = (newValue) => {
    studentApi
      .getStatusByFilter(
        generation.id == null ? "" : generation.id,
        newValue.id == null ? "" : newValue.id
      )
      .then((res) => {
        setData(res);
      });
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
        show: true,
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
      position: "right",
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
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={6} alignItems="right">
                  <Autocomplete
                    value={generation}
                    options={generations}
                    onChange={(event, newValue) => {
                      setGeneration(newValue);
                      handleChange(newValue);
                    }}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField {...params} label="Khóa" />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} alignItems="right">
                  <Autocomplete
                    value={department}
                    options={departments}
                    onChange={(event, newValue) => {
                      setDepartment(newValue);
                      handleChange1(newValue);
                    }}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField {...params} label="Khoa" />
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

GraduationStatistics.propTypes = {
  isLoading: PropTypes.bool,
};

export default GraduationStatistics;
