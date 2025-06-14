import { Resume } from '../types/resume';

// Mock AI generation service
// In a real app, this would connect to an actual AI API
export const generateAIContent = async (
  jobRole: string,
  name: string,
  email: string
): Promise<Partial<Resume>> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Generate content based on job role
  if (jobRole.toLowerCase().includes('frontend')) {
    return generateFrontendDevResume(name, email);
  } else if (jobRole.toLowerCase().includes('data')) {
    return generateDataScientistResume(name, email);
  } else if (jobRole.toLowerCase().includes('market')) {
    return generateMarketingResume(name, email);
  } else {
    return generateGenericResume(name, email, jobRole);
  }
};

const generateFrontendDevResume = (name: string, email: string): Partial<Resume> => {
  return {
    summary: `Passionate Frontend Developer with expertise in building responsive, user-friendly web applications. Proficient in modern JavaScript frameworks and libraries with a strong focus on creating exceptional user experiences.`,
    experience: [
      {
        title: 'Senior Frontend Developer',
        company: 'TechSolutions Inc.',
        dates: '2020 - Present',
        responsibilities: [
          'Architected and implemented responsive web applications using React, TypeScript, and Tailwind CSS',
          'Reduced application bundle size by 40% through code splitting and lazy loading strategies',
          'Collaborated with UX designers to implement pixel-perfect interfaces and animations',
          'Mentored junior developers and conducted code reviews to ensure code quality'
        ]
      },
      {
        title: 'Frontend Developer',
        company: 'Digital Innovations',
        dates: '2018 - 2020',
        responsibilities: [
          'Developed interactive UI components using Vue.js and Vuex for state management',
          'Implemented automated testing with Jest and Cypress, achieving 85% code coverage',
          'Optimized web performance achieving a 95+ Lighthouse score',
          'Participated in agile development cycles and sprint planning'
        ]
      }
    ],
    education: [
      {
        degree: 'Bachelor of Science, Computer Science',
        institution: 'University of Technology',
        dates: '2014 - 2018',
        description: 'Specialized in Web Technologies and Human-Computer Interaction'
      }
    ],
    skills: [
      { name: 'JavaScript', category: 'Programming Languages', level: 5 },
      { name: 'TypeScript', category: 'Programming Languages', level: 4 },
      { name: 'React', category: 'Frontend Frameworks', level: 5 },
      { name: 'Vue.js', category: 'Frontend Frameworks', level: 4 },
      { name: 'HTML5', category: 'Web Technologies', level: 5 },
      { name: 'CSS3', category: 'Web Technologies', level: 5 },
      { name: 'Tailwind CSS', category: 'CSS Frameworks', level: 4 },
      { name: 'Jest', category: 'Testing', level: 4 },
      { name: 'Cypress', category: 'Testing', level: 3 },
      { name: 'Webpack', category: 'Build Tools', level: 4 }
    ]
  };
};

const generateDataScientistResume = (name: string, email: string): Partial<Resume> => {
  return {
    summary: `Results-driven Data Scientist with expertise in machine learning, statistical analysis, and data visualization. Skilled in transforming complex datasets into actionable insights that drive business decisions.`,
    experience: [
      {
        title: 'Senior Data Scientist',
        company: 'Analytics Innovations',
        dates: '2019 - Present',
        responsibilities: [
          'Developed machine learning models that improved customer segmentation accuracy by 35%',
          'Created interactive data visualizations using Tableau to communicate findings to stakeholders',
          'Implemented NLP algorithms to analyze customer feedback, identifying key improvement areas',
          'Led a team of 3 data analysts in developing a predictive maintenance solution'
        ]
      },
      {
        title: 'Data Analyst',
        company: 'Global Insights Corp',
        dates: '2017 - 2019',
        responsibilities: [
          'Conducted A/B testing to optimize marketing campaigns, increasing conversion rates by 25%',
          'Built ETL pipelines to process and clean large datasets from multiple sources',
          'Created automated reporting dashboards that reduced manual reporting time by 70%',
          'Collaborated with cross-functional teams to identify business problems that could be solved with data'
        ]
      }
    ],
    education: [
      {
        degree: 'Master of Science, Data Science',
        institution: 'University of Analytics',
        dates: '2015 - 2017',
        description: 'Thesis on predictive modeling techniques for time-series data'
      },
      {
        degree: 'Bachelor of Science, Statistics',
        institution: 'State University',
        dates: '2011 - 2015',
        description: ''
      }
    ],
    skills: [
      { name: 'Python', category: 'Programming Languages', level: 5 },
      { name: 'R', category: 'Programming Languages', level: 4 },
      { name: 'SQL', category: 'Databases', level: 5 },
      { name: 'Machine Learning', category: 'AI/ML', level: 5 },
      { name: 'Statistical Analysis', category: 'Analytics', level: 5 },
      { name: 'TensorFlow', category: 'AI/ML Frameworks', level: 4 },
      { name: 'PyTorch', category: 'AI/ML Frameworks', level: 4 },
      { name: 'Pandas', category: 'Data Analysis', level: 5 },
      { name: 'NumPy', category: 'Data Analysis', level: 5 },
      { name: 'Scikit-learn', category: 'AI/ML Frameworks', level: 4 }
    ]
  };
};

