import { GridRowModes, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { format, isValid, parseISO } from "date-fns";

export const columns = ({
  rowModesModel,
  handleEditClick,
  handleDeleteClick,
  handleSaveClick,
  handleCancelClick,
}) => [
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
    type: "date",
    valueFormatter: (params) => {
      if (!params.value) return "";
      const date = parseISO(params.value);
      return isValid(date) ? format(date, "yyyy-MM-dd") : "";
    },
    renderCell: (params) => {
      if (!params.value) return "";
      const date = isValid(params.value)
        ? params.value
        : parseISO(params.value);
      return isValid(date) ? format(date, "yyyy-MM-dd") : "";
    },
  },
  {
    field: "completed",
    headerName: "Completed",
    width: 100,
    editable: true,
    type: "boolean",
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
