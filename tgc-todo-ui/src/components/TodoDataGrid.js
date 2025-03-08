import Box from "@mui/material/Box";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { randomId } from "@mui/x-data-grid-generator";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { addTodo, updateTodo, deleteTodo } from './todoSlice';
import { format, isValid, parseISO, parse } from 'date-fns';

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;
  const dispatch = useDispatch();

  const handleClick = () => {
    const id = randomId();
    const newTodo = { id, title: "", description: "", dueDate: format(new Date(), 'yyyy-MM-dd'), completed: false, isNew: true };
    setRows((oldRows) => [...oldRows, newTodo]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "title" },
    }));
    dispatch(addTodo(newTodo));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

const TodoDataGrid = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const [rows, setRows] = useState(todos);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    // Convert dueDate to Date object
    const updatedTodos = todos.map(todo => ({
      ...todo,
      dueDate: todo.dueDate ? parseISO(todo.dueDate) : null
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
    dispatch(updateTodo({
      ...updatedRow,
      dueDate: updatedRow.dueDate ? format(parse(updatedRow.dueDate, 'yyyy-MM-dd', new Date()), 'yyyy-MM-dd') : null
    }));
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

  const columns = [
    { field: "id", headerName: "Id", width: 100 },
    {
      field: "title",
      headerName: "Title",
      width: 200,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 500,
      editable: true,
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 150,
      editable: true,
      type: 'date',
      valueFormatter: (params) => {
        if (!params.value) return '';
        const date = parseISO(params.value);
        return isValid(date) ? format(date, 'yyyy-MM-dd') : '';
      },
      renderCell: (params) => {
        if (!params.value) return '';
        const date = isValid(params.value) ? params.value : parseISO(params.value);
        return isValid(date) ? format(date, 'yyyy-MM-dd') : '';
      },
    },
    {
      field: "completed",
      headerName: "Completed",
      width: 100,
      editable: true,
      type: 'boolean',
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
  
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
  
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        pageSize={5}
        rowsPerPageOptions={[5]}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
};

export default TodoDataGrid;