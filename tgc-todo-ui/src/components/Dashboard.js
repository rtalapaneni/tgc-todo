import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTodos } from "./todoSlice";
import TodoCards from "./summary/TodoCards";
import TodoDataGrid from "./datagrid//TodoDataGrid";


const Dashboard = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);

  useEffect(() => {
      dispatch(fetchTodos());
    }, [dispatch]);

  return (
    <div>
      <TodoCards todos={todos} />
      <TodoDataGrid />
    </div>
  );
}

export default Dashboard;