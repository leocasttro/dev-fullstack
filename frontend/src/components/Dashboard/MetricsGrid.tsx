import type { MetricasAtendimentos } from '../../types/atendimentos';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { KpiCard } from './KpiCard';

type MetricsGridProps = {
    metricas: MetricasAtendimentos;
};

export function MetricsGrid({ metricas }: MetricsGridProps) {
    return (
        <section className="metrics-grid" aria-label="Indicadores principais">
            <KpiCard
                label="Total"
                value={metricas.totalAgendamentos}
                description={`${metricas.totalAgendamentos} no total`}
                tone="blue"
                icon="Cal"
            />
            <KpiCard
                label="Concluídos"
                value={metricas.totalConcluidos}
                description={`${formatPercent(metricas.percentualRealizados)} de conclusão`}
                tone="green"
                icon="Ok"
            />
            <KpiCard
                label="Cancelados"
                value={metricas.totalCancelados}
                description={`${metricas.totalNaoRealizados} não realizados`}
                tone="purple"
                icon="X"
            />
            <KpiCard
                label="Receita total"
                value={formatCurrency(metricas.receitaTotal)}
                description="Base sem campo financeiro"
                tone="teal"
                icon="R$"
            />
        </section>
    );
}
