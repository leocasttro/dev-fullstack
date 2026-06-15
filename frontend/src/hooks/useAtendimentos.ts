import type {Atendimento, AtendimentosFilters, PaginationMeta} from "../types/atendimentos.ts";
import {useEffect, useMemo, useState} from "react";
import {useDebounce} from "./useDebounce.ts";
import {getAtendimentos} from "../services/api.ts";

const INITAL_FILTERS: AtendimentosFilters = {
    search: '',
    status: '',
    tipo: '',
    agendamentoRealizado: '',
    organizacao: '',
    servico: '',
    local: '',
};

export function useAtendimentos() {
    const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
    const [meta, setMeta] = useState<PaginationMeta | null>(null);
    const [filters, setFilters] = useState<AtendimentosFilters>(INITAL_FILTERS);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const debouncedSearch = useDebounce(filters.search, 500);

    const apiFilters = useMemo(() => ({
        ...filters,
        search: debouncedSearch,
    }), [filters, debouncedSearch]);

    useEffect(() => {
        async function carregarAtendimentos() {
            try {
                setLoading(true);
                setError('');

                const reponse = await getAtendimentos(apiFilters, page, limit);

                setAtendimentos(reponse.data);
                setMeta(reponse.meta);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro ao carregar atendimentos');
            } finally {
                setLoading(false);
            }
        }
        carregarAtendimentos()
    }, [apiFilters, page, limit]);

    function updateFilter(key: keyof AtendimentosFilters, value: string) {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));

        setPage(1);
    }

    function clearFilters() {
        setFilters(INITAL_FILTERS);
        setPage(1);
    }

    return {
        atendimentos,
        meta,
        filters,
        page,
        limit,
        loading,
        error,
        setPage,
        updateFilter,
        clearFilters
    };
}