import type { PaginationMeta } from '../../types/atendimentos';
import { Button } from '../ui/Button';

type PaginationProps = {
    meta: PaginationMeta | null;
    page: number;
    loading?: boolean;
    onPageChange: (page: number) => void;
};

export function Pagination({ meta, page, loading = false, onPageChange }: PaginationProps) {
    if (!meta) {
        return null;
    }

    return (
        <div className="pagination">
            <span>
                Página {meta.page} de {meta.totalPages || 1} - mostrando {meta.limit} de {meta.total}
            </span>
            <div className="pagination__actions">
                <Button
                    type="button"
                    variant="ghost"
                    disabled={loading || page <= 1}
                    onClick={() => onPageChange(page - 1)}
                >
                    Anterior
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    disabled={loading || page >= meta.totalPages}
                    onClick={() => onPageChange(page + 1)}
                >
                    Próxima
                </Button>
            </div>
        </div>
    );
}
