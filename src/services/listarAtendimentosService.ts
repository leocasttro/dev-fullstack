import { Atendimento, ListarAtendimentosParams, ListarAtendimentosResultado } from '../types/atendimentosTypes';

export function listarAtendimentos(
    atendimentos: Atendimento[],
    params: ListarAtendimentosParams
): ListarAtendimentosResultado {
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