import express from "express";
import cors from "cors";
import userRoutes from "./routes/user-routes.js";
import transationRoutes from "./routes/transations-routes.js";
import saldoRoutes from "./routes/saldo-routes.js";
import { validateToken } from "./validators.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use(userRoutes);
app.use(transationRoutes);
app.use(saldoRoutes);
app.use(/^(?!\/(users|transacoes|saldo)).*$/, validateToken);

export default app;
