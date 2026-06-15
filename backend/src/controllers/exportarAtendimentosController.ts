import { Request, Response } from 'express';
import { exportarAtendimentos } from '../services/exportarAtendimentosService';
import { errorResponse, successResponse } from '../utils/response';

export function exportar(req: Request, res: Response) {
    try {
        const resultado = exportarAtendimentos({
            search: req.query.search as string | undefined,
            status: req.query.status as string | undefined,
            tipo: req.query.tipo as string | undefined,
            agendamentoRealizado: req.query.agendamentoRealizado as string | undefined,
            organizacao: req.query.organizacao as string | undefined,
            servico: req.query.servico as string | undefined,
            local: req.query.local as string | undefined,
        });

        return successResponse(
            res,
            200,
            'Dados para exportação carregados com sucesso',
            resultado
        );
    } catch (error) {
        return errorResponse(res, 500, 'Erro ao carregar dados para exportação');
    }
}