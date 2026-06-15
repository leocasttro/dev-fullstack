import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    children: ReactNode;
};

export function Button({
                           variant = 'secondary',
                           children,
                           className = '',
                           ...props
                       }: ButtonProps) {
    return (
        <button
            className={`button button--${variant} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}