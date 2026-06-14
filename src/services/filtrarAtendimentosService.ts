import {Atendimento, FiltrarAtendimentosParams} from "../types/atendimentosTypes";
import {obterAtendimentosNormalizados} from "./atendimentosDataService";

function normalizarTexto(valor: string | number | null): string {
    return String(valor ?? '').toLocaleLowerCase().trim();
}

function contemTexto(valor: string | number | null, busca: string ): boolean {
    return normalizarTexto(valor).includes(normalizarTexto(busca));
}

function atendeBuscaTextual(atendimento: Atendimento, search?: string): boolean {
    if (!search) return true;

    return [
        atendimento.codigoAgendamento,
        atendimento.nomeAssistido,
        atendimento.cpfAssistido,
        atendimento.responsavelAgendamento,
        atendimento.organizacao,
        atendimento.servico,
        atendimento.local,
    ].some((campo) => contemTexto(campo, search));
}

export function filtrarAtendimentos(filtros: FiltrarAtendimentosParams): Atendimento[] {
    const atendimentos = obterAtendimentosNormalizados();

    return atendimentos.filter((atendimento) => {
        const correspondeSearch = atendeBuscaTextual(atendimento, filtros.search);

        const correspondeStatus = !filtros.status || contemTexto(atendimento.status, filtros.status);

        const correspondeTipo = !filtros.tipo || contemTexto(atendimento.tipo, filtros.tipo);

        const correspondeRealizado = !filtros.agendamentoRealizado || contemTexto(
            atendimento.agendamentoRealizado, filtros.agendamentoRealizado);

        const correspondeOrganizacao = !filtros.organizacao || contemTexto(atendimento.organizacao,
            filtros.organizacao);

        const correspondeServico = !filtros.servico || contemTexto(atendimento.servico, filtros.servico);

        const correspondeLocal = !filtros.local || contemTexto(atendimento.local, filtros.local);

        return (
            correspondeSearch &&
            correspondeStatus &&
            correspondeTipo &&
            correspondeRealizado &&
            correspondeOrganizacao &&
            correspondeServico &&
            correspondeLocal
        );
    });
}