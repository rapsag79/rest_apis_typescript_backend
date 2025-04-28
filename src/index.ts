import color from "colors";
import server from "./server";

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(color.cyan.bold(`Server running on port ${port}`));
});