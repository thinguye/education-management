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
const RadialBarGraduation = ({
  isLoading,
  category,
  title,
  generations,
  departments,
  statusList,
}) => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const [generation, setGeneration] = useState(generations[0]);
  const [department, setDepartment] = useState(departments[0]);
  const [status, setStatus] = useState(statusList[0]);
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
    studentApi.getCertificateByFilter("", "", "").then((res) => {
      setData(res);
    });
    // do not load chart when loading
    if (!isLoading) {
      ApexCharts.exec(`pie`, "updateOptions");
    }
  }, []);

  const handleChange = (newValue) => {
    studentApi
      .getCertificateByFilter(
        newValue == null ? "" : newValue,
        department == null ? "" : department.id == null ? "" : department.id,
        status.value == null ? "" : status.value
      )
      .then((res) => {
        setData(res);
      });
  };

  const handleChange1 = (newValue) => {
    studentApi
      .getCertificateByFilter(
        generation == null ? "" : generation.id == null ? "" : generation.id,
        newValue == null ? "" : newValue,
        status.value == null ? "" : status.value
      )
      .then((res) => {
        setData(res);
      });
  };
  const handleChange2 = (newValue) => {
    studentApi
      .getCertificateByFilter(
        generation == null ? "" : generation.id == null ? "" : generation.id,
        department == null ? "" : department.id == null ? "" : department.id,
        newValue == null ? "" : newValue
      )
      .then((res) => {
        setData(res);
      });
  };
  const radialBarChartConfig = {
    chart: {
      height: 380,
      type: "radialBar",
    },
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
    colors: [secondaryMain, secondary200, secondaryLight],
    plotOptions: {
      radialBar: {
        size: 185,
        hollow: {
          size: "40%",
        },
        track: {
          margin: 10,
        },
      },
    },
    legend: {
      show: true,
      position: "bottom",
      labels: {
        colors: grey500,
        useSeriesColors: false,
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: category,
  };

  const options = {
    chart: {
      height: 500,
      type: "radialBar",
    },
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
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "30%",
          background: "transparent",
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
      },
    },
    stroke: {
      lineCap: "round",
    },
    colors: [primaryMain, secondary200, "#39539E"],
    labels: category,
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
        vertical: 3,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false,
          },
        },
      },
    ],
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
                      <Typography variant="h3">{title}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={4} alignItems="right">
              <Autocomplete
                value={generation}
                options={generations}
                onChange={(event, newValue) => {
                  setGeneration(newValue);
                  handleChange(newValue.id);
                }}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="Khóa" />}
              />
            </Grid>
            <Grid item xs={12} sm={4} alignItems="right">
              <Autocomplete
                value={department}
                options={departments}
                onChange={(event, newValue) => {
                  setDepartment(newValue);
                  handleChange1(newValue.id);
                }}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="Khoa" />}
              />
            </Grid>
            <Grid item xs={12} sm={4} alignItems="right">
              <Autocomplete
                value={status}
                options={statusList}
                onChange={(event, newValue) => {
                  setStatus(newValue);
                  handleChange2(newValue.value);
                }}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField {...params} label="Trạng thái" />
                )}
              />
            </Grid>
            <Grid item xs={12} alignItems="center">
              <Chart options={options} series={data} type="radialBar" />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

RadialBarGraduation.propTypes = {
  isLoading: PropTypes.bool,
};

export default RadialBarGraduation;
