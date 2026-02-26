import type { Volunteer, Event, NGO, Testimonial, Certificate } from './types';
import { BookOpen, Sprout, HeartPulse, Users, ShieldCheck, Rocket, Star, Heart, Medal, Trophy, Gem, Crown, Zap, TrendingUp, Award } from 'lucide-react';

export const volunteer: Volunteer = {
  id: 'vol-1',
  name: 'Priya Sharma',
  email: 'priya.sharma@example.com',
  avatarUrl: 'avatar-priya-sharma',
  skills: ['Web Development', 'Graphic Design', 'Social Media'],
  interests: ['Education', 'Technology', 'Community Building'],
};

export const allNgos: NGO[] = [
  {
    id: 'ngo-1',
    name: 'Green Earth Foundation',
    logoUrl: 'ngo-green-earth',
    mission: 'To promote environmental conservation and sustainability through community-led initiatives and education.',
    location: 'Puducherry, India',
    cause: ['Environment', 'Education'],
    impact: 'Planted over 10,000 trees and educated 5,000+ students on environmental issues.',
  },
  {
    id: 'ngo-2',
    name: 'Hope Helpers',
    logoUrl: 'ngo-hope-helpers',
    mission: 'Providing food, shelter, and support to underprivileged communities and individuals in need.',
    location: 'Chennai, India',
    cause: ['Community', 'Health'],
    impact: 'Served over 50,000 meals and provided shelter to 200+ homeless individuals last year.',
  },
  {
    id: 'ngo-3',
    name: 'Tech Forward',
    logoUrl: 'ngo-tech-forward',
    mission: 'Empowering youth with digital literacy and coding skills to bridge the technology gap.',
    location: 'Bangalore, India',
    cause: ['Education', 'Technology'],
    impact: 'Trained over 1,000 young adults in coding, with 60% securing jobs in the tech industry.',
  },
  {
    id: 'ngo-4',
    name: 'Animal Allies',
    logoUrl: 'ngo-animal-allies',
    mission: 'Rescuing, rehabilitating, and rehoming stray and abandoned animals.',
    location: 'Puducherry, India',
    cause: ['Animals'],
    impact: 'Rescued over 500 animals and facilitated 300+ adoptions in the past two years.',
  },
];

export const featuredNgos = allNgos.slice(0, 2);

