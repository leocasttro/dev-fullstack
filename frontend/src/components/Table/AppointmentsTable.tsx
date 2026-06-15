import type { Atendimento } from '../../types/atendimentos';
import {
    formatDate,
    formatOrganizationName,
    formatProperName,
    formatTimeRange,
} from '../../utils/formatters';
import { StatusMessage } from '../Layout/StatusMessage';

type AppointmentsTableProps = {
    atendimentos: Atendimento[];
    loading: boolean;
    error: string;
};

export function AppointmentsTable({ atendimentos, loading, error }: AppointmentsTableProps) {
    if (loading && atendimentos.length === 0) {
        return <StatusMessage type="loading" message="Carregando atendimentos..." />;
    }

    if (error) {
        return <StatusMessage type="error" message={error} />;
    }

    if (atendimentos.length === 0) {
        return <StatusMessage type="empty" message="Nenhum atendimento encontrado." />;
    }

    return (
        <div className={`table-wrapper ${loading ? 'table-wrapper--updating' : ''}`}>
            {loading && (
                <div className="table-loading-bar">
                    Atualizando resultados...
                </div>
            )}
            <table className="appointments-table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Data</th>
                        <th>Horário</th>
                        <th>Assistido</th>
                        <th>Organização</th>
                        <th>Advogado(a)</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {atendimentos.map((atendimento) => (
                        <tr key={atendimento.codigoAgendamento}>
                            <td>#{atendimento.codigoAgendamento}</td>
                            <td>{formatDate(atendimento.dataAgendamento)}</td>
                            <td>{formatTimeRange(atendimento.horaInicio, atendimento.horaFim)}</td>
                            <td>
                                <strong>{formatProperName(atendimento.nomeAssistido)}</strong>
                                <span>{atendimento.cpfAssistido}</span>
                            </td>
                            <td>{formatOrganizationName(atendimento.organizacao)}</td>
                            <td>{formatProperName(atendimento.responsavelAgendamento)}</td>
                            <td>
                                <span className={atendimento.agendamentoRealizado === 'Sim' ? 'badge badge--success' : 'badge badge--danger'}>
                                    {atendimento.agendamentoRealizado === 'Sim' ? 'Realizado' : 'Não realizado'}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
