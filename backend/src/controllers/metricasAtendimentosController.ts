import { Request, Response} from "express";
import {calcularMetricasAtendimentos} from "../services/metricasAtendimentosService";
import {errorResponse, successResponse} from "../utils/response";

export function metricas(req: Request, res: Response) {
    try {
        const resultado = calcularMetricasAtendimentos();

        return successResponse(res, 200, 'Metricas calculadas com sucesso', resultado);
    } catch (error) {
        return errorResponse(res, 500, 'Erro ao calcular metricas')
    }
}