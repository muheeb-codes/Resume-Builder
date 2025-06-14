import React, { forwardRef } from 'react';
import { Resume, themes, templates } from '../types/resume';
import { Mail, Phone, MapPin, Globe, Calendar, Github, Linkedin, Twitter, ExternalLink, FileText, CheckCircle } from 'lucide-react';
import { cn } from '../utils/cn';

interface ResumePreviewProps {
  resume: Resume;
}

export const ResumePreview = forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ resume }, ref) => {
    const { personalInfo, summary, experience, education, skills, optionalElements } = resume;

    const selectedTheme = themes.find(t => t.id === resume.selectedTheme) || themes[0];
    const selectedTemplate = templates.find(t => t.id === resume.selectedTemplate) || templates[0];

    const renderSkillBar = (level: number) => {
      return (
        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${(level / 5) * 100}%`,
              transform: 'translateX(0)',
              animation: 'skillBarFill 1s ease-out forwards'
            }}
          />
        </div>
      );
    };

    const renderSocialLinks = () => {
      if (!personalInfo.socialLinks) return null;
      const { linkedin, github, twitter, portfolio } = personalInfo.socialLinks;

      return (
        <div className="flex gap-4 mt-3">
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-gray-900 transition-all duration-300 hover:scale-110"
            >
              <Github className="h-5 w-5" />
            </a>
          )}
          {twitter && (
            <a
              href={twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500 transition-all duration-300 hover:scale-110"
            >
              <Twitter className="h-5 w-5" />
            </a>
          )}
          {portfolio && (
            <a
              href={portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800 transition-all duration-300 hover:scale-110"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(
          "resume-preview bg-white",
          selectedTheme.fontFamily,
          "text-gray-800",
          "transition-all duration-300 ease-in-out",
          "hover:shadow-xl",
          "relative",
          "w-[794px]",
          "h-[1123px]",
          "scale-100",
          "origin-top",
          "transform-gpu",
          "mx-auto",
          "print:scale-100",
          "print:origin-none"
        )}
        style={{
          boxSizing: 'border-box',
          backgroundColor: '#ffffff',
          printColorAdjust: 'exact',
          WebkitPrintColorAdjust: 'exact',
          position: 'relative',
          transform: 'none',
          WebkitTransform: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          padding: '2rem',
          visibility: 'visible',
          opacity: '1',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          animation: 'fadeIn 0.5s ease-out',
          overflow: 'visible',
          margin: '0',
          width: '794px',
          height: '1123px',
          minHeight: '1123px',
          maxHeight: '1123px',
          scale: '1',
          color: '#000000'
        }}
      >
        {/* Header */}
        <header className={cn(
          "mb-8 transition-all duration-300",
          selectedTemplate.id === 'creative' && "bg-gradient-to-r from-blue-900 to-blue-800 text-white p-8 rounded-lg shadow-lg hover:shadow-xl",
          selectedTemplate.id === 'minimalist' && "border-b-2 border-gray-200 pb-6 hover:border-gray-300",
          selectedTemplate.id === 'tech' && "bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md",
          selectedTemplate.id === 'academic' && "border-l-4 border-blue-700 pl-4 hover:border-blue-800",
          selectedTemplate.id === 'freelancer' && "bg-gradient-to-r from-purple-900 to-purple-800 text-white p-8 rounded-lg shadow-lg hover:shadow-xl"
        )}>
          <div className={cn(
            "flex items-start gap-8",
            selectedTemplate.id === 'modern' && "flex-col md:flex-row",
            selectedTemplate.id === 'tech' && "flex-col md:flex-row"
          )}>
            {optionalElements?.showPhoto && personalInfo.photo && (
              <div className={cn(
                "w-28 h-28 rounded-full overflow-hidden flex-shrink-0 shadow-lg transition-all duration-300 hover:shadow-xl",
                selectedTemplate.id === 'modern' && "w-36 h-36",
                selectedTemplate.id === 'tech' && "w-32 h-32"
              )}>
                <img
                  src={personalInfo.photo}
                  alt={personalInfo.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
            )}

            <div className="flex-1">
              <h1 className={cn(
                "text-4xl font-bold mb-3 transition-all duration-300",
                selectedTheme.primaryColor,
                selectedTemplate.id === 'creative' && "text-white",
                selectedTemplate.id === 'freelancer' && "text-white",
                selectedTemplate.id === 'modern' && "text-4xl",
                selectedTemplate.id === 'tech' && "text-3xl font-mono"
              )}>
                {personalInfo.name || 'Your Name'}
              </h1>

              {resume.targetRole && (
                <p className={cn(
                  "text-xl mb-4 transition-all duration-300",
                  selectedTheme.secondaryColor,
                  selectedTemplate.id === 'creative' && "text-blue-100",
                  selectedTemplate.id === 'freelancer' && "text-purple-100"
                )}>
                  {resume.targetRole}
                </p>
              )}

              <div className={cn(
                "flex flex-wrap gap-6 text-sm",
                selectedTemplate.id === 'creative' && "text-blue-100",
                selectedTemplate.id === 'freelancer' && "text-purple-100"
              )}>
                {personalInfo.email && (
                  <div className="flex items-center transition-all duration-300 hover:scale-105">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.phone && (
                  <div className="flex items-center transition-all duration-300 hover:scale-105">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center transition-all duration-300 hover:scale-105">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{personalInfo.location}</span>
                  </div>
                )}
                {personalInfo.website && (
                  <div className="flex items-center transition-all duration-300 hover:scale-105">
                    <Globe className="h-4 w-4 mr-2" />
                    <span>{personalInfo.website}</span>
                  </div>
                )}
              </div>

              {optionalElements?.showSocialLinks && renderSocialLinks()}
            </div>
          </div>
        </header>

        {/* Summary */}
        {summary && (
          <section className={cn(
            "mb-8 transition-all duration-300 hover:shadow-md",
            selectedTemplate.id === 'tech' && "bg-gray-50 p-6 rounded-lg shadow-sm"
          )}>
            <h2 className={cn(
              "text-xl font-semibold border-b pb-2 mb-4 transition-colors duration-300",
              selectedTheme.primaryColor,
              selectedTemplate.id === 'minimalist' ? "border-gray-300" : "border-current"
            )}>
              Professional Summary
            </h2>
            <p className={cn(
              "text-base leading-relaxed transition-colors duration-300",
              selectedTheme.secondaryColor
            )}>
              {summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 &&
          <section className="mb-8">
            <h2 className={cn(
              "text-xl font-semibold border-b pb-2 mb-4 transition-colors duration-300",
              selectedTheme.primaryColor,
              selectedTemplate.id === 'minimalist' ? "border-gray-300" : "border-current"
            )}>
              Experience
            </h2>
            <div className="space-y-6">
              {experience.map((job, index) => (
                <div
                  key={index}
                  className={cn(
                    "text-base transition-all duration-300 hover:shadow-md p-4 rounded-lg",
                    selectedTemplate.id === 'tech' && "bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md"
                  )}
                >
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className={cn(
                      "text-lg font-medium transition-colors duration-300",
                      selectedTheme.primaryColor
                    )}>
                      {job.title}
                    </h3>
                    <div className={cn(
                      "flex items-center transition-colors duration-300",
                      selectedTheme.secondaryColor
                    )}>
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{job.dates}</span>
                    </div>
                  </div>
                  <p className={cn(
                    "text-base font-medium mb-2 transition-colors duration-300",
                    selectedTheme.secondaryColor
                  )}>
                    {job.company}
                  </p>
                  {job.location && (
                    <p className={cn(
                      "text-sm mb-3 transition-colors duration-300",
                      selectedTheme.secondaryColor
                    )}>
                      {job.location}
                    </p>
                  )}
                  <ul className={cn(
                    "list-disc list-inside space-y-2 transition-colors duration-300",
                    selectedTheme.secondaryColor
                  )}>
                    {job.responsibilities.map((item, i) => (
                      <li key={i} className="leading-relaxed">{item}</li>
                    ))}
                  </ul>
                  {job.achievements && job.achievements.length > 0 && (
                    <div className="mt-4">
                      <h4 className={cn(
                        "font-medium text-base mb-2 transition-colors duration-300",
                        selectedTheme.primaryColor
                      )}>
                        Key Achievements:
                      </h4>
                      <ul className={cn(
                        "list-disc list-inside space-y-2 transition-colors duration-300",
                        selectedTheme.secondaryColor
                      )}>
                        {job.achievements.map((achievement, i) => (
                          <li key={i} className="leading-relaxed">{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        }

        {/* Education */}
        {education && education.length > 0 && (
          <section className="mb-8">
            <h2 className={cn(
              "text-xl font-semibold border-b pb-2 mb-4 transition-colors duration-300",
              selectedTheme.primaryColor,
              selectedTemplate.id === 'minimalist' ? "border-gray-300" : "border-current"
            )}>
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className={cn(
                    "text-base transition-all duration-300 hover:shadow-md p-4 rounded-lg",
                    selectedTemplate.id === 'academic' && "bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md"
                  )}
                >
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className={cn(
                      "text-lg font-medium transition-colors duration-300",
                      selectedTheme.primaryColor
                    )}>
                      {edu.degree}
                    </h3>
                    <div className={cn(
                      "flex items-center transition-colors duration-300",
                      selectedTheme.secondaryColor
                    )}>
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{edu.dates}</span>
                    </div>
                  </div>
                  <p className={cn(
                    "text-base font-medium mb-2 transition-colors duration-300",
                    selectedTheme.secondaryColor
                  )}>
                    {edu.institution}
                  </p>
                  {edu.gpa && (
                    <p className={cn(
                      "text-sm mb-2 transition-colors duration-300",
                      selectedTheme.secondaryColor
                    )}>
                      GPA: {edu.gpa}
                    </p>
                  )}
                  {edu.description && (
                    <p className={cn(
                      "text-sm mb-2 transition-colors duration-300",
                      selectedTheme.secondaryColor
                    )}>
                      {edu.description}
                    </p>
                  )}
                  {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                    <div className="mt-3">
                      <h4 className={cn(
                        "font-medium text-base mb-2 transition-colors duration-300",
                        selectedTheme.primaryColor
                      )}>
                        Relevant Courses:
                      </h4>
                      <p className={cn(
                        "text-sm transition-colors duration-300",
                        selectedTheme.secondaryColor
                      )}>
                        {edu.relevantCourses.join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className={cn(
            "transition-all duration-300 hover:shadow-md p-4 rounded-lg",
            selectedTemplate.id === 'tech' && "bg-gray-50 p-6 rounded-lg shadow-sm"
          )}>
            <h2 className={cn(
              "text-xl font-semibold border-b pb-2 mb-4 transition-colors duration-300",
              selectedTheme.primaryColor,
              selectedTemplate.id === 'minimalist' ? "border-gray-300" : "border-current"
            )}>
              Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="space-y-2 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-md p-3 rounded-lg"
                >
                  <div className="flex justify-between items-center">
                    <span className={cn(
                      "text-base font-medium transition-colors duration-300",
                      selectedTheme.primaryColor
                    )}>
                      {skill.name}
                    </span>
                    {skill.category && (
                      <span className={cn(
                        "text-xs px-3 py-1 rounded-full transition-all duration-300",
                        selectedTheme.secondaryColor,
                        "bg-gray-100 hover:bg-gray-200"
                      )}>
                        {skill.category}
                      </span>
                    )}
                  </div>
                  {optionalElements?.showSkillBars && skill.level && renderSkillBar(skill.level)}
                </div>
              ))}
            </div>
          </section>
        )}

        <style>
          {`
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes skillBarFill {
              from {
                width: 0;
              }
              to {
                width: var(--skill-level);
              }
            }

            .resume-preview {
              contain: content;
              will-change: transform;
            }

            @media print {
              .resume-preview {
                transform: none !important;
                -webkit-transform: none !important;
                scale: 1 !important;
                width: 210mm !important;
                height: 297mm !important;
                margin: 0 !important;
                padding: 0 !important;
                box-shadow: none !important;
                page-break-after: always !important;
                page-break-inside: avoid !important;
                break-after: page !important;
                break-inside: avoid !important;
              }
            }
          `}
        </style>
      </div>
    );
  }
);

ResumePreview.displayName = 'ResumePreview';