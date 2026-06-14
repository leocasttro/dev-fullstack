import atendimentoData from '../data/atendimentos.json';
import { ListarAtendimentosParams, ListarAtendimentosResultado} from '../types/atendimentosTypes';
import {obterAtendimentosNormalizados} from "./atendimentosDataService";

export function listarAtendimentos(
    params: ListarAtendimentosParams
): ListarAtendimentosResultado {
    const atendimentos = obterAtendimentosNormalizados();

    const total = atendimentos.length;
    const totalPages = Math.ceil(total / params.limit);

    const startIndex = (params.page - 1) * params.limit;
    const endIndex = startIndex + params.limit;

    const data = atendimentos.slice(startIndex, endIndex);

    return {
        data,
        meta: {
            page: params.page,
            limit: params.limit,
            total,
            totalPages,
        },
    };
}