import { Router } from "express";
import { getSaldo, updateSaldo } from "../controllers/saldo.controller.js";
const router = Router();

router.get("/users/:id/saldo", getSaldo);
router.put("/users/:id/saldo", updateSaldo);

export default router;
