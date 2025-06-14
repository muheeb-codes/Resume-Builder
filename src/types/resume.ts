export interface PersonalInfo {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  website?: string;
  photo?: string;
  socialLinks?: {
  linkedin?: string;
    github?: string;
    twitter?: string;
    portfolio?: string;
  };
}

export interface JobExperience {
  title: string;
  company: string;
  dates: string;
  responsibilities: string[];
  location?: string;
  achievements?: string[];
}

export interface Education {
  degree: string;
  institution: string;
  dates: string;
  description?: string;
  gpa?: string;
  relevantCourses?: string[];
}

export interface Skill {
  name: string;
  level?: number; // 1-5 for skill bars
  category?: string;
}

export interface Theme {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  spacing: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  image: string;
  theme: Theme;
}

export interface Resume {
  personalInfo: PersonalInfo;
  summary: string;
  experience: JobExperience[];
  education: Education[];
  skills: Skill[];
  selectedTemplate: string;
  selectedTheme: string;
  targetRole?: string;
  region?: string;
  isGenerated: boolean;
  optionalElements?: {
    showPhoto: boolean;
    showSkillBars: boolean;
    showPortfolio: boolean;
    showSocialLinks: boolean;
  };
}

export const themes: Theme[] = [
  {
    id: 'modern',
    name: 'Modern',
    primaryColor: 'text-blue-700',
    secondaryColor: 'text-gray-600',
    fontFamily: 'font-sans',
    spacing: 'space-y-6'
  },
  {
    id: 'classic',
    name: 'Classic',
    primaryColor: 'text-gray-900',
    secondaryColor: 'text-gray-700',
    fontFamily: 'font-serif',
    spacing: 'space-y-5'
  },
  {
    id: 'elegant',
    name: 'Elegant',
    primaryColor: 'text-purple-700',
    secondaryColor: 'text-gray-600',
    fontFamily: 'font-sans',
    spacing: 'space-y-6'
  },
  {
    id: 'bold',
    name: 'Bold',
    primaryColor: 'text-red-700',
    secondaryColor: 'text-gray-700',
    fontFamily: 'font-sans',
    spacing: 'space-y-7'
  }
];

export const templates: Template[] = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean and traditional layout for corporate roles',
    image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    theme: themes[0]
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Modern design with visual elements',
    image: 'https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    theme: themes[1]
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with bold typography',
    image: 'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    theme: themes[2]
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Simple and elegant layout',
    image: 'https://images.pexels.com/photos/5473950/pexels-photo-5473950.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    theme: themes[3]
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'Technical-focused layout with skill emphasis',
    image: 'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    theme: themes[0]
  },
  {
    id: 'academic',
    name: 'Academic',
    description: 'Research and education focused layout',
    image: 'https://images.pexels.com/photos/5473950/pexels-photo-5473950.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    theme: themes[1]
  },
  {
    id: 'freelancer',
    name: 'Freelancer',
    description: 'Portfolio-focused layout for freelancers',
    image: 'https://images.pexels.com/photos/5473950/pexels-photo-5473950.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    theme: themes[2]
  },
];

export const initialResumeState: Resume = {
  personalInfo: {
    name: '',
    email: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  selectedTemplate: 'professional',
  selectedTheme: 'modern',
  isGenerated: false,
  optionalElements: {
    showPhoto: false,
    showSkillBars: false,
    showPortfolio: false,
    showSocialLinks: false,
  },
};

export const regions = [
  { id: 'us', name: 'United States', dateFormat: 'MM/YYYY' },
  { id: 'uk', name: 'United Kingdom', dateFormat: 'MM/YYYY' },
  { id: 'eu', name: 'European Union', dateFormat: 'MM/YYYY' },
  { id: 'asia', name: 'Asia', dateFormat: 'YYYY/MM' },
  { id: 'au', name: 'Australia', dateFormat: 'MM/YYYY' },
];