import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import type { MetricasAtendimentos } from '../../types/atendimentos';
import { formatMonthYear, formatOrganizationName, formatProperName } from '../../utils/formatters';
import { Card } from '../ui/Card';

type ChartsSectionProps = {
    metricas: MetricasAtendimentos;
};

const chartColors = ['#54d87f', '#ff5f68', '#38bdf8', '#a78bfa', '#f59e0b'];

const tooltipStyle = {
    backgroundColor: '#0f172a',
    border: '1px solid #334155',
    borderRadius: 12,
    color: '#e5edf7',
    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.28)',
};

const tooltipLabelStyle = {
    color: '#f8fafc',
    fontWeight: 700,
};

const tooltipItemStyle = {
    color: '#cbd5e1',
};

function buildLegendData(
    data: { nome: string; total: number }[],
    formatter: (value: string) => string
) {
    return data.map((item, index) => ({
        ...item,
        label: formatter(item.nome),
        color: chartColors[index % chartColors.length],
    }));
}

export function ChartsSection({ metricas }: ChartsSectionProps) {
    const statusData = [
        { nome: 'Realizados', total: metricas.totalRealizados },
        { nome: 'Não realizados', total: metricas.totalNaoRealizados },
    ];

    const organizacoes = buildLegendData(
        metricas.porOrganizacao.slice(0, 5),
        formatOrganizationName
    );
    const responsaveis = buildLegendData(
        metricas.porResponsavel.slice(0, 8),
        formatProperName
    );
    const evolucaoMensal = metricas.evolucaoMensal.map((item) => ({
        ...item,
        label: formatMonthYear(item.nome),
    }));

    return (
        <section className="charts-grid" aria-label="Gráficos de métricas">
            <Card className="chart-card">
                <div className="section-heading">
                    <h2>Status dos agendamentos</h2>
                    <p>Realizado vs. não realizado</p>
                </div>
                <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                        <Pie
                            data={statusData}
                            dataKey="total"
                            nameKey="nome"
                            innerRadius={64}
                            outerRadius={92}
                            paddingAngle={4}
                        >
                            {statusData.map((item, index) => (
                                <Cell key={item.nome} fill={chartColors[index]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={tooltipStyle}
                            labelStyle={tooltipLabelStyle}
                            itemStyle={tooltipItemStyle}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </Card>

            <Card className="chart-card">
                <div className="section-heading">
                    <h2>Top organizações</h2>
                    <p>Volume de agendamentos</p>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={organizacoes}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                        <XAxis dataKey="label" tick={false} axisLine={{ stroke: '#334155' }} height={16} />
                        <YAxis tick={{ fill: '#8b95a7', fontSize: 11 }} />
                        <Tooltip
                            contentStyle={tooltipStyle}
                            labelStyle={tooltipLabelStyle}
                            itemStyle={tooltipItemStyle}
                            labelFormatter={(_, payload) => payload?.[0]?.payload?.label ?? ''}
                        />
                        <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                            {organizacoes.map((item) => (
                                <Cell key={item.nome} fill={item.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
                <div className="chart-legend chart-legend--stacked">
                    {organizacoes.map((item) => (
                        <span key={item.nome} title={item.label}>
                            <i style={{ backgroundColor: item.color }} />
                            {item.label}
                        </span>
                    ))}
                </div>
            </Card>

            <Card className="chart-card">
                <div className="section-heading">
                    <h2>Carga por responsável</h2>
                    <p>Top 8 advogados</p>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={responsaveis} layout="vertical" margin={{ left: 12 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                        <XAxis type="number" tick={{ fill: '#8b95a7', fontSize: 11 }} />
                        <YAxis dataKey="label" type="category" tick={false} axisLine={{ stroke: '#334155' }} width={16} />
                        <Tooltip
                            contentStyle={tooltipStyle}
                            labelStyle={tooltipLabelStyle}
                            itemStyle={tooltipItemStyle}
                            labelFormatter={(_, payload) => payload?.[0]?.payload?.label ?? ''}
                        />
                        <Bar dataKey="total" radius={[0, 6, 6, 0]}>
                            {responsaveis.map((item) => (
                                <Cell key={item.nome} fill={item.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
                <div className="chart-legend chart-legend--columns">
                    {responsaveis.map((item) => (
                        <span key={item.nome} title={item.label}>
                            <i style={{ backgroundColor: item.color }} />
                            {item.label}
                        </span>
                    ))}
                </div>
            </Card>

            <Card className="chart-card chart-card--wide">
                <div className="section-heading">
                    <h2>Evolução mensal</h2>
                    <p>Agendamentos criados por mês</p>
                </div>
                <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={evolucaoMensal}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                        <XAxis dataKey="label" tick={{ fill: '#8b95a7', fontSize: 11 }} />
                        <YAxis tick={{ fill: '#8b95a7', fontSize: 11 }} />
                        <Tooltip
                            contentStyle={tooltipStyle}
                            labelStyle={tooltipLabelStyle}
                            itemStyle={tooltipItemStyle}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="total" name="agendamentos" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4 }} />
                    </LineChart>
                </ResponsiveContainer>
            </Card>
        </section>
    );
}
