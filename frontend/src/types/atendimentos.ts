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

export type PaginationMeta = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};

export type ApiResponse<T> = {
    success: boolean;
    message: string;
    data: T;
    meta: PaginationMeta | null;
};

export type AtendimentosFilters = {
    search: string;
    status: string;
    tipo: string;
    agendamentoRealizado: string;
    organizacao: string;
    servico: string;
    local: string;
};

export type ContagemPorCampo = {
    nome: string;
    total: number;
};

export type MetricasAtendimentos = {
    totalAgendamentos: number;
    totalRealizados: number;
    totalNaoRealizados: number;
    totalConcluidos: number;
    totalCancelados: number;
    receitaTotal: number;
    percentualRealizados: number;
    porStatus: ContagemPorCampo[];
    porTipo: ContagemPorCampo[];
    porOrganizacao: ContagemPorCampo[];
    porData: ContagemPorCampo[];
    evolucaoMensal: ContagemPorCampo[];
    porResponsavel: ContagemPorCampo[];
};