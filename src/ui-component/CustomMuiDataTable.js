import React from "react";
import CustomTable from "./CustomTable";
import MUIDataTable from "mui-datatables";
import { Typography } from "@mui/material";

const CustomMuiDataTable = ({ data }) => {
  const HeaderElements = () => <></>;
  const columns1 = [
    {
      name: "code",
      label: "Block code",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "name",
      label: "Title",
      options: {
        filter: true,
        sort: true,
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
    // {
    //   name: "action",
    //   label: "Action",
    //   options: {
    //     filter: true,
    //     sort: false,
    //     empty: true,
    //     customBodyRenderLite: (dataIndex, rowIndex) => {
    //       return (
    //         <>
    //           <IconButton
    //             color="primary"
    //             onClick={(e) => handleShowUpdate(data[dataIndex])}
    //           >
    //             <Edit />
    //           </IconButton>
    //           <IconButton
    //             color="secondary"
    //             onClick={(e) => handleShowDelete(data[dataIndex])}
    //           >
    //             <Delete />
    //           </IconButton>
    //         </>
    //       );
    //     },
    //   },
    // },
  ];
  const columns2 = [
    {
      name: "code",
      label: "Block code",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "name",
      label: "Title",
      options: {
        filter: true,
        sort: true,
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
      name: "paraBlock",
      label: "Directly under",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return <Typography>{value == null ? "" : value.name}</Typography>;
        },
      },
    },
    // {
    //   name: "action",
    //   label: "Action",
    //   options: {
    //     filter: true,
    //     sort: false,
    //     empty: true,
    //     customBodyRenderLite: (dataIndex, rowIndex) => {
    //       return (
    //         <>
    //           <IconButton
    //             color="primary"
    //             onClick={(e) => handleShowUpdate(data[dataIndex])}
    //           >
    //             <Edit />
    //           </IconButton>
    //           <IconButton
    //             color="secondary"
    //             onClick={(e) => handleShowDelete(data[dataIndex])}
    //           >
    //             <Delete />
    //           </IconButton>
    //         </>
    //       );
    //     },
    //   },
    // },
  ];
  const options2 = {
    filter: true,
    selectableRows: "single",
    filterType: "dropdown",
    onFilterChange: (changedColumn, filterList) => {
      console.log(changedColumn, filterList);
    },
    customToolbar: () => <HeaderElements />,
    rowsPerPage: 10,
    expandableRows: true,
    renderExpandableRow: (dataIndex, rowIndex) => {
      const rows = data[rowIndex.rowIndex].subjects;
      if (rows.length > 0) {
        return <CustomTable rows={rows} />;
      }
    },
  };
  const data1 = data.filter((block) => block.paraBlock == null);
  const options1 = {
    filter: true,
    filterType: "dropdown",
    onFilterChange: (changedColumn, filterList) => {
      console.log(changedColumn, filterList);
    },
    customToolbar: () => <HeaderElements />,
    expandableRows: true,
    renderExpandableRow: (dataIndex, rowIndex) => {
      const tempPara = data1[rowIndex.rowIndex];
      const data2 = data.filter(function (block) {
        if (block.paraBlock != null) {
          if (block.paraBlock.id === tempPara.id) {
            return block;
          }
        }
      });
      return (
        <MUIDataTable
          data={data2}
          columns={columns1}
          options={options2}
          style={{ height: "auto", width: "100%" }}
        />
      );
    },
  };

  return <MUIDataTable data={data1} columns={columns1} options={options1} />;
};
export default CustomMuiDataTable;
