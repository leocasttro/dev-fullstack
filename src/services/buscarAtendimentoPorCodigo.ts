import { obterAtendimentosNormalizados } from './atendimentosDataService';
import { Atendimento } from '../types/atendimentosTypes';

export function buscarAtendimentoPorCodigo(codigo: number): Atendimento | null {
    const atendimentos = obterAtendimentosNormalizados();

    return atendimentos.find(
        (atendimento) => atendimento.codigoAgendamento === codigo
    ) ?? null;
}