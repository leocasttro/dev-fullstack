import type { Atendimento } from '../types/atendimentos';
import { formatDate, formatTimeRange, limitText } from './formatters';

function escapeCsv(value: string | number | null) {
    const text = String(value ?? '');
    return `"${text.replace(/"/g, '""')}"`;
}

export function exportAtendimentosCsv(atendimentos: Atendimento[]) {
    const headers = [
        'Código',
        'Data',
        'Horário',
        'Assistido',
        'CPF',
        'Organização',
        'Advogado',
        'Status',
        'Realizado',
    ];

    const rows = atendimentos.map((atendimento) => [
        atendimento.codigoAgendamento,
        formatDate(atendimento.dataAgendamento),
        formatTimeRange(atendimento.horaInicio, atendimento.horaFim),
        atendimento.nomeAssistido,
        atendimento.cpfAssistido,
        limitText(atendimento.organizacao),
        limitText(atendimento.responsavelAgendamento),
        atendimento.status,
        atendimento.agendamentoRealizado,
    ]);

    const csv = [headers, ...rows]
        .map((row) => row.map(escapeCsv).join(','))
        .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'atendimentos.csv';
    link.click();

    URL.revokeObjectURL(url);
}
