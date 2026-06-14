export type AtendimentoOriginal = {
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

export type AtendimentosDatabase = {
    agendamentos: AtendimentoOriginal[];
};

export type ListarAtendimentosParams = {
    page: number;
    limit: number;
};

export type ListarAtendimentosResultado = {
    data: Atendimento[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};

export type FiltrarAtendimentosParams = {
    search?: string;
    status?: string;
    tipo?: string;
    agendamentoRealizado?: string;
    organizacao?: string;
    servico?: string;
    local?: string;
};
