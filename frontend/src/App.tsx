import './App.css';
import { ChartsSection } from './components/Dashboard/ChartsSection';
import { MetricsGrid } from './components/Dashboard/MetricsGrid';
import { ExportActions } from './components/Export/ExportActions';
import { PageHeader } from './components/Layout/PageHeader';
import { StatusMessage } from './components/Layout/StatusMessage';
import { AppointmentsTable } from './components/Table/AppointmentsTable';
import { Pagination } from './components/Table/Pagination';
import { TableFilters } from './components/Table/TableFilters';
import { Card } from './components/ui/Card';
import { useAtendimentos } from './hooks/useAtendimentos';
import { useMetricas } from './hooks/useMetricas';

function App() {
    const atendimentosState = useAtendimentos();
    const { metricas, loading: loadingMetricas, error: metricasError } = useMetricas();

    return (
        <main className="app-shell">
            <PageHeader
                totalRegistros={metricas?.totalAgendamentos ?? atendimentosState.meta?.total ?? 0}
                actions={<ExportActions filters={atendimentosState.filters} />}
            />

            {loadingMetricas && <StatusMessage type="loading" message="Carregando métricas..." />}
            {metricasError && <StatusMessage type="error" message={metricasError} />}

            {metricas && (
                <>
                    <MetricsGrid metricas={metricas} />
                    <ChartsSection metricas={metricas} />
                </>
            )}

            <Card className="table-card">
                <div className="table-card__header">
                    <div>
                        <h2>Agendamentos</h2>
                        <p>{atendimentosState.meta?.total ?? 0} resultados</p>
                    </div>
                    <span>Filtros ativos refletem nas exportações</span>
                </div>

                <TableFilters
                    filters={atendimentosState.filters}
                    onFilterChange={atendimentosState.updateFilter}
                    onClear={atendimentosState.clearFilters}
                />

                <AppointmentsTable
                    atendimentos={atendimentosState.atendimentos}
                    loading={atendimentosState.loading}
                    error={atendimentosState.error}
                />

                <Pagination
                    meta={atendimentosState.meta}
                    page={atendimentosState.page}
                    loading={atendimentosState.loading}
                    onPageChange={atendimentosState.setPage}
                />
            </Card>

            <footer className="app-footer">
                Dados mockados a partir de atendimentos.json - exportações respeitam busca e filtros ativos
            </footer>
        </main>
    );
}

export default App;
