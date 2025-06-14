import React from 'react';
import { templates } from '../types/resume';
import { cn } from '../utils/cn';
import { motion } from 'framer-motion';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateSelect,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Choose a Template</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <motion.button
            key={template.id}
            onClick={() => onTemplateSelect(template.id)}
            className={cn(
              "relative group rounded-lg overflow-hidden border-2 transition-all duration-200",
              selectedTemplate === template.id
                ? "border-blue-600 shadow-lg"
                : "border-gray-200 hover:border-blue-400"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="aspect-[3/4] bg-white">
              <div className={cn(
                "h-full p-4",
                template.id === 'creative' && "bg-gradient-to-br from-blue-900 to-blue-800",
                template.id === 'modern' && "bg-gradient-to-br from-gray-50 to-gray-100",
                template.id === 'minimalist' && "bg-white",
                template.id === 'tech' && "bg-gradient-to-br from-gray-900 to-gray-800",
                template.id === 'academic' && "bg-gradient-to-br from-blue-50 to-blue-100",
                template.id === 'freelancer' && "bg-gradient-to-br from-purple-900 to-purple-800"
              )}>
                <div className="space-y-2">
                  <div className={cn(
                    "h-4 rounded",
                    template.id === 'creative' && "bg-blue-100 w-3/4",
                    template.id === 'modern' && "bg-gray-200 w-1/2",
                    template.id === 'minimalist' && "bg-gray-100 w-2/3",
                    template.id === 'tech' && "bg-gray-700 w-3/4",
                    template.id === 'academic' && "bg-blue-200 w-1/2",
                    template.id === 'freelancer' && "bg-purple-100 w-3/4"
                  )} />
                  <div className={cn(
                    "h-3 rounded",
                    template.id === 'creative' && "bg-blue-100 w-1/2",
                    template.id === 'modern' && "bg-gray-200 w-3/4",
                    template.id === 'minimalist' && "bg-gray-100 w-1/3",
                    template.id === 'tech' && "bg-gray-700 w-1/2",
                    template.id === 'academic' && "bg-blue-200 w-2/3",
                    template.id === 'freelancer' && "bg-purple-100 w-1/2"
                  )} />
                  <div className={cn(
                    "h-3 rounded",
                    template.id === 'creative' && "bg-blue-100 w-2/3",
                    template.id === 'modern' && "bg-gray-200 w-1/2",
                    template.id === 'minimalist' && "bg-gray-100 w-1/2",
                    template.id === 'tech' && "bg-gray-700 w-3/4",
                    template.id === 'academic' && "bg-blue-200 w-1/3",
                    template.id === 'freelancer' && "bg-purple-100 w-2/3"
                  )} />
                </div>
              </div>
            </div>
            <div className={cn(
              "absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-200",
              selectedTemplate === template.id && "bg-opacity-20"
            )} />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-white bg-opacity-90 backdrop-blur-sm">
              <h4 className="font-medium text-gray-900">{template.name}</h4>
              <p className="text-sm text-gray-500">{template.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};