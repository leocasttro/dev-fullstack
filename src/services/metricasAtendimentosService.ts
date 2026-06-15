import {Atendimento, ContagemPorCampo, MetricasAtendimentos} from "../types/atendimentosTypes";
import {obterAtendimentosNormalizados} from "./atendimentosDataService";

function normalizarValorMetrica(valor: string | null): string {
    return valor && valor.trim() ? valor : 'Não informado';
}

function contarPorCampo(
    atendimentos: Atendimento[],
    obterValor: (atendimento: Atendimento) => string | null
): ContagemPorCampo[] {
    const contagem = new Map<string, number>();

    atendimentos.forEach((atendimento) => {
        const nome = normalizarValorMetrica(obterValor(atendimento));
        const totalAtual = contagem.get(nome) ?? 0;

        contagem.set(nome, totalAtual + 1);
    });

    return Array.from(contagem.entries())
        .map(([nome, total]) => ({ nome, total }))
        .sort((a, b) => b.total - a.total);
}

function calcularPercentual(parte: number, total: number): number {
    if (total === 0) return 0;

    return Number(((parte / total) * 100).toFixed(2));
}

function obterMesAno(data: string): string {
    const [mes, , ano] = data.split('/');

    return `${ano}-${mes.padStart(2, '0')}`;
}

export function calcularMetricasAtendimentos(): MetricasAtendimentos {
    const atendimentos = obterAtendimentosNormalizados();

    const totalAgendamentos = atendimentos.length;

    const totalRealizados = atendimentos.filter(
        (atendimento) => atendimento.agendamentoRealizado === 'Sim'
    ).length;

    const totalNaoRealizados = atendimentos.filter(
        (atendimento) => atendimento.agendamentoRealizado === 'Não'
    ).length;

    return {
        totalAgendamentos,
        totalRealizados,
        totalNaoRealizados,
        totalConcluidos: totalRealizados,
        totalCancelados: totalNaoRealizados,
        receitaTotal: 0,
        percentualRealizados: calcularPercentual(
            totalRealizados,
            totalAgendamentos
        ),
        porStatus: contarPorCampo(
            atendimentos,
            (atendimento) => atendimento.status
        ),
        porTipo: contarPorCampo(
            atendimentos,
            (atendimento) => atendimento.tipo
        ),
        porOrganizacao: contarPorCampo(
            atendimentos,
            (atendimento) => atendimento.organizacao
        ),
        porData: contarPorCampo(
            atendimentos,
            (atendimento) => atendimento.dataAgendamento
        ),
        evolucaoMensal: contarPorCampo(
            atendimentos,
            (atendimento) => obterMesAno(atendimento.dataAgendamento)
        ),
        porResponsavel: contarPorCampo(
            atendimentos,
            (atendimento) => atendimento.responsavelAgendamento
        )
    };
}