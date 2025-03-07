import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTodos } from "./todoSlice";
import TodoCards from "./TodoCards";
import TodoDataGrid from "./TodoDataGrid";


const Dashboard = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);

  useEffect(() => {
      dispatch(fetchTodos());
    }, [dispatch]);

  return (
    <div>
      <TodoCards todos={todos} />
      <TodoDataGrid todos={todos} />
    </div>
  );
}

export default Dashboard;