import { Box, Card, CardContent, Typography } from "@mui/material";

const TodoCard = ({ count, cardType }) => {
  const getCardStyle = () => {
    switch (cardType) {
      case "Completed":
        return { backgroundColor: "lightgreen" };
      case "Past Due":
        return { backgroundColor: "lightcoral" };
      case "Due":
        return { backgroundColor: "lightyellow" };
      default:
        return {};
    }
  };

  return (
    <Card style={getCardStyle()}>
      <CardContent align="center">
        <Typography variant="h5">{cardType}</Typography>
        <Typography variant="subtitle1">{count} Todos</Typography>
      </CardContent>
    </Card>
  );
};

export default TodoCard;
