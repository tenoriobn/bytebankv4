import app from "./app.js";
import { createConnection } from "./database.js";

createConnection();
app.listen(8000, () => {
  console.log("Servidor rodando em http://localhost:8000");
});
