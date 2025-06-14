import React from 'react';
import { cn } from '../../utils/cn';

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({ children, className, ...props }) => {
    return (
        <div className={cn("w-full", className)} {...props}>
            {children}
        </div>
    );
};

export const TabsList: React.FC<TabsProps> = ({ children, className, ...props }) => {
    return (
        <div
            className={cn(
                "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export const TabsTrigger: React.FC<TabsProps & { value: string }> = ({
    children,
    className,
    value,
    ...props
}) => {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export const TabsContent: React.FC<TabsProps & { value: string }> = ({
    children,
    className,
    value,
    ...props
}) => {
    return (
        <div
            className={cn(
                "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}; 