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
import { BarChart, PieChart } from "@mui/icons-material";
import GraduationStatistics from "./GraduationStatistics";
import RadialBarGraduation from "./RadialBarGraduation";
const Dashboard = () => {
  var token = sessionStorage.getItem("token");
  const [students, setStudents] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const [undergraduated, setUndergraduated] = useState(0);
  const [graduated, setGraduated] = useState(0);
  const [leaved, setLeaved] = useState(0);
  const [ielts, setIelts] = useState(0);
  const [qp, setQp] = useState(0);
  const [credit, setCredit] = useState(0);
  const [ieltsButDone, setIeltsButDone] = useState(0);
  const [qpButDone, setQpButDone] = useState(0);
  const [waiting, setWaiting] = useState(0);
  useEffect(() => {
    // studentApi.getAllStudents().then((result) => {
    //   setStudents(result);
    // });
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
            <TotalGrowthBarChart isLoading={isLoading} />
          </Grid>
          {/* <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid> */}
          <Grid item xs={12} md={6} sm={6} lg={6}>
            <GraduationStatistics
              isLoading={isLoading}
              data={[undergraduated, waiting, graduated, leaved]}
              category={["Incomplete", "Completed", "Graduated", "Leaved"]}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={6} sm={12} lg={6}>
            <RadialBarGraduation
              isLoading={isLoading}
              data={[ielts, qp, undergraduated]}
              category={["IELTS 6.0", "Milirity", "Incomplete"]}
              title="Causes of undergraduating"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
