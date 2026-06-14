import { Router } from "express";
import { listar } from "../controllers/listarAtendimentosController";
import {buscarPorCodigo} from "../controllers/buscarAtendimentoPorCodigoController";

const router = Router();

router.get('/', listar);
router.get('/:codigo', buscarPorCodigo);

export default router;