const generateMarketingResume = (name: string, email: string): Partial<Resume> => {
  return {
    summary: `Strategic Marketing Professional with a proven track record of developing and executing successful marketing campaigns. Skilled in digital marketing, brand development, and marketing analytics.`,
    experience: [
      {
        title: 'Marketing Manager',
        company: 'Brand Elevate Agency',
        dates: '2020 - Present',
        responsibilities: [
          'Developed and implemented comprehensive marketing strategies that increased client revenue by an average of 30%',
          'Managed social media campaigns resulting in 45% increase in engagement and 20K+ new followers',
          'Conducted market research to identify trends and opportunities for brand positioning',
          'Supervised a team of 5 marketing specialists and coordinated with external creative agencies'
        ]
      },
      {
        title: 'Digital Marketing Specialist',
        company: 'Growth Solutions',
        dates: '2018 - 2020',
        responsibilities: [
          'Created and optimized Google and Facebook ad campaigns with a 300% ROI',
          'Implemented SEO strategies that improved organic search rankings by 40%',
          'Developed email marketing campaigns with open rates exceeding industry averages by 15%',
          'Analyzed marketing metrics to optimize campaign performance and ROI'
        ]
      }
    ],
    education: [
      {
        degree: 'Bachelor of Business Administration, Marketing',
        institution: 'Business University',
        dates: '2014 - 2018',
        description: 'Minor in Digital Media and Communications'
      }
    ],
    skills: [
      { name: 'Digital Marketing', category: 'Marketing', level: 5 },
      { name: 'Social Media Marketing', category: 'Marketing', level: 5 },
      { name: 'Content Strategy', category: 'Marketing', level: 4 },
      { name: 'SEO/SEM', category: 'Digital Marketing', level: 5 },
      { name: 'Google Analytics', category: 'Analytics', level: 5 },
      { name: 'Google Ads', category: 'Advertising', level: 4 },
      { name: 'Facebook Ads', category: 'Advertising', level: 4 },
      { name: 'Email Marketing', category: 'Marketing', level: 5 },
      { name: 'Marketing Automation', category: 'Tools', level: 4 },
      { name: 'CRM', category: 'Tools', level: 4 }
    ]
  };
};

const generateGenericResume = (name: string, email: string, jobRole: string): Partial<Resume> => {
  return {
    summary: `Dedicated ${jobRole} with a passion for excellence and continuous improvement. Combines technical expertise with strong problem-solving abilities to deliver outstanding results.`,
    experience: [
      {
        title: `Senior ${jobRole}`,
        company: 'Professional Solutions Inc.',
        dates: '2019 - Present',
        responsibilities: [
          `Led key initiatives that improved operational efficiency by 25%`,
          `Collaborated with cross-functional teams to implement innovative solutions`,
          `Developed comprehensive documentation and training materials for team members`,
          `Recognized for exceptional performance with Employee of the Year award (2021)`
        ]
      },
      {
        title: jobRole,
        company: 'Industry Innovations LLC',
        dates: '2017 - 2019',
        responsibilities: [
          `Successfully completed projects on time and under budget`,
          `Implemented process improvements that reduced costs by 15%`,
          `Maintained excellent client relationships resulting in 3 contract renewals`,
          `Trained and mentored junior team members`
        ]
      }
    ],
    education: [
      {
        degree: 'Bachelor of Science, Business Administration',
        institution: 'State University',
        dates: '2013 - 2017',
        description: ''
      }
    ],
    skills: [
      { name: 'Project Management', category: 'Management', level: 5 },
      { name: 'Team Leadership', category: 'Leadership', level: 4 },
      { name: 'Strategic Planning', category: 'Management', level: 4 },
      { name: 'Problem Solving', category: 'Core Skills', level: 5 },
      { name: 'Communication', category: 'Core Skills', level: 5 },
      { name: 'Time Management', category: 'Core Skills', level: 4 },
      { name: 'Microsoft Office Suite', category: 'Software', level: 5 },
      { name: 'Data Analysis', category: 'Analytics', level: 4 },
      { name: 'Presentation Skills', category: 'Communication', level: 4 },
      { name: 'Customer Service', category: 'Core Skills', level: 5 }
    ]
  };
};