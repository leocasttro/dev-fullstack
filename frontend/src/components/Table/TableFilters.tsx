import type { AtendimentosFilters } from '../../types/atendimentos';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';

type TableFiltersProps = {
    filters: AtendimentosFilters;
    onFilterChange: (key: keyof AtendimentosFilters, value: string) => void;
    onClear: () => void;
};

export function TableFilters({ filters, onFilterChange, onClear }: TableFiltersProps) {
    return (
        <div className="table-filters">
            <input
                className="search-input"
                type="search"
                value={filters.search}
                onChange={(event) => onFilterChange('search', event.target.value)}
                placeholder="Buscar por assistido, advogado, organização, CPF ou código..."
            />
            <Select
                value={filters.agendamentoRealizado}
                onChange={(event) => onFilterChange('agendamentoRealizado', event.target.value)}
                options={[
                    { label: 'Todos', value: '' },
                    { label: 'Realizados', value: 'Sim' },
                    { label: 'Não realizados', value: 'Não' },
                ]}
            />
            <Select
                value={filters.tipo}
                onChange={(event) => onFilterChange('tipo', event.target.value)}
                options={[
                    { label: 'Todos os tipos', value: '' },
                    { label: 'Online', value: 'Online' },
                ]}
            />
            <Select
                value={filters.status}
                onChange={(event) => onFilterChange('status', event.target.value)}
                options={[
                    { label: 'Todos status', value: '' },
                    { label: 'Válido', value: 'Válido' },
                ]}
            />
            <Button type="button" variant="ghost" onClick={onClear}>
                Limpar
            </Button>
        </div>
    );
}
