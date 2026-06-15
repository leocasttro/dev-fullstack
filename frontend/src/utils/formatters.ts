export function formatDate(value: string) {
    const [month, day, year] = value.split('/');

    if (!month || !day || !year) {
        return value;
    }

    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
}

export function formatMonthYear(value: string) {
    const [year, month] = value.split('-');

    if (!month || !year) {
        return value;
    }

    return `${month.padStart(2, '0')}/${year}`;
}

export function formatTimeRange(start: string, end: string) {
    return `${start}-${end}`;
}

export function formatPercent(value: number) {
    return `${Math.round(value)}%`;
}

export function formatCurrency(value: number) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
}

export function limitText(value: string | null, fallback = 'Não informado') {
    return value && value.trim() ? value : fallback;
}

const lowercaseWords = new Set([
    'da',
    'de',
    'do',
    'das',
    'dos',
    'e',
]);

const uppercaseWords = new Set([
    'df',
    'cpf',
    'saep',
    'sinpro',
    'sindsasc',
    'aspsul',
]);

function capitalizeWord(word: string) {
    const lower = word.toLocaleLowerCase('pt-BR');

    if (uppercaseWords.has(lower)) {
        return lower.toLocaleUpperCase('pt-BR');
    }

    if (lowercaseWords.has(lower)) {
        return lower;
    }

    return lower.charAt(0).toLocaleUpperCase('pt-BR') + lower.slice(1);
}

export function formatProperName(value: string | null, fallback = 'Não informado') {
    const text = limitText(value, fallback);

    if (text === fallback) {
        return text;
    }

    return text
        .split(' ')
        .filter(Boolean)
        .map(capitalizeWord)
        .join(' ');
}

export function formatOrganizationName(value: string | null) {
    return formatProperName(value);
}

export function shortLabel(value: string, maxLength = 26) {
    if (value.length <= maxLength) {
        return value;
    }

    return `${value.slice(0, maxLength - 1).trim()}...`;
}