export const allEvents: Event[] = [
  {
    id: 'evt-1',
    title: 'Annual Beach Cleanup Drive',
    ngoId: 'ngo-1',
    date: 'October 26, 2024',
    time: '8:00 AM - 12:00 PM',
    location: 'Promenade Beach, Puducherry',
    description: 'Join us for our biggest community event of the year! We will be cleaning up Promenade Beach to protect our marine life and keep our city beautiful. Gloves, bags, and refreshments will be provided.',
    why: 'Our beaches are vital ecosystems and a cherished part of our community\'s landscape. Plastic pollution and debris not only harm marine life like turtles and seabirds but also affect tourism and public health. Keeping our coastline clean is a shared responsibility that ensures a safer, healthier environment for everyone.',
    impact: 'By dedicating just a few hours of your time, you\'ll directly contribute to removing hundreds of kilograms of harmful waste from the ocean. Your participation helps protect vulnerable marine species, raises community awareness about pollution, and sets a powerful example for others to follow, creating a ripple effect of positive change.',
    skills: ['Teamwork', 'Environmental Awareness'],
    imageUrl: 'event-beach-cleanup',
    cause: 'Environment',
  },
  {
    id: 'evt-2',
    title: 'Weekend Food Donation Sorting',
    ngoId: 'ngo-2',
    date: 'November 2, 2024',
    time: '10:00 AM - 2:00 PM',
    location: 'Hope Helpers Warehouse, Chennai',
    description: 'We need volunteers to help sort and package food donations for distribution to local shelters and families in need. A great way to spend a few hours making a direct impact.',
    why: 'Food insecurity is a pressing issue in our community. By ensuring that surplus food reaches those who need it most, we can reduce waste and provide essential nutrition to families, children, and the elderly facing hardship.',
    impact: 'Your help in sorting and packing donations ensures that thousands of meals can be distributed efficiently. You are a crucial link in the chain that turns surplus food into hope and sustenance for vulnerable people.',
    skills: ['Organization', 'Teamwork'],
    imageUrl: 'event-food-drive',
    cause: 'Community',
  },
  {
    id: 'evt-3',
    title: 'Intro to Web Development Workshop',
    ngoId: 'ngo-3',
    date: 'November 9, 2024',
    time: '1:00 PM - 5:00 PM',
    location: 'Tech Forward Center, Bangalore',
    description: 'Share your web development skills by mentoring aspiring young coders. We are looking for volunteers to assist with a hands-on workshop covering the basics of HTML, CSS, and JavaScript.',
    why: 'Digital literacy is no longer a luxury but a necessity for economic empowerment. Providing accessible tech education to underserved youth opens up pathways to stable, high-growth careers and breaks cycles of poverty.',
    impact: 'By sharing your expertise, you will inspire and equip the next generation of tech innovators. Your mentorship can be the spark that ignites a young person\'s passion and sets them on a path to a brighter future.',
    skills: ['HTML', 'CSS', 'JavaScript', 'Mentoring'],
    imageUrl: 'event-coding-workshop',
    cause: 'Education',
  },
  {
    id: 'evt-4',
    title: 'Adopt-a-Pet Day at the Shelter',
    ngoId: 'ngo-4',
    date: 'November 16, 2024',
    time: '11:00 AM - 4:00 PM',
    location: 'Animal Allies Shelter, Puducherry',
    description: 'Help us find forever homes for our rescued animals! We need volunteers to assist with handling animals, talking to potential adopters, and managing the event flow.',
    why: 'Every year, thousands of healthy, loving animals are euthanized in shelters due to lack of space and resources. Adoption events provide a critical platform to connect these animals with loving forever homes.',
    impact: 'Your assistance at the event directly increases the chances of adoption for our shelter animals. You\'ll be helping to create happy families and saving lives by freeing up shelter space for other animals in need.',
    skills: ['Animal Handling', 'Communication'],
    imageUrl: 'event-animal-shelter',
    cause: 'Animals',
  },
  {
    id: 'evt-5',
    title: 'Youth Mentorship Program Kick-off',
    ngoId: 'ngo-3',
    date: 'November 23, 2024',
    time: '2:00 PM - 4:00 PM',
    location: 'Online',
    description: 'Become a mentor and guide a young student in their career journey. This kick-off session will match mentors with mentees and set the stage for a successful program.',
    why: 'Many talented young students lack access to professional networks and guidance, which can be a significant barrier to their career progression. Mentorship provides invaluable support, direction, and encouragement.',
    impact: 'As a mentor, you will provide personalized guidance that can shape a student\'s career trajectory. Your insights and support can build their confidence, expand their network, and help them achieve their professional dreams.',
    skills: ['Mentoring', 'Communication', 'Career Guidance'],
    imageUrl: 'event-mentorship-session',
    cause: 'Education',
  },
  {
    id: 'evt-6',
    title: 'Community Tree Planting Day',
    ngoId: 'ngo-1',
    date: 'December 7, 2024',
    time: '9:00 AM - 1:00 PM',
    location: 'Botanical Garden, Puducherry',
    description: 'Help us green our city! We are planting 500 native tree saplings at the Botanical Garden. No prior experience needed, just a willingness to get your hands dirty for a good cause.',
    why: 'Urban green spaces are essential for biodiversity, air quality, and public wellbeing. Planting trees helps combat climate change, reduces the urban heat island effect, and creates beautiful, healthy spaces for the community.',
    impact: 'Each tree you plant will grow to provide oxygen, filter pollutants, and offer shade for decades to come. You are leaving a lasting, living legacy that will benefit the environment and the community for generations.',
    skills: ['Gardening', 'Teamwork'],
    imageUrl: 'event-tree-planting',
    cause: 'Environment',
  },
];

export const featuredEvents = allEvents.slice(0, 2);
export const upcomingCommitments = allEvents.slice(4, 6);
export const completedEvents: Event[] = [
  allEvents[0],
  allEvents[1],
  allEvents[3],
];

