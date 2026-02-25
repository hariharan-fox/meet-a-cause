export type Volunteer = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  skills: string[];
  interests: string[];
};

export type Event = {
  id: string;
  title: string;
  ngoId: string;
  date: string;
  time: string;
  location: string;
  description: string;
  why: string;
  impact: string;
  skills: string[];
  imageUrl: string;
  cause: string;
};

export type NGO = {
  id: string;
  name: string;
  logoUrl: string;
  mission: string;
  location: string;
  cause: string[];
  impact: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatarId: string;
};

export type Certificate = {
  id: string;
  name: string;
  description: string;
  icon: any;
  isEarned: boolean;
};
