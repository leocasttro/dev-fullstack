import atendimentoData from '../data/atendimentos.json';

type AtendimentoOriginal = {
    Códigodoagendamento: number;
    Datadoagendamento: string;
    Horainício: string;
    Horafim: string;
    CPFdoassistido: string;
    Nomedoassistido: string;
    Organização: string | null;
    Serviço: string | null;
    Local: string | null;
    Responsávelpeloagendamento: string | null;
    Criadopor: string | null;
    Datadecriação: string | null;
    Atualizadopor: string | null;
    Datadeatualização: string | null;
    Agendamentorealizado: string;
    Tipo: string;
    Status: string;
};

export type Atendimento = {
    codigoAgendamento: number;
    dataAgendamento: string;
    horaInicio: string;
    horaFim: string;
    cpfAssistido: string;
    nomeAssistido: string;
    organizacao: string | null;
    servico: string | null;
    local: string | null;
    responsavelAgendamento: string | null;
    criadoPor: string | null;
    dataCriacao: string | null;
    atualizadoPor: string | null;
    dataAtualizacao: string | null;
    agendamentoRealizado: string;
    tipo: string;
    status: string;
};

function normalizarAtendimento(atendimento: AtendimentoOriginal): Atendimento {
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
    }
}

export function listarAtendimentos(): Atendimento[] {
    return atendimentoData.agendamentos.map(normalizarAtendimento);
}