export const allCertificates: Certificate[] = [
  // Getting Started
  { id: 'start-1', name: 'Verified Volunteer', description: 'Complete your first event and get verified.', icon: ShieldCheck, isEarned: true, level: 'Bronze' },
  { id: 'start-2', name: 'Fast Starter', description: 'Complete an event within your first 7 days.', icon: Rocket, isEarned: true, level: 'Silver' },
  { id: 'start-3', name: 'Profile Pro', description: 'Complete your user profile with skills and interests.', icon: Users, isEarned: true, level: 'Bronze' },

  // Event Participation
  { id: 'event-1', name: 'First Step', description: 'Complete your first event.', icon: Medal, isEarned: true, level: 'Bronze' },
  { id: 'event-2', name: 'Active Volunteer', description: 'Complete 5 events.', icon: Medal, isEarned: true, level: 'Silver' },
  { id: 'event-3', name: 'Dedicated Volunteer', description: 'Complete 15 events.', icon: Medal, isEarned: false, level: 'Gold' },
  { id: 'event-4', name: 'Volunteer Extraordinaire', description: 'Complete 30 events.', icon: Medal, isEarned: false, level: 'Platinum' },

  // Hours Logged
  { id: 'hours-1', name: 'Hour Hero', description: 'Log 10 volunteer hours.', icon: Trophy, isEarned: true, level: 'Bronze' },
  { id: 'hours-2', name: 'Hour Hero', description: 'Log 25 volunteer hours.', icon: Trophy, isEarned: true, level: 'Silver' },
  { id: 'hours-3', name: 'Hour Hero', description: 'Log 50 volunteer hours.', icon: Trophy, isEarned: false, level: 'Gold' },
  { id: 'hours-4', name: 'Hour Hero', description: 'Log 100 volunteer hours.', icon: Trophy, isEarned: false, level: 'Platinum' },
  
  // Cause-Specific: Community
  { id: 'cause-comm-1', name: 'Community Champion', description: 'Complete 3 community-focused events.', icon: HeartPulse, isEarned: true, level: 'Bronze' },
  { id: 'cause-comm-2', name: 'Community Champion', description: 'Complete 7 community-focused events.', icon: HeartPulse, isEarned: false, level: 'Silver' },
  { id: 'cause-comm-3', name: 'Community Champion', description: 'Complete 15 community-focused events.', icon: HeartPulse, isEarned: false, level: 'Gold' },

  // Cause-Specific: Environment
  { id: 'cause-env-1', name: 'Green Guardian', description: 'Complete 3 environmental events.', icon: Sprout, isEarned: true, level: 'Bronze' },
  { id: 'cause-env-2', name: 'Green Guardian', description: 'Complete 7 environmental events.', icon: Sprout, isEarned: false, level: 'Silver' },
  { id: 'cause-env-3', name: 'Green Guardian', description: 'Complete 15 environmental events.', icon: Sprout, isEarned: false, level: 'Gold' },

  // Cause-Specific: Education
  { id: 'cause-edu-1', name: 'Education Enthusiast', description: 'Complete 3 education-focused events.', icon: BookOpen, isEarned: false, level: 'Bronze' },
  { id: 'cause-edu-2', name: 'Education Enthusiast', description: 'Complete 7 education-focused events.', icon: BookOpen, isEarned: false, level: 'Silver' },
  { id: 'cause-edu-3', name: 'Education Enthusiast', description: 'Complete 15 education-focused events.', icon: BookOpen, isEarned: false, level: 'Gold' },

  // Cause-Specific: Animals
  { id: 'cause-animal-1', name: 'Animal Ally', description: 'Complete 3 animal welfare events.', icon: Heart, isEarned: true, level: 'Bronze' },
  { id: 'cause-animal-2', name: 'Animal Ally', description: 'Complete 7 animal welfare events.', icon: Heart, isEarned: false, level: 'Silver' },
  { id: 'cause-animal-3', name: 'Animal Ally', description: 'Complete 15 animal welfare events.', icon: Heart, isEarned: false, level: 'Gold' },
  
  // Diversity of Causes
  { id: 'diverse-1', name: 'Cause Connector', description: 'Volunteer for 3 different causes.', icon: Users, isEarned: false, level: 'Bronze' },
  { id: 'diverse-2', name: 'Cause Explorer', description: 'Volunteer for 5 different causes.', icon: Users, isEarned: false, level: 'Silver' },
  { id: 'diverse-3', name: 'Cause Connoisseur', description: 'Volunteer for 7 different causes.', icon: Users, isEarned: false, level: 'Gold' },
  
  // Special Milestones
  { id: 'special-1', name: 'Weekend Warrior', description: 'Volunteer on 3 consecutive weekends.', icon: Zap, isEarned: false, level: 'Silver' },
  { id: 'special-2', name: 'Top Volunteer', description: 'Be in the top 10% of volunteers by hours this quarter.', icon: Star, isEarned: false, level: 'Gold' },
  { id: 'special-3', name: 'NGO Nomad', description: 'Volunteer with 5 different NGOs.', icon: TrendingUp, isEarned: false, level: 'Silver' },
  { id: 'special-4', name: 'Leadership', description: 'Lead a volunteer team at an event.', icon: Crown, isEarned: false, level: 'Gold' },
  { id: 'special-5', name: 'Recruiter', description: 'Recruit 3 new volunteers to the platform.', icon: Gem, isEarned: false, level: 'Gold' },

  // Placeholder Badges to reach 50
  { id: 'placeholder-1', name: 'Skill Sharer', description: 'Volunteer for an event using one of your top skills.', icon: Award, isEarned: false, level: 'Bronze' },
  { id: 'placeholder-2', name: 'Tech Guru', description: 'Complete 5 tech-related events.', icon: Award, isEarned: false, level: 'Silver' },
  { id: 'placeholder-3', name: 'Health Hero', description: 'Complete 5 health-focused events.', icon: Award, isEarned: false, level: 'Silver' },
  { id: 'placeholder-4', name: 'Arts Advocate', description: 'Complete 5 arts & culture events.', icon: Award, isEarned: false, level: 'Silver' },
  { id: 'placeholder-5', name: 'Senior Support', description: 'Complete 5 events focused on senior citizens.', icon: Award, isEarned: false, level: 'Silver' },
  { id: 'placeholder-6', name: 'Team Player', description: 'Complete events with 10 different volunteers.', icon: Award, isEarned: false, level: 'Bronze' },
  { id: 'placeholder-7', name: 'Night Owl', description: 'Volunteer for an event that ends after 9 PM.', icon: Award, isEarned: false, level: 'Bronze' },
  { id: 'placeholder-8', name: 'Early Bird', description: 'Volunteer for an event that starts before 8 AM.', icon: Award, isEarned: false, level: 'Bronze' },
  { id: 'placeholder-9', name: 'Loyalty', description: 'Complete 5 events with the same NGO.', icon: Award, isEarned: false, level: 'Gold' },
  { id: 'placeholder-10', name: 'Super Streaker', description: 'Volunteer at least once a month for 6 consecutive months.', icon: Award, isEarned: false, level: 'Platinum' },
  { id: 'placeholder-11', name: 'Annual Achiever', description: 'Log 200 volunteer hours in a single year.', icon: Gem, isEarned: false, level: 'Platinum' },
  { id: 'placeholder-12', name: 'Grandmaster', description: 'Log 500 volunteer hours in total.', icon: Crown, isEarned: false, level: 'Platinum' },
  { id: 'placeholder-13', name: 'Mentor Master', description: 'Mentor 5 times in educational workshops.', icon: BookOpen, isEarned: false, level: 'Platinum' },
  { id: 'placeholder-14', name: 'Environmental Steward', description: 'Log 50 hours in environmental causes.', icon: Sprout, isEarned: false, level: 'Platinum' },
  { id: 'placeholder-15', name: 'Community Pillar', description: 'Log 50 hours in community causes.', icon: HeartPulse, isEarned: false, level: 'Platinum' },
  { id: 'placeholder-16', name: 'Animal Guardian', description: 'Log 50 hours in animal welfare causes.', icon: Heart, isEarned: false, level: 'Platinum' },
  { id: 'placeholder-17', name: 'All-Star', description: 'Unlock 25 other badges.', icon: Star, isEarned: false, level: 'Platinum' },
  { id: 'placeholder-18', name: 'Legend', description: 'Unlock all other 49 badges.', icon: Crown, isEarned: false, level: 'Platinum' },
];


