import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
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
const RadialBarGraduation = ({ isLoading, data, category, title }) => {
  const [value, setValue] = useState("today");
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

  const [undergraduated, setUndergraduated] = useState(0);
  const [graduated, setGraduated] = useState(0);
  const [leaved, setLeaved] = useState(0);
  const [ielts, setIelts] = useState(0);
  const [qp, setQp] = useState(0);
  const [credit, setCredit] = useState(0);
  const [ieltsButDone, setIeltsButDone] = useState(0);
  const [qpButDone, setQpButDone] = useState(0);
  const [waiting, setWaiting] = useState(0);

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
  useEffect(() => {
    studentApi.getUndergraduateStudent().then((res) => {
      setIelts(res.ielts);
      setQp(res.qp);
      setCredit(res.credit);
      setUndergraduated(res.undergraduate);
      setGraduated(res.graduated);
      setIeltsButDone(res.ieltsButDone);
      setQpButDone(res.qpButDone);
      setLeaved(res.leaved);
      setWaiting(res.waiting);
    });
    // do not load chart when loading
    if (!isLoading) {
      ApexCharts.exec(`pie`, "updateOptions");
    }
  }, []);
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
      height: 400,
      type: "radialBar",
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
      floating: true,
      fontSize: "16px",
      position: "left",
      offsetX: 50,
      offsetY: 25,
      labels: {
        colors: grey500,
        useSeriesColors: true,
      },
      markers: {
        size: 0,
      },
      formatter: function (seriesName, opts) {
        return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
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
