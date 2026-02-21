export type ContactLinkType = 'email' | 'linkedin' | 'github' | 'twitter';

export type AppearanceItem = {
  type: 'video' | 'talk' | 'flyer';
  title: string;
  image: string;
  url: string;
  description: string;
  date: string;
  platform: string;
  duration?: string;
  language?: string;
};

export type PersonalInfo = {
  name: string;
  tagline: string;
  email: string;
  location: string;
  profileImage: string;
};

export type Badge = {
  icon: string;
  text: string;
};

export type HeroSection = {
  title: string;
  subtitle: string;
  image: string;
  badges: Badge[];
};

export type Cta = {
  text: string;
  link: string;
};

export type AboutSection = {
  title: string;
  greeting: string;
  description: string;
  cta: Cta;
};

export type ExperienceItem = {
  company: string;
  image: string;
  role: string;
  location: string;
  period: string;
  description: string[];
  techStack: string[];
};

export type ProjectItem = {
  name: string;
  company: string;
  image: string;
  source: string;
  description: string;
  role: string;
  stack: string;
};

export type PodcastItem = {
  title: string;
  episodeUrl: string;
  description: string;
  date: string;
  language?: string;
};

export type NowSectionItem = {
  title: string;
  content: string;
};

export type NowSection = {
  title: string;
  subtitle: string;
  updatedAt: string;
  sections: NowSectionItem[];
};

export type ContactLink = {
  name: string;
  value: string;
  href: string;
  type: ContactLinkType;
};

export type ContactCollaboration = {
  title: string;
  text: string;
  cta: string;
};

export type ContactSection = {
  title: string;
  links: ContactLink[];
  calendlyUrl: string;
  collaboration: ContactCollaboration;
};

export type GithubSection = {
  username: string;
  maxReposToShow: number;
};

export type SocialLinks = {
  github: string;
  linkedin: string;
  twitter: string;
  email: string;
};

export type SeoConfig = {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  twitterHandle: string;
  url: string;
};

export type AnalyticsConfig = {
  googleAnalyticsId?: string;
  clarityId?: string;
};

export type CommandMenuItem = {
  name: string;
  icon: string;
  id?: string;
  path?: string;
  url?: string;
  action?: string;
};

export type CommandMenuConfig = {
  navigation: CommandMenuItem[];
  social: CommandMenuItem[];
  general: CommandMenuItem[];
};

export type FooterConfig = {
  copyrightText: string;
};

export type AppearancesSection = {
  title: string;
  subtitle: string;
  description: string;
  items: AppearanceItem[];
};

export type BlogSection = {
  title: string;
  description: string;
  emptyState: {
    title: string;
    description: string;
  };
};

export type UIConfig = {
  themeToggle: string;
  languageToggle: string;
  backToTop: string;
  commandMenu: {
    open: string;
    placeholder: string;
    noResults: string;
    esc: string;
    headings: {
      navigation: string;
      journal: string;
      social: string;
      general: string;
    };
    actions: {
      copyEmail: string;
      sourceCode: string;
    };
  };
  githubRepos: string;
  githubActions: {
    viewAllRepos: string;
    viewRepoOnGithub: string;
  };
  workList: {
    featuredProjects: string;
    partOfWork: string;
    closeDetails: string;
    labels: {
      project: string;
      description: string;
      role: string;
      stack: string;
    };
  };
  appearanceList: {
    scrollLeft: string;
    scrollRight: string;
    types: {
      video: string;
      talk: string;
      article: string;
    };
    actions: {
      watchVideo: string;
      viewTalk: string;
      viewDetails: string;
    };
  };
  experience: {
    title: string;
    expand: string;
    collapse: string;
    technologies: string;
    more: string;
  };
  now: {
    update: string;
  };
  notFound: {
    title: string;
    subtitle: string;
    description: string;
    backButton: string;
    buttonText: string;
  };
};

export type SiteConfig = {
  personal: PersonalInfo;
  hero: HeroSection;
  about: AboutSection;
  experience: ExperienceItem[];
  works: ProjectItem[];
  podcast: { title: string; episodeUrl: string };
  podcasts: PodcastItem[];
  appearances: AppearancesSection;
  blog: BlogSection;
  now: NowSection;
  contact: ContactSection;
  github: GithubSection;
  social: SocialLinks;
  seo: SeoConfig;
  analytics: AnalyticsConfig;
  commandMenu: CommandMenuConfig;
  footer: FooterConfig;
  ui: UIConfig;
};
