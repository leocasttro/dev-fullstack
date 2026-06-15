import type { SelectHTMLAttributes } from 'react';

export type SelectOption = {
    label: string;
    value: string;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    options: SelectOption[];
};

export function Select({
                           options,
                           className = '',
                           ...props
                       }: SelectProps) {
    return (
        <select className={`select ${className}`} {...props}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}