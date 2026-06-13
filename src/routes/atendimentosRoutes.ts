import { Router } from "express";
import { listar } from "../controllers/listarAtendimentosController";

const router = Router();

router.get('/', listar);

export default router;