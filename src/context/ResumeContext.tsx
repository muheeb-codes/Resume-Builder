import React, { createContext, useContext, useState } from 'react';
import { Resume, initialResumeState } from '../types/resume';

interface ResumeContextType {
    resume: Resume;
    setResume: (resume: Resume) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [resume, setResume] = useState<Resume>(initialResumeState);

    return (
        <ResumeContext.Provider value={{ resume, setResume }}>
            {children}
        </ResumeContext.Provider>
    );
};

export const useResume = () => {
    const context = useContext(ResumeContext);
    if (context === undefined) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
}; 