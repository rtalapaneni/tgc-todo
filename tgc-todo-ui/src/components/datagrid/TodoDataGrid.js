import Box from "@mui/material/Box";
import {
  DataGrid,
  GridRowEditStopReasons,
  GridRowModes,
} from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo, deleteTodo } from "../todoSlice";
import { parseISO, isValid } from "date-fns";
import EditToolbar from "./EditToolbar";
import { columns } from "./columns";

const TodoDataGrid = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const [rows, setRows] = useState(todos);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    // Convert dueDate to Date object
    const updatedTodos = todos.map((todo) => ({
      ...todo,
      dueDate: todo.dueDate
        ? isValid(todo.dueDate)
          ? todo.dueDate
          : parseISO(todo.dueDate)
        : null,
    }));
    setRows(updatedTodos);
  }, [todos]);

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    dispatch(updateTodo(updatedRow));
    return updatedRow;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    dispatch(deleteTodo(id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns({
          rowModesModel,
          handleEditClick,
          handleDeleteClick,
          handleSaveClick,
          handleCancelClick,
        })}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
        }}
      />
    </Box>
  );
};

export default TodoDataGrid;
