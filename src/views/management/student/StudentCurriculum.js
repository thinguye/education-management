import React, { useMemo, useState, useEffect } from "react";

//MRT Imports
import MUIDataTable from "mui-datatables";
import {
  Delete,
  Edit,
  Save,
  Cancel,
  DeleteForeverOutlined,
  Add,
  Visibility,
} from "@mui/icons-material";
//Material-UI Imports
//Icons Imports
import subjectApi from "../../../controller/SubjectController";
import enrollementApi from "../../../controller/EnrollementController";
import generationApi from "../../../controller/GenerationController";
import { styled, lighten, darken } from "@mui/system";
import {
  IconButton,
  Modal,
  Fade,
  Box,
  Typography,
  Backdrop,
  FormControl,
  FormGroup,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Input,
  InputAdornment,
  FormHelperText,
  Grid,
  Autocomplete,
  TextField,
  Button,
  Checkbox,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { render } from "@testing-library/react";
import { useParams } from "react-router-dom";
const StudentCurriculum = () => {
  const HeaderElements = () => (
    <>
      <IconButton
        onMouseEnter={() => setFocus(true)}
        onMouseLeave={() => setFocus(false)}
        onClick={(e) => handleShowAdd()}
      >
        <Add color={focus ? "primary" : "default"} />
      </IconButton>
    </>
  );
  const style = {
    boxStyle: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 700,
      bgcolor: "background.paper",
      border: "none",
      borderRadius: "12px",
      boxShadow: 24,
      p: 4,
    },
    formStyle: {
      marginTop: 2,
      marginBottom: 10,
    },
    textStyle: {
      fontSize: 20,
      marginBottom: 10,
    },
  };
  const cId = useParams();
  const [data, setData] = useState([]);
  const [focus, setFocus] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [newCurriculum, setNewCurriculum] = useState({
    id: useParams().id,
    subjects: [],
  });
  const [enrollement, setCurriculum] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const handleShowAdd = () => {
    setShowAdd(true);
  };
  const handleCloseAdd = () => {
    setShowAdd(false);
  };
  const handleAdd = () => {
    console.log(newCurriculum);
    enrollementApi.addSubjectToCurriculum(newCurriculum);
    setShowAdd(false);
  };
  const [showUpdate, setShowUpdate] = useState(false);
  const [value, setValue] = useState(null);
  const handleShowUpdate = (value) => {
    setCurriculum(value);
    setShowUpdate(true);
  };
  const handleCloseUpdate = () => {
    setShowUpdate(false);
    setCurriculum(null);
  };
  const handleUpdate = (value) => {};
  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = (value) => {
    setCurriculum(value);
    setShowDelete(true);
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
    setCurriculum(null);
  };
  const handleDelete = (temp) => {
    enrollementApi.deleteCurriculum(temp);
    handleCloseDelete();
  };
  const columns = [
    {
      name: "subject",
      label: "Subject code",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => <Typography>{value.subject.code}</Typography>,
      },
    },
    {
      name: "subject",
      label: "Subject title",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => <Typography>{value.subject.name}</Typography>,
      },
    },
    {
        name: "gradeLetter",
        label: "Grade",
        options: {
          filter: true,
          sort: true,
          customBodyRender: (value) => <Typography>{value.lecturer.lastName}</Typography>,
        },
      },

    {
      name: "credit",
      label: "Credit",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
            <>
              <IconButton
                color="primary"
                onClick={(e) => handleShowUpdate(data[dataIndex])}
              >
                <Edit />
              </IconButton>
              <IconButton
                color="error"
                onClick={(e) => handleShowDelete(data[dataIndex])}
              >
                <Delete />
              </IconButton>
            </>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    customToolbar: () => <HeaderElements />,
  };

  useEffect(() => {
    enrollementApi.getSubjectByStudent(cId.id).then((res) => {
      setData(res);
    });
  }, []);

  return (
    <>
      <div style={{ height: "100%", width: "100%" }}>
        <MUIDataTable
          title={"Subject List"}
          data={data}
          columns={columns}
          options={options}
        />
      </div>
    </>
  );
};

export default StudentCurriculum;
