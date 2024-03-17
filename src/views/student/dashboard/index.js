import { useEffect, useState } from "react";

// material-ui
import { Grid, Typography } from "@mui/material";

import { gridSpacing } from "store/constant";
// ==============================|| DEFAULT DASHBOARD ||============================== //
import studentApi from "controller/StudentController";
import resultApi from "controller/ResultController";
import Credit from "./Credit";
import CurriclumProgress from "./CurriclumProgress";
import Subjects from "./Subjects";
import TimeTable from "views/lecturer/TimeTable";
const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const statusList = [
    { value: null, name: "Tất cả" },
    { value: "INCOMPLETE", name: "Đang theo học" },
    { value: "COMPLETED", name: "Đã hoàn thành chương trình" },
    { value: "LEAVED", name: "Bỏ học" },
  ];
  const id = JSON.parse(sessionStorage.getItem("obj")).id;
  const [student, setStudent] = useState(null);
  const [subjectsInQuarter, setSubjectInQuarter] = useState([])
  const [curriculum, setCurriculum] = useState(null);
  useEffect(() => {
    studentApi.getStudentById(id).then((res) => {
      setStudent(res);
      setCurriculum(res.curriculum);
      resultApi.getSubjectInLastQuarterByStudent(id).then((result)=>{
        setSubjectInQuarter(result);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
    });
  }, []);

  return (
    <>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={3} xs={12}>
                <Credit
                  isLoading={isLoading}
                  data={isLoading?"":student.actualCredit}
                  title="Số tín chỉ tích lũy"
                />
              </Grid>
              <Grid item sm={3} xs={12}>
                <Credit isLoading={isLoading} data={isLoading?"":student.gpa.toFixed(2)} title="GPA" />
              </Grid>
              <Grid item sm={3} xs={12}>
                <Credit
                  isLoading={isLoading}
                  data={isLoading?"":student.subjects.length}
                  title="Số môn đã học"
                />
              </Grid>
              <Grid item sm={3} xs={12}>
                <Credit
                  isLoading={isLoading}
                  data={isLoading?"":subjectsInQuarter.length}
                  title="Số môn đang học"
                />
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
          <Grid item xs={12} sm={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={6}>
                <TimeTable isLoading={isLoading} subjectsInQuarter={subjectsInQuarter}/>
              </Grid>
              {/* <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid> */}
              <Grid item xs={12} sm={6}><CurriclumProgress isLoading={isLoading} category={["Đã hoàn thành", "Chưa hoàn thành"]} id={id}/></Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} md={6} sm={12} lg={6}></Grid>
            </Grid>
          </Grid>
        </Grid>
    </>
  );
};

export default Dashboard;
