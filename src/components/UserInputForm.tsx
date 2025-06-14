import React, { useState } from 'react';
import { Resume, regions } from '../types/resume';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Select } from './ui/Select';
import { Switch } from './ui/Switch';
import { Loader, Plus, Trash2, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UserInputFormProps {
  resume: Resume;
  onUpdate: (resume: Partial<Resume>) => void;
  onGenerate: (jobRole: string) => Promise<void>;
  isGenerating: boolean;
}

export const UserInputForm: React.FC<UserInputFormProps> = ({
  resume, 
  onUpdate, 
  onGenerate, 
  isGenerating,
}) => {
  const [jobRole, setJobRole] = useState('');
  const [showOptionalElements, setShowOptionalElements] = useState(false);

  const handlePersonalInfoChange = (field: string, value: string) => {
    onUpdate({
      personalInfo: {
        ...resume.personalInfo,
        [field]: value,
      },
    });
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    onUpdate({
      personalInfo: {
        ...resume.personalInfo,
        socialLinks: {
          ...resume.personalInfo.socialLinks,
          [platform]: value,
        },
      },
    });
  };

  const handleOptionalElementToggle = (element: string, value: boolean) => {
    onUpdate({
      optionalElements: {
        ...resume.optionalElements,
        [element]: value,
      },
    });
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handlePersonalInfoChange('photo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExperienceChange = (index: number, field: string, value: string | string[]) => {
    const updatedExperience = [...resume.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    };
    onUpdate({ experience: updatedExperience });
  };

  const handleEducationChange = (index: number, field: string, value: string | string[]) => {
    const updatedEducation = [...resume.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    onUpdate({ education: updatedEducation });
  };

  const handleSkillChange = (index: number, field: string, value: string | number) => {
    const updatedSkills = [...resume.skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: value,
    };
    onUpdate({ skills: updatedSkills });
  };

  return (
    <div className="space-y-6">
        <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
            label="Full Name"
              value={resume.personalInfo.name}
            onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
              placeholder="John Doe"
          />
            <Input
            label="Email"
              type="email"
              value={resume.personalInfo.email}
            onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
            placeholder="john@example.com"
          />
          <Input
            label="Phone"
            value={resume.personalInfo.phone || ''}
            onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
          <Input
            label="Location"
            value={resume.personalInfo.location || ''}
            onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
            placeholder="City, Country"
          />
          <Input
            label="Website"
            value={resume.personalInfo.website || ''}
            onChange={(e) => handlePersonalInfoChange('website', e.target.value)}
            placeholder="https://yourwebsite.com"
            />
          </div>
          
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700">Optional Elements</h4>
            <Switch
              checked={showOptionalElements}
              onChange={setShowOptionalElements}
            />
          </div>
          
          <AnimatePresence>
            {showOptionalElements && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700">Profile Photo</label>
                    <Switch
                      checked={resume.optionalElements?.showPhoto || false}
                      onChange={(value) => handleOptionalElementToggle('showPhoto', value)}
                    />
                  </div>
                  {resume.optionalElements?.showPhoto && (
                    <div className="flex items-center space-x-4">
                      {resume.personalInfo.photo ? (
                        <div className="relative w-20 h-20">
                          <img
                            src={resume.personalInfo.photo}
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full"
                          />
                          <button
                            onClick={() => handlePersonalInfoChange('photo', '')}
                            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <Upload className="w-5 h-5 text-gray-500" />
                          <span className="text-sm text-gray-600">Upload Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                          />
            </label>
                      )}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-700">Social Links</label>
                      <Switch
                        checked={resume.optionalElements?.showSocialLinks || false}
                        onChange={(value) => handleOptionalElementToggle('showSocialLinks', value)}
                      />
                    </div>
                    {resume.optionalElements?.showSocialLinks && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="LinkedIn"
                          value={resume.personalInfo.socialLinks?.linkedin || ''}
                          onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                          placeholder="https://linkedin.com/in/username"
                        />
                        <Input
                          label="GitHub"
                          value={resume.personalInfo.socialLinks?.github || ''}
                          onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                          placeholder="https://github.com/username"
                        />
                        <Input
                          label="Twitter"
                          value={resume.personalInfo.socialLinks?.twitter || ''}
                          onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                          placeholder="https://twitter.com/username"
                        />
            <Input
                          label="Portfolio"
                          value={resume.personalInfo.socialLinks?.portfolio || ''}
                          onChange={(e) => handleSocialLinkChange('portfolio', e.target.value)}
                          placeholder="https://yourportfolio.com"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700">Skill Bars</label>
                    <Switch
                      checked={resume.optionalElements?.showSkillBars || false}
                      onChange={(value) => handleOptionalElementToggle('showSkillBars', value)}
            />
          </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Target Role & Region</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Target Job Role"
            value={resume.targetRole || ''}
            onChange={(e) => onUpdate({ targetRole: e.target.value })}
            placeholder="e.g., Software Engineer, Product Manager"
          />
          <Select
            label="Region"
            value={resume.region || 'us'}
            onChange={(e) => onUpdate({ region: e.target.value })}
            options={regions.map(region => ({
              value: region.id,
              label: region.name,
            }))}
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Professional Summary</h3>
        <Textarea
          value={resume.summary}
          onChange={(e) => onUpdate({ summary: e.target.value })}
          placeholder="Write a compelling summary of your professional background..."
          rows={4}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Experience</h3>
          <Button
            variant="outline"
            onClick={() => onUpdate({
              experience: [
                ...resume.experience,
                {
                  title: '',
                  company: '',
                  dates: '',
                  responsibilities: [''],
                  location: '',
                  achievements: [],
                },
              ],
            })}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </Button>
        </div>

        {resume.experience.map((job, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-4">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-gray-800">Experience {index + 1}</h4>
              <Button
                variant="ghost"
                onClick={() => {
                  const updatedExperience = [...resume.experience];
                  updatedExperience.splice(index, 1);
                  onUpdate({ experience: updatedExperience });
                }}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Job Title"
                value={job.title}
                onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                placeholder="e.g., Senior Software Engineer"
              />
              <Input
                label="Company"
                value={job.company}
                onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                placeholder="e.g., Tech Corp"
              />
              <Input
                label="Location"
                value={job.location || ''}
                onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                placeholder="e.g., San Francisco, CA"
              />
              <Input
                label="Dates"
                value={job.dates}
                onChange={(e) => handleExperienceChange(index, 'dates', e.target.value)}
                placeholder="e.g., Jan 2020 - Present"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Responsibilities</label>
              {job.responsibilities.map((responsibility, rIndex) => (
                <div key={rIndex} className="flex gap-2">
                  <Textarea
                    value={responsibility}
                    onChange={(e) => {
                      const updatedResponsibilities = [...job.responsibilities];
                      updatedResponsibilities[rIndex] = e.target.value;
                      handleExperienceChange(index, 'responsibilities', updatedResponsibilities);
                    }}
                    placeholder="Describe your responsibilities..."
                    rows={2}
                  />
                  <Button
                    variant="ghost"
                    onClick={() => {
                      const updatedResponsibilities = [...job.responsibilities];
                      updatedResponsibilities.splice(rIndex, 1);
                      handleExperienceChange(index, 'responsibilities', updatedResponsibilities);
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => {
                  const updatedResponsibilities = [...job.responsibilities, ''];
                  handleExperienceChange(index, 'responsibilities', updatedResponsibilities);
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Responsibility
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Achievements</label>
              {job.achievements?.map((achievement, aIndex) => (
                <div key={aIndex} className="flex gap-2">
                  <Textarea
                    value={achievement}
                    onChange={(e) => {
                      const updatedAchievements = [...(job.achievements || [])];
                      updatedAchievements[aIndex] = e.target.value;
                      handleExperienceChange(index, 'achievements', updatedAchievements);
                    }}
                    placeholder="Describe your achievement..."
                    rows={2}
                  />
                  <Button
                    variant="ghost"
                    onClick={() => {
                      const updatedAchievements = [...(job.achievements || [])];
                      updatedAchievements.splice(aIndex, 1);
                      handleExperienceChange(index, 'achievements', updatedAchievements);
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => {
                  const updatedAchievements = [...(job.achievements || []), ''];
                  handleExperienceChange(index, 'achievements', updatedAchievements);
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Achievement
              </Button>
            </div>
          </div>
        ))}
      </div>

        <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Education</h3>
          <Button
            variant="outline"
            onClick={() => onUpdate({
              education: [
                ...resume.education,
                {
                  degree: '',
                  institution: '',
                  dates: '',
                  description: '',
                  gpa: '',
                  relevantCourses: [],
                },
              ],
            })}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </Button>
        </div>

        {resume.education.map((edu, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-4">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-gray-800">Education {index + 1}</h4>
              <Button
                variant="ghost"
                onClick={() => {
                  const updatedEducation = [...resume.education];
                  updatedEducation.splice(index, 1);
                  onUpdate({ education: updatedEducation });
                }}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Degree"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                placeholder="e.g., Bachelor of Science in Computer Science"
              />
              <Input
                label="Institution"
                value={edu.institution}
                onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                placeholder="e.g., University of Technology"
              />
              <Input
                label="Dates"
                value={edu.dates}
                onChange={(e) => handleEducationChange(index, 'dates', e.target.value)}
                placeholder="e.g., 2016 - 2020"
              />
            <Input
                label="GPA"
                value={edu.gpa || ''}
                onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                placeholder="e.g., 3.8/4.0"
              />
            </div>

            <Textarea
              label="Description"
              value={edu.description || ''}
              onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
              placeholder="Describe your education experience..."
              rows={3}
            />

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Relevant Courses</label>
              <Input
                value={edu.relevantCourses?.join(', ') || ''}
                onChange={(e) => handleEducationChange(index, 'relevantCourses', e.target.value.split(',').map(c => c.trim()))}
                placeholder="e.g., Data Structures, Algorithms, Machine Learning"
              />
            </div>
          </div>
        ))}
          </div>
          
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Skills</h3>
          <Button 
            variant="outline"
            onClick={() => onUpdate({
              skills: [
                ...resume.skills,
                {
                  name: '',
                  level: 3,
                  category: '',
                },
              ],
            })}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </Button>
        </div>

        {resume.skills.map((skill, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-4">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-gray-800">Skill {index + 1}</h4>
              <Button
                variant="ghost"
                onClick={() => {
                  const updatedSkills = [...resume.skills];
                  updatedSkills.splice(index, 1);
                  onUpdate({ skills: updatedSkills });
                }}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Skill Name"
                value={skill.name}
                onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                placeholder="e.g., JavaScript"
              />
              <Input
                label="Category"
                value={skill.category || ''}
                onChange={(e) => handleSkillChange(index, 'category', e.target.value)}
                placeholder="e.g., Programming Languages"
              />
            </div>

            {resume.optionalElements?.showSkillBars && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Skill Level (1-5)</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={skill.level || 3}
                  onChange={(e) => handleSkillChange(index, 'level', parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Beginner</span>
                  <span>Expert</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="pt-4">
        <Button
          onClick={() => onGenerate(jobRole)}
          disabled={isGenerating}
          className="w-full"
          >
            {isGenerating ? (
              <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Generating Resume...
              </>
            ) : (
            'Generate Resume'
            )}
          </Button>
        </div>
      </div>
  );
};