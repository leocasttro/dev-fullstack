import { Request, Response } from "express";
import { listarAtendimentos } from "../services/listarAtendimentosService";
import {successResponse, errorResponse, paginatedResponse} from "../utils/response";

export function listar(req: Request, res: Response) {
    try {
        const page = Number(req.query.page ?? 1);
        const limit = Number(req.query.limit ?? 10);

        if (!Number.isInteger(page) || page < 1) {
            return errorResponse(res, 400, 'O parâmetro page deve ser um número inteiro positivo');
        }

        if (!Number.isInteger(limit) || limit < 1) {
            return errorResponse(res, 400, 'O parâmetro limit deve ser um número inteiro positivo');
        }

        const resultado = listarAtendimentos({ page, limit});

        return paginatedResponse(
            res,
            200,
            'Atendimentos listados com sucesso',
            resultado.data,
            resultado.meta
            );
    } catch (error) {
        return errorResponse(res, 500, 'Erro ao listar atendimentos');
    }
}