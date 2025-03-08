import { GridRowModes, GridToolbarContainer } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import { addTodo } from "../todoSlice";

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;
  const dispatch = useDispatch();

  const handleClick = () => {
    const id = Math.floor(1000 + Math.random() * 9000);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const newTodo = {
      id,
      title: "",
      description: "",
      dueDate: format(tomorrow, "yyyy-MM-dd"),
      completed: false,
      isNew: true,
    };
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

export default EditToolbar;
