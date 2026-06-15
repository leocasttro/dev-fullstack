import { Router } from "express";
import { listar } from "../controllers/listarAtendimentosController";
import {buscarPorCodigo} from "../controllers/buscarAtendimentoPorCodigoController";
import {metricas} from "../controllers/metricasAtendimentosController";
import {exportar} from "../controllers/exportarAtendimentosController";

const router = Router();

router.get('/', listar);
router.get('/metricas', metricas);
router.get('/export', exportar)
router.get('/:codigo', buscarPorCodigo);

export default router;