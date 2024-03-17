import { useEffect, useState } from "react";

// material-ui
import { Grid, Typography } from "@mui/material";

import { gridSpacing } from "store/constant";
// ==============================|| DEFAULT DASHBOARD ||============================== //
import subjectInQuarterApi from "controller/SubjectInQuarterController";
import resultApi from "controller/ResultController";
import generationApi from "controller/GenerationController";
import Credit from "./Credit";
import Subjects from "./Subjects";
import TimeTable from "./TimeTable";
import RateSubjects from "./RateSubjects";
import NoStudent from "./NoStudent";
const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const statusList = [
    { value: null, name: "Tất cả" },
    { value: "INCOMPLETE", name: "Đang theo học" },
    { value: "COMPLETED", name: "Đã hoàn thành chương trình" },
    { value: "LEAVED", name: "Bỏ học" },
  ];
  const id = JSON.parse(sessionStorage.getItem("obj")).id;
  const [subjects, setSubjects] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [teachingSubjects, setTeachingSubjects] = useState([]);
  const [subjectsInQuarter, setSubjectInQuarter] = useState([]);
  const [totalStudent, setTotalStudent] = useState(0);
  const [numberSubject, setNumberSubject] = useState(0);
  const [curriculum, setCurriculum] = useState(null);
  const [numberStudent, setNumberStudent] = useState([]);
  const [complexData, setComplexData] = useState([]);
  const [subjectNames,setSubjectNames] = useState([])
  const [credits, setCredits] = useState({});
  useEffect(() => {
    subjectInQuarterApi.getNoStudents(id, "", "").then((result) => {
      setTotalStudent(result.total);
      setNumberStudent(result.noStudentAll);
      setComplexData([
        result.passStudents.map(g=>g.toFixed()),
        result.failStudents.map(g=>g.toFixed()),
        result.notGradeStudents.map(g=>g.toFixed()),
        result.gpa.map(g=>g.toFixed(2)),
      ]);
      setSubjectNames(result.subjects);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      generationApi.getAllGenerations().then((res2) => {
        var ele = { id: null, name: "Tất cả" };
        res2.unshift(ele);
        setGenerations(res2);
      });
      subjectInQuarterApi.getDistinctSubjectsByLecture(id).then((res) => {
        setNumberSubject(res.length);
        var ele = { id: null, name: "Tất cả" };
        res.unshift(ele);
        setSubjects(res);
      });
      subjectInQuarterApi.getTeachingSubjects(id).then((res1) => {
        setTeachingSubjects(res1);
      });
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
                data={isLoading ? 0 : numberSubject}
                title="Môn đã dạy"
              />
            </Grid>
            {/* <Grid item sm={3} xs={12}>
                <Credit isLoading={isLoading} data={isLoading?"":student.gpa.toFixed(2)} title="GPA" />
              </Grid> */}
            <Grid item sm={3} xs={12}>
              <Credit
                isLoading={isLoading}
                data={isLoading ? 0 : teachingSubjects.length}
                title="Môn đang dạy"
              />
            </Grid>
            <Grid item sm={3} xs={12}>
              <Credit
                isLoading={isLoading}
                data={isLoading ? 0 : totalStudent}
                title="Sinh viên đã dạy"
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
            <Grid item xs={12}>
              <TimeTable
                isLoading={isLoading}
                subjectsInQuarter={teachingSubjects}
              />
            </Grid>
            {/* <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid> */}
            <Grid item xs={12} sm={6}>
              <RateSubjects
                id={id}
                isLoading={isLoading}
                category={["Đạt", "Chưa đạt", "Chưa có điểm"]}
                tempSubjects={subjects}
                numberStudents={numberStudent}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} sm={12}>
            <NoStudent isLoading={isLoading} category={subjectNames} complexData={complexData}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
