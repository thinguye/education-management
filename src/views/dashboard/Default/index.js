import { useEffect, useState } from "react";

// material-ui
import { Grid } from "@mui/material";

// project imports
import EarningCard from "./EarningCard";
import PopularCard from "./PopularCard";
import TotalOrderLineChartCard from "./TotalOrderLineChartCard";
import TotalIncomeDarkCard from "./TotalIncomeDarkCard";
import TotalIncomeLightCard from "./TotalIncomeLightCard";
import TotalGrowthBarChart from "./TotalGrowthBarChart";
import { gridSpacing } from "store/constant";
import AuthLogin from "../../pages/authentication/auth-forms/AuthLogin";
import useToken from "useToken";
// ==============================|| DEFAULT DASHBOARD ||============================== //
import studentApi from "controller/StudentController";
import generationApi from "controller/GenerationController";
import departmentApi from "controller/DepartmentController";
import { BarChart, PieChart } from "@mui/icons-material";
import GraduationStatistics from "./GraduationStatistics";
import RadialBarGraduation from "./RadialBarGraduation";
const Dashboard = () => {
  var token = sessionStorage.getItem("token");
  const [isLoading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);
  const statusList = [
    { value: null, name: "Tất cả" },
    { value: "INCOMPLETE", name: "Đang theo học" },
    { value: "COMPLETED", name: "Đã hoàn thành chương trình" },
    { value: "LEAVED", name: "Bỏ học" },
  ];
  const [generations, setGenerations] = useState([]);
  useEffect(() => {
    generationApi.getAllGenerations().then((res) => {
      var ele = { id: null, name: "Tất cả" };
      res.unshift(ele);
      setGenerations(res);
      departmentApi.getAllDepartments().then((result) => {
        var temp = { id: null, name: "Tất cả" };
        result.unshift(temp);
        setDepartments(result);
      });
    });
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} md={3} sm={3} xs={12}>
            <EarningCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={3} sm={3} xs={12}>
            <EarningCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={3} sm={3} xs={12}>
            <EarningCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={3} md={3} sm={3} xs={12}>
            <TotalOrderLineChartCard isLoading={isLoading} />
          </Grid>
          {/* <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeDarkCard isLoading={isLoading} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeLightCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid> */}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={6} sm={6} lg={6}>
            <TotalGrowthBarChart isLoading={isLoading} generations={generations} />
          </Grid>
          {/* <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid> */}
          <Grid item xs={12} md={6} sm={6} lg={6}>
            <GraduationStatistics
              isLoading={isLoading}
              category={["Đang theo học", "Đã hoàn thành", "Đã tốt nghiệp", "Bỏ học"]}
              generations={generations}
              departments={departments}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={6} sm={12} lg={6}>
            <RadialBarGraduation
              isLoading={isLoading}
              category={["IELTS 6.0", "Quốc phòng", "Chưa đủ tín chỉ"]}
              title="Chưa đủ điều kiện tốt nghiệp"
              generations={generations}
              departments={departments}
              statusList={statusList}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
