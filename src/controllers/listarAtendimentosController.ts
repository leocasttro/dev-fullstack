import { Request, Response } from 'express';
import { listarAtendimentos } from '../services/listarAtendimentosService';
import { errorResponse, paginatedResponse } from '../utils/response';
import {filtrarAtendimentos} from "../services/filtrarAtendimentosService";

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

        const atendimentosFiltrados = filtrarAtendimentos({
            search: req.query.search as string | undefined,
            status: req.query.status as string | undefined,
            tipo: req.query.tipo as string | undefined,
            agendamentoRealizado: req.query.agendamentoRealizado as string | undefined,
            organizacao: req.query.organizacao as string | undefined,
            servico: req.query.servico as string | undefined,
            local: req.query.local as string | undefined,
        });

        const resultado = listarAtendimentos(
            atendimentosFiltrados,
            { page, limit }
        );

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