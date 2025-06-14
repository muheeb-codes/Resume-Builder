import React from 'react';
import { Resume } from '../types/resume';

interface ResumeFormProps {
  resume: Resume;
  onUpdate: (resume: Partial<Resume>) => void;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({ resume, onUpdate }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Personal Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={resume.personalInfo.name}
            onChange={(e) => onUpdate({ personalInfo: { ...resume.personalInfo, name: e.target.value } })}
            className="p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={resume.personalInfo.email}
            onChange={(e) => onUpdate({ personalInfo: { ...resume.personalInfo, email: e.target.value } })}
            className="p-2 border rounded"
          />
        </div>
      </div>
    </div>
  );
}; 