import { useState } from 'react';
import type { AtendimentosFilters } from '../../types/atendimentos';
import { getAtendimentosParaExportacao } from '../../services/api';
import { exportAtendimentosCsv } from '../../utils/exportCsv';
import { exportAtendimentosPdf } from '../../utils/exportPdf';
import { Button } from '../ui/Button';

type ExportActionsProps = {
    filters: AtendimentosFilters;
};

export function ExportActions({ filters }: ExportActionsProps) {
    const [loading, setLoading] = useState(false);

    async function carregarDadosExportacao() {
        const response = await getAtendimentosParaExportacao(filters);
        return response.data;
    }

    async function handleCsvExport() {
        try {
            setLoading(true);
            const atendimentos = await carregarDadosExportacao();
            exportAtendimentosCsv(atendimentos);
        } finally {
            setLoading(false);
        }
    }

    async function handlePdfExport() {
        try {
            setLoading(true);
            const atendimentos = await carregarDadosExportacao();
            exportAtendimentosPdf(atendimentos);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Button type="button" onClick={handleCsvExport} disabled={loading}>
                CSV
            </Button>
            <Button type="button" variant="primary" onClick={handlePdfExport} disabled={loading}>
                PDF
            </Button>
        </>
    );
}
