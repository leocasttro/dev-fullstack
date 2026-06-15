import type { ReactNode } from 'react';
import { Card } from '../ui/Card';

type KpiCardProps = {
    label: string;
    value: string | number;
    description: string;
    tone?: 'blue' | 'green' | 'purple' | 'teal';
    icon?: ReactNode;
};

export function KpiCard({
    label,
    value,
    description,
    tone = 'blue',
    icon,
}: KpiCardProps) {
    return (
        <Card className={`kpi-card kpi-card--${tone}`}>
            <div className="kpi-card__header">
                <span>{label}</span>
                <span className="kpi-card__icon">{icon}</span>
            </div>
            <strong>{value}</strong>
            <small>{description}</small>
        </Card>
    );
}
