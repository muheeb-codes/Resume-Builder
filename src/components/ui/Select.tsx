import React from 'react';
import { cn } from '../../utils/cn';

interface Option {
    value: string;
    label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
    label?: string;
    options: Option[];
    error?: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select: React.FC<SelectProps> = ({
    label,
    options,
    error,
    className,
    onChange,
    ...props
}) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <select
                className={cn(
                    'block w-full rounded-md border-gray-300 shadow-sm',
                    'focus:border-blue-500 focus:ring-blue-500',
                    'disabled:bg-gray-50 disabled:text-gray-500',
                    'bg-white py-2 px-3',
                    'text-gray-900 text-sm',
                    'border border-gray-300',
                    'hover:border-gray-400',
                    'transition-colors duration-200',
                    error && 'border-red-300 focus:border-red-500 focus:ring-red-500',
                    className
                )}
                onChange={onChange}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}; 