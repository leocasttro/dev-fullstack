import { useEffect, useState } from 'react';
import { getMetricas } from '../services/api';
import type { MetricasAtendimentos } from '../types/atendimentos';

export function useMetricas() {
    const [metricas, setMetricas] = useState<MetricasAtendimentos | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        async function carregarMetricas() {
            try {
                setLoading(true);
                setError('');

                const response = await getMetricas();

                setMetricas(response.data);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Erro ao carregar métricas'
                );
            } finally {
                setLoading(false);
            }
        }

        carregarMetricas();
    }, []);

    return {
        metricas,
        loading,
        error,
    };
}