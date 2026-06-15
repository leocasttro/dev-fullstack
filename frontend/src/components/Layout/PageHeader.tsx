import type { ReactNode } from 'react';

type PageHeaderProps = {
    totalRegistros: number;
    actions?: ReactNode;
};

export function PageHeader({
                               totalRegistros,
                               actions,
                           }: PageHeaderProps) {
    return (
        <header className="page-header">
            <div>
                <div className="page-header__badge">
                    <span className="page-header__status-dot" />
                    Painel jurídico • dados sincronizados
                </div>

                <h1>Atendimentos & Agendamentos</h1>

                <p>
                    Visão analítica de {totalRegistros} registros • filtros e exportação
                    refletem a tabela ativa
                </p>
            </div>

            {actions && (
                <div className="page-header__actions">
                    {actions}
                </div>
            )}
        </header>
    );
}