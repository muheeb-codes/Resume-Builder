import React from 'react';
import { cn } from '../../utils/cn';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
    label,
    error,
    className,
    ...props
}) => {
    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <textarea
                className={cn(
                    'block w-full rounded-md',
                    'focus:border-blue-500 focus:ring-0',
                    'disabled:bg-gray-50 disabled:text-gray-500',
                    'bg-white py-2 px-3',
                    'text-gray-900 text-sm',
                    'border border-gray-300',
                    'hover:border-gray-400',
                    'transition-colors duration-200',
                    'resize-none',
                    error && 'border-red-300 focus:border-red-500',
                    className
                )}
                {...props}
            />
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}; 