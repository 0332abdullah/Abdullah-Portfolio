import { ServiceItem, PortfolioProject, ProcessStep, Testimonial } from "./types";
import powerbridgeImg from '../assets/Powerbridge-hero.PNG';
import techValleyImg from '../assets/TechValley-hero.PNG';
import tenexImg from '../assets/Tenex-hero.PNG';

export const AGENCY_NAME = "Abdullah Yaqub";
export const AGENCY_TAGLINE = "High-End Engineering & Digital Growth Engine";

export const SERVICES: ServiceItem[] = [
  {
    id: "web-dev",
    title: "Website Development",
    description: "I build fast, high-performing websites and custom web applications that match your exact business needs. From the first idea to final deployment, I make sure every site is responsive, secure, and built to bring you actual results and customers.",
    category: "Development",
    iconName: "Globe",
    features: ["React.js, Next.js, TypeScript, JavaScript, Tailwind, Vite", "Node.js, Express.js, REST APIs, MongoDB, MySQL", "WordPress, Custom Themes, Headless CMS", "Web Vitals, Serverless Architecture, Deployment"]
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    description: "Good design is all about how easy a product is to use. I create clean layouts and working prototypes early on so you can test the design, share feedback, and see your vision come to life before any heavy coding begins.",
    category: "Design",
    iconName: "Figma",
    features: ["Interactive homepage and user flow prototypes", "Figma wireframes and custom design systems", "Conversion-driven user experience (UX)", "Clear visual hierarchy and micro-interactions"]
  },
  {
    id: "app-dev",
    title: "App Development",
    description: "Bring your mobile idea to life with robust apps built for daily use. I create dependable, cross-platform mobile applications for iOS and Android that run smoothly and feel completely native to the user.",
    category: "Development",
    iconName: "Smartphone",
    features: ["Flutter and React Native development", "Secure login and payment integrations", "Offline data sync capabilities", "Full App Store and Google Play launch support"]
  },
  {
    id: "graphics",
    title: "Graphics Design",
    description: "I create clean, memorable visual assets that strengthen your brand identity and help your marketing stand out. From social media graphics to complete branding sets, I make sure your visual presence matches the true quality of your product.",
    category: "Design",
    iconName: "Palette",
    features: ["Visual brand identity", "Dynamic vector sets", "Creative art direction", "Presentations & layouts"]
  },
  {
    id: "seo",
    title: "Search Engine Optimization",
    description: "I build SEO right into your website's foundation so customers can easily find you. By fixing technical issues, speeding up code, and targeting the right keywords, I help you pull in steady, organic traffic that lasts for the long run.",
    category: "SEO",
    iconName: "Search",
    features: ["Structural Core Web Vitals audit", "Content semantic expansion", "Local & international domain rank", "Competitor gap targeting"]
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "tenex",
    title: "Tenex",
    imageUrl: tenexImg,
    colorClass: "from-orange-600 to-red-600",
    link: "https://www.tenex.co/"
  },
  {
    id: "arranged-by-naz",
    title: "Arranged By Naz",
    imageUrl: "../assets/arranged-by-naz-standalone-hero.PNG",
    colorClass: "from-cyan-500 to-blue-600",
    link: "https://sparkly-gumdrop-26e284.netlify.app/"
  },
  {
    id: "TechValley",
    title: "Tech Valley",
    imageUrl: "/assets/TechValley-hero.PNG",
    colorClass: "from-brand to-pink-600",
    link: "https://techvalley.pk/"
  },
  {
    id: "PowerBridge",
    title: "PowerBridge",
    imageUrl: "/assets/Powerbridge-hero.PNG",
    colorClass: "from-amber-500 to-orange-500",
    link: "https://sweet-ganache-b5fa59.netlify.app/"
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "DISCOVERY & PLANNING",
    description: "We start by discussing your goals, understanding your target audience, and planning out the exact requirements to map a clear path forward for your project.",
    iconName: "Eye"
  },
  {
    number: "02",
    title: "PROTOTYPE & DESIGN",
    description: "I create working homepage prototypes and clean user interface designs early on, allowing you to review the concept and give feedback before coding begins.",
    iconName: "Figma"
  },
  {
    number: "03",
    title: "DEVELOPMENT & BUILD",
    description: "I build your website or application using modern, fast technologies, ensuring the code is secure, fully responsive, and optimized for performance.",
    iconName: "Code2"
  },
  {
    number: "04",
    title: "LAUNCH & SUPPORT",
    description: "We deploy your product live to the world, run final checks, set up SEO foundations, and ensure everything is running smoothly for your users.",
    iconName: "Rocket"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Evelyn Vance",
    role: "VP of Digital Innovation",
    company: "Veloce Automotive Group",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
    text: "Aether raised the bar for what we thought was possible in browser performance. Our electric superbike dashboard runs with absolute fluidity, and pre-sales have practically doubled overnight. Truly outstanding masters of interaction design.",
    rating: 5
  },
  {
    id: "test-2",
    name: "Kaelen Drake",
    role: "Lead Creator",
    company: "Nova Creators Inc.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    text: "Working with Aether for our channel handling and YouTube SEO was a transformational pivot. Their retention tactics, surgical editing format, and psychological thumbnail layouts boosted our average view metrics by 45%.",
    rating: 5
  },
  {
    id: "test-3",
    name: "Melissa Zhang",
    role: "Chief Marketing Officer",
    company: "Pulse Finance DEX",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
    text: "Stunning craftsmanship. Our decentralized terminal feels highly secure, premium, and intensely alive. Users rave about the fluid interaction kinetics. We will absolutely partner with them on our next launch series.",
    rating: 5
  }
];

export const TEAM_MEMBERS = [
  {
    name: "Alex Sterling",
    role: "Founder & Creative Director",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
    bio: "Ex-Awwwards jury & visual interaction researcher."
  },
  {
    name: "Elena Rostova",
    role: "Lead Interactive Engineer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80",
    bio: "WebGL specialist focused on high-rate GPU render pipelines."
  },
  {
    name: "Marcus Vance",
    role: "Growth Orchestrator & SEO Pro",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80",
    bio: "Architected programmatic acquisition schemas driving 50M+ views."
  }
];

export const SYSTEM_STATS = [
  { label: "Years of Experience", value: "3+" },
  { label: "SClient Satisfaction", value: "100%" },
  { label: "Performance Rating", value: "99/100" }
];
