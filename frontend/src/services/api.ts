import type {
    ApiResponse,
    Atendimento,
    AtendimentosFilters,
    MetricasAtendimentos,
} from '../types/atendimentos';

const API_BASE_URL = 'http://localhost:3000/api';

function buildQueryParams(params: Record<string, string | number | undefined>) {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            searchParams.append(key, String(value));
        }
    });

    return searchParams.toString();
}

async function request<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Erro ao buscar dados da API');
    }

    return data;
}

export async function getAtendimentos(filters: AtendimentosFilters, page: number, limit: number) {
    const query = buildQueryParams({
        ...filters,
        page,
        limit,
    });

    return request<Atendimento[]>(`/atendimentos?${query}`);
}

export async function getMetricas() {
    return request<MetricasAtendimentos>('/atendimentos/metricas');
}

export async function getAtendimentosParaExportacao(filters: AtendimentosFilters) {
    const query = buildQueryParams(filters);

    return request<Atendimento[]>(`/atendimentos/export?${query}`);
}
