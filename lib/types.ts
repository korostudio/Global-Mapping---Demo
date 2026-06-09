export interface NavLink {
  href: string;
  label: string;
}

export interface HeroStat {
  prefix: string;
  val: string;
  label: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
  spec: string;
}

export interface StatBand {
  big: string;
  unit: string;
  desc: string;
}

export interface WhyItem {
  num: string;
  title: string;
  desc: string;
}

export interface ContactInfo {
  address: string;
  email: string;
  phone: string;
  phoneRaw: string;
}

export interface SiteContent {
  company: {
    name: string;
    tagline: string;
    iso: string;
  };
  contact: ContactInfo;
  nav: NavLink[];
  hero: {
    eyebrow: string;
    headline: string[];
    highlight: string;
    description: string;
    stats: HeroStat[];
  };
  services: {
    label: string;
    heading: string;
    items: Service[];
  };
  statBand: StatBand[];
  whyUs: {
    label: string;
    heading: string[];
    description: string;
    items: WhyItem[];
  };
  clients: {
    label: string;
    heading: string;
    count: string;
    names: string[];
  };
  sectors: {
    label: string;
    heading: string;
    items: string[];
  };
  cta: {
    heading: string[];
    highlight: string;
    description: string;
    phone: string;
  };
  footer: {
    description: string;
    serviceLinks: string[];
  };
}
