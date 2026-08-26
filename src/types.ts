export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  category: "Development" | "Design" | "SEO";
  iconName: string; // Dynamic icon mapper key
  badge?: string;
  features: string[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: string;
  tagline: string;
  description: string;
  metrics: { label: string; value: string }[];
  techStack: string[];
  imageUrl: string;
  colorClass: string;
  link?: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  text: string;
  rating: number;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
  timestamp: string;
  status: "new" | "reviewed" | "scheduled";
}
