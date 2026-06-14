import { Request, Response } from 'express';
import {buscarAtendimentoPorCodigo} from "../services/buscarAtendimentoPorCodigo";
import {errorResponse, successResponse} from "../utils/response";

export function buscarPorCodigo(req: Request, res: Response) {
    try {
        const codigo = Number(req.params.codigo);

        if (!Number.isInteger(codigo) || codigo < 1) {
            return errorResponse(res, 400, 'O parâmetro codigo deve ser um número inteiro positivo');
        }

        const resultado = buscarAtendimentoPorCodigo(codigo);

        if (!resultado) {
            return errorResponse(res, 404, 'Não foi encontrado agendamento');
        }

        return successResponse(
            res,
            200,
            'Atendimento encontrado com sucesso',
            resultado
        );
    } catch (error) {
        return errorResponse(res, 500, 'Erro ao buscar atendimento');
    }
}