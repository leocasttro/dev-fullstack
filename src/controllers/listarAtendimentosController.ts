import { Request, Response } from "express";
import { listarAtendimentos } from "../services/listarAtendimentosService";
import { successResponse, errorResponse } from "../utils/response";

export function listar(req: Request, res: Response) {
    try {
        const atendimentos = listarAtendimentos();

        return successResponse(res, 200, 'Atendimentos listados com sucesso', atendimentos);
    } catch (error) {
        return errorResponse(res, 500, 'Erro ao listar atendimentos');2
    }
}