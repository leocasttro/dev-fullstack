import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Atendimento } from '../types/atendimentos';
import { formatDate, formatTimeRange, limitText } from './formatters';

export function exportAtendimentosPdf(atendimentos: Atendimento[]) {
    const doc = new jsPDF({ orientation: 'landscape' });

    doc.setFontSize(16);
    doc.text('Atendimentos e Agendamentos', 14, 16);

    doc.setFontSize(10);
    doc.text(`Total exportado: ${atendimentos.length}`, 14, 24);

    autoTable(doc, {
        startY: 30,
        head: [[
            'Código',
            'Data',
            'Horário',
            'Assistido',
            'CPF',
            'Organização',
            'Advogado',
            'Status',
        ]],
        body: atendimentos.map((atendimento) => [
            `#${atendimento.codigoAgendamento}`,
            formatDate(atendimento.dataAgendamento),
            formatTimeRange(atendimento.horaInicio, atendimento.horaFim),
            atendimento.nomeAssistido,
            atendimento.cpfAssistido,
            limitText(atendimento.organizacao),
            limitText(atendimento.responsavelAgendamento),
            atendimento.agendamentoRealizado === 'Sim' ? 'Realizado' : 'Não realizado',
        ]),
        styles: { fontSize: 8 },
        headStyles: { fillColor: [17, 24, 39] },
    });

    doc.save('atendimentos.pdf');
}
