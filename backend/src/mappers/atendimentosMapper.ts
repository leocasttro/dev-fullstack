import { Atendimento, AtendimentoOriginal } from "../types/atendimentosTypes";

export function normalizarAtendimento(
    atendimento: AtendimentoOriginal
): Atendimento {
    return {
        codigoAgendamento: atendimento.Códigodoagendamento,
        dataAgendamento: atendimento.Datadoagendamento,
        horaInicio: atendimento.Horainício,
        horaFim: atendimento.Horafim,
        cpfAssistido: atendimento.CPFdoassistido,
        nomeAssistido: atendimento.Nomedoassistido,
        organizacao: atendimento.Organização,
        servico: atendimento.Serviço,
        local: atendimento.Local,
        responsavelAgendamento: atendimento.Responsávelpeloagendamento,
        criadoPor: atendimento.Criadopor,
        dataCriacao: atendimento.Datadecriação,
        atualizadoPor: atendimento.Atualizadopor,
        dataAtualizacao: atendimento.Datadeatualização,
        agendamentoRealizado: atendimento.Agendamentorealizado,
        tipo: atendimento.Tipo,
        status: atendimento.Status,
    };
}