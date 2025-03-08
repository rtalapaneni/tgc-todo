import { Grid2 } from "@mui/material";
import TodoCard from "./TodoCard";

const TodoCards = ({ todos }) => {
  const completedCount = todos.filter((todo) => todo.completed).length;
  const pastDueCount = todos.filter(
    (todo) => !todo.completed && new Date(todo.dueDate) < new Date()
  ).length;
  const dueCount = todos.filter(
    (todo) => !todo.completed && new Date(todo.dueDate) >= new Date()
  ).length;

  return (
    <Grid2 container spacing={1}>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <TodoCard count={pastDueCount} cardType="Past Due" />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <TodoCard count={dueCount} cardType="Due" />
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 4 }}>
        <TodoCard count={completedCount} cardType="Completed" />
      </Grid2>
    </Grid2>
  );
};

export default TodoCards;
