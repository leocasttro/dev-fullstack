import atendimentoData from "../data/atendimentos.json";
import { normalizarAtendimento } from "../mappers/atendimentosMapper";
import { Atendimento, AtendimentosDatabase } from "../types/atendimentosTypes";

const database = atendimentoData as AtendimentosDatabase;

export function obterAtendimentosNormalizados(): Atendimento[] {
    return database.agendamentos.map(normalizarAtendimento);
}