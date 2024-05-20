import * as XLSX from "xlsx";

const downloadExcel = (data, columns) => {
  const workbook = XLSX.utils.book_new();

  const dataWithHeaders = [
    columns.map((column) => column.headerName),
    ...data.map((row) => columns.map((column) => row[column.field])),
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(dataWithHeaders);

  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  XLSX.writeFile(workbook, "DataGrid.xlsx");
};

export default downloadExcel;
