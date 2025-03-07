import Box from "@mui/material/Box";
import {
  DataGrid
} from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "Id", width: 90 },
  {
    field: "title",
    headerName: "Title",
    width: 150,
    editable: true,
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 150,
    editable: true,
  },
  {
    field: "completed",
    headerName: "Completed",
    width: 110,
    editable: true,
  },
];

const TodoDataGrid = ({ todos }) => {
  
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={todos}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default TodoDataGrid;
