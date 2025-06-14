import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'default',
    size = 'md',
    className,
    children,
    ...props
}) => {
    return (
        <button
            className={cn(
                'inline-flex items-center justify-center rounded-md font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                'disabled:pointer-events-none disabled:opacity-50',
                {
                    'bg-blue-600 text-white hover:bg-blue-700': variant === 'default',
                    'border border-gray-300 bg-transparent hover:bg-gray-100': variant === 'outline',
                    'bg-transparent hover:bg-gray-100': variant === 'ghost',
                },
                {
                    'h-8 px-3 text-sm': size === 'sm',
                    'h-10 px-4': size === 'md',
                    'h-12 px-6 text-lg': size === 'lg',
                },
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}; 