import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Grid, MenuItem, TextField, Typography } from "@mui/material";

// third-party
import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";

// project imports
import SkeletonTotalGrowthBarChart from "ui-component/cards/Skeleton/TotalGrowthBarChart";
import MainCard from "ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import studentApi from "controller/StudentController";
// chart data
import chartData from "./chart-data/total-growth-bar-chart";

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({ isLoading, generations }) => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);

  const { navType } = customization;
  const { primary } = theme.palette.text;
  const darkLight = theme.palette.dark.light;
  const grey200 = theme.palette.grey[200];
  const grey500 = theme.palette.grey[500];
  const generationList = generations.filter((g) => {
    if (g != null && g.id != null) return g;
  });
  const primary200 = theme.palette.primary[200];
  const primaryDark = theme.palette.primary.dark;
  const secondaryMain = theme.palette.secondary.main;
  const secondaryLight = theme.palette.secondary.light;
  const options = {
    colors: [primary200, primaryDark, secondaryMain, secondaryLight],
    chart: {
      id: "bar-chart",
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
      },
    },
    xaxis: {
      labels: {
        style: {
          colors: [
            primary,
            primary,
            primary,
            primary,
            primary,
            primary,
            primary,
            primary,
            primary,
            primary,
            primary,
            primary,
          ],
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary],
          },
        },
      },
      type: "category",
      categories: generationList.map((g) => g.name),
    },
    legend: {
      show: true,
      fontSize: "14px",
      fontFamily: `'Roboto', sans-serif`,
      position: "bottom",
      labels: {
        useSeriesColors: false,
        colors: grey500,
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
    fill: {
      type: "solid",
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: true,
      borderColor: grey200,
    },
    tooltip: {
      theme: "light",
    },
  };

  const [data,setData] = useState([])
  const series = [
    {
      name: "Quản trị kinh doanh",
      data: data[0],
    },
    {
      name: "Công nghệ thông tin",
      data: data[1],
    },
    {
      name: "Kỹ thuật",
      data: data[2],
    },
    {
      name: "Điều dưỡng",
      data: data[3],
    },
  ];
  useEffect(() => {
    studentApi.getTotalStudents().then((res)=>{
      setData(res)
    })
    // do not load chart when loading
    if (!isLoading) {
      ApexCharts.exec(`bar-chart`, "updateOptions");
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
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
                      <Typography variant="h3">Tổng số sinh viên</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Chart
                options={options}
                series={series}
                type="bar"
                height={400}
              />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

TotalGrowthBarChart.propTypes = {
  isLoading: PropTypes.bool,
};

export default TotalGrowthBarChart;