export const howItWorks = [
  {
    title: 'Discover Opportunities',
    description: 'Browse through a wide range of events and projects posted by trusted NGOs. Filter by your interests, skills, and location to find the perfect match.'
  },
  {
    title: 'Connect & Participate',
    description: 'Sign up for events with a single click. Connect with NGOs, and collaborate with fellow volunteers who share your passion for making a difference.'
  },
  {
    title: 'Track Your Impact',
    description: 'Log your volunteer hours, track your contributions, and earn certificates for your hard work. See the tangible impact you\'re making in the community.'
  }
];

export const testimonials: Testimonial[] = [
  {
    quote: 'ConnectSphere made it so easy to find a cause I\'m passionate about. I\'ve met amazing people and feel like I\'m truly making a difference in my local community.',
    name: 'Jane Doe',
    role: 'Volunteer',
    avatarId: 'avatar-jane-doe'
  },
  {
    quote: 'As a small NGO, finding dedicated volunteers was always a challenge. This platform has connected us with a pool of skilled and enthusiastic individuals. It\'s been a game-changer!',
    name: 'John Smith',
    role: 'Director, Hope Helpers',
    avatarId: 'avatar-john-smith'
  },
  {
    quote: 'The dashboard is fantastic for tracking my hours and seeing my volunteering history all in one place. It keeps me motivated to do more!',
    name: 'Priya Sharma',
    role: 'Volunteer',
    avatarId: 'avatar-priya-sharma'
  }
];
