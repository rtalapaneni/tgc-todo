import { Card, CardContent, Typography } from "@mui/material";

const TodoCard = ({ count, cardType }) => {
  
  const getCardStyleClass = () => {
    switch (cardType) {
      case "Completed":
        return "completed";
      case "Past Due":
        return "past-due";
      case "Due":
        return "due";
      default:
        return "";
    }
  };

  return (
    <Card className={getCardStyleClass()}>
      <CardContent align="center">
        <Typography variant="h5">{cardType}</Typography>
        <Typography variant="subtitle1">{count} Todos</Typography>
      </CardContent>
    </Card>
  );
};

export default TodoCard;
