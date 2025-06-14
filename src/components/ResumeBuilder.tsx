import React, { useState, useRef } from 'react';
import { UserInputForm } from './UserInputForm';
import { ResumePreview } from './ResumePreview';
import { ThemeSelector } from './ThemeSelector';
import { TemplateSelector } from './TemplateSelector';
import { Button } from './ui/Button';
import { usePDF } from 'react-to-pdf';
import { generateAIContent } from '../utils/ai';
import { Resume, initialResumeState } from '../types/resume';
import { Loader, AlertCircle, Download, Palette, Layout, Image, CheckCircle2, Save, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'react-hot-toast';
import { cn } from '../utils/cn';
import { useResume } from '../context/ResumeContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../hooks/use-toast';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ResumeForm } from './ResumeForm';
import { useReactToPrint } from 'react-to-print';
import html2pdf from 'html2pdf.js';

const API_URL = 'http://localhost:5000';

export const ResumeBuilder = () => {
    const [resume, setResume] = useState<Resume>(initialResumeState);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadSuccess, setDownloadSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'content' | 'design'>('content');
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const { toPDF, targetRef } = usePDF({
        filename: `${resume.personalInfo.name.replace(/\s+/g, '_')}_resume.pdf`
    });

    const handleUserInput = (updatedResume: Partial<Resume>) => {
        setResume(prev => ({ ...prev, ...updatedResume }));
    };

    const handleGenerateResume = async (jobRole: string) => {
        setError(null);

        try {
            setIsGenerating(true);

            const generatedContent = await generateAIContent(
                jobRole,
                resume.personalInfo.name,
                resume.personalInfo.email
            );

            setResume(prev => ({
                ...prev,
                ...generatedContent,
                isGenerated: true
            }));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to generate resume. Please try again later.');
            console.error('Error generating resume:', err);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleThemeSelect = (themeId: string) => {
        setResume(prev => ({ ...prev, selectedTheme: themeId }));
    };

    const handleTemplateSelect = (templateId: string) => {
        setResume(prev => ({ ...prev, selectedTemplate: templateId }));
    };

    const handleDownload = async (type: 'pdf' | 'print') => {
        if (!targetRef.current) {
            console.error('Target ref is not available');
            toast.error('Could not find resume content', { id: 'download' });
            return;
        }

        const loadingToast = toast.loading('Generating PDF...', { id: 'download' });

        try {
            console.log('Starting PDF generation...');
            const resumeElement = targetRef.current;

            // Remove Tailwind classes that might interfere
            resumeElement.classList.remove(
                'transform-gpu',
                'transition-all',
                'hover:shadow-xl',
                'scale-100',
                'print:scale-100',
                'print:origin-none'
            );

            // Reset inline styles
            Object.assign(resumeElement.style, {
                transform: 'none',
                scale: '1',
                opacity: '1',
                animation: 'none',
                transition: 'none',
                boxShadow: 'none',
                visibility: 'visible',
                display: 'block',
                position: 'relative',
                width: '794px',
                height: '1123px',
                backgroundColor: '#ffffff',
                color: '#000000',
                fontSize: '16px',
                padding: '2rem',
                boxSizing: 'border-box',
                margin: '0',
                border: 'none',
                overflow: 'visible'
            });

            // Wait for fonts and content to load
            await document.fonts.ready;
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Get the filename from the resume data
            const filename = resume.personalInfo?.name
                ? `${resume.personalInfo.name.replace(/\s+/g, '_')}_resume.pdf`
                : 'resume.pdf';

            // Configure html2pdf options
            const opt = {
                margin: 0,
                filename,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: '#ffffff',
                    allowTaint: true,
                    logging: true,
                    width: 794,
                    height: 1123
                },
                jsPDF: {
                    unit: 'mm',
                    format: 'a4',
                    orientation: 'portrait',
                    compress: true
                }
            };

            // Generate PDF
            await html2pdf().set(opt).from(resumeElement).save();
            toast.success('PDF downloaded successfully!', { id: 'download' });

        } catch (error) {
            console.error('Error generating PDF:', error);
            toast.error(`Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`, { id: 'download' });
        } finally {
            // Dismiss loading toast
            toast.dismiss(loadingToast);
        }
    };

    const handleSaveDraft = async () => {
        if (!resume.isGenerated) {
            toast.error('Please generate a resume first');
            return;
        }

        setIsSaving(true);
        setError(null);
        setSaveSuccess(false);

        try {
            toast.loading('Saving your draft...', { id: 'save' });
            // Save to localStorage
            const drafts = JSON.parse(localStorage.getItem('resume_drafts') || '[]');
            drafts.push({
                ...resume,
                savedAt: new Date().toISOString(),
                id: Date.now().toString()
            });
            localStorage.setItem('resume_drafts', JSON.stringify(drafts));
            toast.success('Draft saved successfully!', { id: 'save' });
            setSaveSuccess(true);
        } catch (error) {
            console.error('Error saving draft:', error);
            toast.error('Failed to save draft. Please try again.', { id: 'save' });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-8 max-w-7xl mx-auto px-8 py-12"
        >
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2"
                    >
                        <AlertCircle className="h-5 w-5" />
                        <span>{error}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid lg:grid-cols-2 gap-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                >
                    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                        <div className="flex space-x-4 mb-6">
                            <button
                                onClick={() => setActiveTab('content')}
                                className={cn(
                                    "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors",
                                    activeTab === 'content'
                                        ? "bg-blue-50 text-blue-700"
                                        : "text-gray-600 hover:bg-gray-50"
                                )}
                            >
                                <UserPlus className="h-5 w-5" />
                                <span>Content</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('design')}
                                className={cn(
                                    "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors",
                                    activeTab === 'design'
                                        ? "bg-blue-50 text-blue-700"
                                        : "text-gray-600 hover:bg-gray-50"
                                )}
                            >
                                <Palette className="h-5 w-5" />
                                <span>Design</span>
                            </button>
                        </div>

                        <AnimatePresence mode="wait">
                            {activeTab === 'content' ? (
                                <motion.div
                                    key="content"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <UserInputForm
                                        resume={resume}
                                        onUpdate={handleUserInput}
                                        onGenerate={handleGenerateResume}
                                        isGenerating={isGenerating}
                                    />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="design"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-8"
                                >
                                    <TemplateSelector
                                        selectedTemplate={resume.selectedTemplate || 'professional'}
                                        onTemplateSelect={handleTemplateSelect}
                                    />
                                    <ThemeSelector
                                        selectedTheme={resume.selectedTheme || 'modern'}
                                        onThemeSelect={handleThemeSelect}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-4"
                >
                    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-gray-800">Resume Preview</h3>
                            <div className="flex space-x-2">
                                <Button
                                    onClick={handleSaveDraft}
                                    disabled={!resume.isGenerated || isSaving}
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center"
                                >
                                    {isSaving ? (
                                        <Loader className="h-4 w-4 mr-2 animate-spin" />
                                    ) : (
                                        <Save className="h-4 w-4 mr-2" />
                                    )}
                                    {isSaving ? 'Saving...' : 'Save Draft'}
                                </Button>
                                <Button
                                    onClick={() => handleDownload('pdf')}
                                    disabled={isDownloading || !resume.isGenerated}
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center"
                                >
                                    {isDownloading ? (
                                        <Loader className="h-4 w-4 mr-2 animate-spin" />
                                    ) : (
                                        <Download className="h-4 w-4 mr-2" />
                                    )}
                                    {isDownloading ? 'Generating...' : 'PDF'}
                                </Button>
                            </div>
                        </div>
                        <div className="border border-gray-200 rounded-lg bg-white max-w-[800px] max-h-[800px] overflow-hidden pt-8">
                            <ResumePreview
                                resume={resume}
                                ref={targetRef}
                            />
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {(downloadSuccess || saveSuccess) && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center justify-center text-green-600 bg-green-50 px-4 py-2 rounded-lg"
                            >
                                <CheckCircle2 className="h-4 w-4 mr-2" />
                                <span>{downloadSuccess ? 'Download successful!' : 'Draft saved successfully!'}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    );
};