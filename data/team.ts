import { TeamMember } from '@/types';

export const team: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Morgan',
    role: 'Founder & CEO',
    department: 'Leadership',
    bio: 'Former Head of Growth at a $100M D2C brand. Obsessed with ROAS and cold brew coffee.',
    image: '',
    linkedin: 'https://linkedin.com',
  },
  {
    id: '2',
    name: 'Sarah Chen',
    role: 'Head of Strategy',
    department: 'Leadership',
    bio: 'Ex-Meta. 8+ years in performance marketing. Believes every brand has an unfair advantage waiting to be unlocked.',
    image: '',
    linkedin: 'https://linkedin.com',
  },
  {
    id: '3',
    name: 'James Wilson',
    role: 'Paid Social Lead',
    department: 'Performance',
    bio: 'Scaled 20+ brands past $1M/month in ad spend. Dog dad. Spreadsheet enthusiast.',
    image: '',
    linkedin: 'https://linkedin.com',
  },
  {
    id: '4',
    name: 'Maria Garcia',
    role: 'Paid Search Lead',
    department: 'Performance',
    bio: 'Google Ads certified since 2015. Turns search intent into revenue.',
    image: '',
    linkedin: 'https://linkedin.com',
  },
  {
    id: '5',
    name: 'David Kim',
    role: 'Performance Analyst',
    department: 'Performance',
    bio: 'Data scientist turned marketer. Finds the insights others miss.',
    image: '',
    linkedin: 'https://linkedin.com',
  },
  {
    id: '6',
    name: 'Emma Thompson',
    role: 'Creative Director',
    department: 'Creative',
    bio: 'Award-winning creative who believes great ads don\'t feel like ads.',
    image: '',
    linkedin: 'https://linkedin.com',
  },
  {
    id: '7',
    name: 'Marcus Johnson',
    role: 'Senior Designer',
    department: 'Creative',
    bio: 'Makes scroll-stopping visuals. Fueled by deadlines and matcha.',
    image: '',
    linkedin: 'https://linkedin.com',
  },
  {
    id: '8',
    name: 'Lisa Wang',
    role: 'Copywriter',
    department: 'Creative',
    bio: 'Words that sell without feeling salesy. Former journalist.',
    image: '',
    linkedin: 'https://linkedin.com',
  },
];

export const getTeamByDepartment = () => {
  const leadership = team.filter((member) => member.department === 'Leadership');
  const performance = team.filter((member) => member.department === 'Performance');
  const creative = team.filter((member) => member.department === 'Creative');

  return { leadership, performance, creative };
};
