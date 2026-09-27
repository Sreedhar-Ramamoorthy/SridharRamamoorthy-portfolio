// Single source of truth for everything shown on the site.
// Update your details here — components read from this file only.

// Total professional experience shown across the site — update as it grows.
export const EXPERIENCE_YEARS = 3.4;

export const profile = {
  name: "Sridhar Ramamoorthy",
  firstName: "Sridhar",
  lastName: "Ramamoorthy",
  title: "Java Backend Developer",
  roles: [
    "Java Backend Developer",
    "Spring Boot & Microservices",
    "REST & SOAP API Engineer",
    "Integration Engineer",
  ],
  tagline:
    "I design and build scalable, enterprise-grade backend systems with Java, Spring Boot and microservices — from APIs and integrations to cloud deployment.",
  location: "Tamil Nadu, India · Open to remote & relocation",
  // Recruiters ask these first — fill them in and they appear under the hero buttons.
  city: "", // e.g. "Chennai"
  noticePeriod: "60 days", // e.g. "30 days" or "Immediate joiner"; empty hides it
  email: "sridharramamoorthy7@gmail.com",
  phone: "+91 86081 66504",
  phoneHref: "tel:+918608166504",
  linkedin: "https://www.linkedin.com/in/sridhar-ramamoorthy-949b3b266/",
  // TODO: add your GitHub profile URL — GitHub links stay hidden while this is empty.
  github: "",
  resume: "/resume.pdf",
  openToWork: true,
};

export const about = {
  summary: () =>
    `Backend Software Engineer with ${EXPERIENCE_YEARS} years of experience designing and developing scalable, enterprise-grade applications using Java, Spring Boot and microservices. I build REST and SOAP APIs on relational and NoSQL databases, with Redis caching to keep latency low.`,
  detail:
    "At ChainSys I work on DataZap, an enterprise ETL platform, delivering SOAP-based integrations with Oracle Fusion Cloud (HCM, Financials, CRM) and cutting API response times by 25% through query and indexing optimisation. I'm comfortable across the full deployment lifecycle — Docker, Kubernetes, Jenkins CI/CD and AWS — with hands-on production monitoring (ELK, Prometheus, Grafana) and unit testing (JUnit, Mockito).",
  highlights: [
    { label: "Years experience", value: () => EXPERIENCE_YEARS, suffix: "+", decimals: 1 },
    { label: "Oracle Fusion modules integrated", value: () => 3, suffix: "" },
    { label: "Faster API responses", value: () => 25, suffix: "%" },
    { label: "Microservices shipped", value: () => 4, suffix: "" },
  ],
};

export const education = [
  {
    degree: "M.Sc in Information Technology",
    school: "Yadava College, Madurai",
    period: "2021 – 2023",
  },
  {
    degree: "B.Sc in Information Technology",
    school: "Dr. SNS Rajalakshmi College, Coimbatore",
    period: "2017 – 2020",
  },
];

export const certifications = [
  { name: "Python Programming Certification", issuer: "Hewlett Packard Enterprise (HPE)" },
  { name: "STEP (Step For Communication)", issuer: "The Hindu Group" },
];

export type SkillIcon =
  | "java" | "python" | "spring" | "springsecurity" | "hibernate" | "api" | "server" | "database"
  | "mysql" | "postgres" | "mongodb" | "redis" | "snowflake"
  | "docker" | "kubernetes" | "jenkins" | "cicd" | "aws" | "azure"
  | "junit" | "test" | "elastic" | "prometheus" | "grafana"
  | "git" | "bitbucket" | "maven" | "linux" | "keycloak" | "pattern";

export const skillGroups: {
  title: string;
  blurb: string;
  skills: { name: string; icon: SkillIcon }[];
}[] = [
  {
    title: "Languages",
    blurb: "What I write every day",
    skills: [
      { name: "Java 8+", icon: "java" },
      { name: "Python", icon: "python" },
    ],
  },
  {
    title: "Backend",
    blurb: "Frameworks, APIs and persistence",
    skills: [
      { name: "Spring Boot", icon: "spring" },
      { name: "Spring MVC", icon: "spring" },
      { name: "Spring Security", icon: "springsecurity" },
      { name: "Microservices", icon: "server" },
      { name: "RESTful APIs", icon: "api" },
      { name: "SOAP Web Services", icon: "api" },
      { name: "Hibernate", icon: "hibernate" },
      { name: "JPA", icon: "hibernate" },
      { name: "MyBatis", icon: "database" },
    ],
  },
  {
    title: "Databases & Caching",
    blurb: "Relational, NoSQL and warehouse",
    skills: [
      { name: "MySQL", icon: "mysql" },
      { name: "PostgreSQL", icon: "postgres" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Redis", icon: "redis" },
      { name: "Snowflake", icon: "snowflake" },
    ],
  },
  {
    title: "DevOps & Cloud",
    blurb: "Shipping and running software",
    skills: [
      { name: "Docker", icon: "docker" },
      { name: "Kubernetes", icon: "kubernetes" },
      { name: "Jenkins", icon: "jenkins" },
      { name: "CI/CD Pipelines", icon: "cicd" },
      { name: "AWS (EC2, ECS, EKS, S3, Lambda, IAM)", icon: "aws" },
      { name: "Azure", icon: "azure" },
    ],
  },
  {
    title: "Testing & Monitoring",
    blurb: "Quality and observability",
    skills: [
      { name: "JUnit", icon: "junit" },
      { name: "Mockito", icon: "test" },
      { name: "Code Review", icon: "git" },
      { name: "ELK Stack", icon: "elastic" },
      { name: "Prometheus", icon: "prometheus" },
      { name: "Grafana", icon: "grafana" },
    ],
  },
  {
    title: "Tools & Concepts",
    blurb: "Day-to-day toolkit and foundations",
    skills: [
      { name: "Git", icon: "git" },
      { name: "Bitbucket", icon: "bitbucket" },
      { name: "Maven", icon: "maven" },
      { name: "Linux", icon: "linux" },
      { name: "Keycloak Auth", icon: "keycloak" },
      { name: "OOP & Design Patterns", icon: "pattern" },
      { name: "System Design", icon: "pattern" },
    ],
  },
];

export const experience = [
  {
    company: "ChainSys Corporation",
    role: "Software Engineer",
    period: "Oct 2025 – Present",
    current: true,
    projects: [
      {
        name: "DataZap",
        role: "Enterprise ETL Platform",
        description:
          "Backend modules for enterprise ETL workflows that integrate data across multiple enterprise systems, including Oracle Fusion Cloud.",
        points: [
          "Improved API response time by 25% with targeted indexing and SQL views on frequently accessed ETL tables",
          "Built SOAP integrations to extract, pre-validate, transform and load data into Oracle Fusion Cloud (HCM, Financials, CRM) using template-based structures such as job family and purchase order",
          "Developed and maintained backend modules for enterprise ETL workflows using Java and Spring MVC",
          "Built and enhanced RESTful and SOAP web services, including XML request/response handling and API-level debugging",
          "Resolved production issues through root-cause analysis and hardened legacy modules for stability and performance",
          "Worked with DevOps and support teams on deployment, monitoring and maintenance, including jQuery fixes for internal tools",
        ],
        tech: ["Java", "Spring MVC", "REST", "SOAP", "XML", "MySQL", "MongoDB", "Jenkins", "AWS", "jQuery"],
      },
    ],
  },
  {
    company: "Shenll Technology Solutions",
    role: "Associate Software Engineer",
    period: "Jul 2023 – Sep 2025",
    current: false,
    projects: [
      {
        name: "SHELOGISTICS",
        role: "Logistics Platform",
        description:
          "Shipment and logistics management platform built on four microservices — admin, transhipment, agent and booking.",
        points: [
          "Designed REST APIs for shipment tracking and nearest warehouse/agent assignment using geolocation distance calculations",
          "Applied Redis caching to reduce API latency across microservices",
          "Contributed across the full lifecycle, from architecture through deployment",
          "Developed scalable Spring Boot microservices for shipment and logistics workflows",
          "Deployed with Docker, Kubernetes and Jenkins CI/CD pipelines on AWS",
          "Monitored health and performance with ELK Stack, Prometheus and Grafana",
        ],
        tech: ["Java", "Spring Boot", "Microservices", "Redis", "Docker", "Kubernetes", "Jenkins", "AWS", "ELK"],
      },
      {
        name: "APA",
        role: "Vehicle Insurance Module",
        description:
          "Backend for the vehicle insurance module of an insurance-domain application.",
        points: [
          "Developed backend functionality using Java and MyBatis",
          "Optimised MySQL queries to improve data handling and performance",
          "Wrote unit tests with JUnit and Mockito to catch regressions before deployment",
          "Supported Kubernetes-based deployments, container orchestration and monitoring",
          "Participated in debugging and production support",
        ],
        tech: ["Java", "MyBatis", "MySQL", "Kubernetes", "JUnit", "Mockito"],
      },
    ],
  },
];

// Phrases bolded inside experience bullets (percentages are bolded automatically).
export const impactTerms = [
  "Oracle Fusion Cloud",
  "SOAP integrations",
  "geolocation distance calculations",
  "Redis caching",
  "JUnit and Mockito",
  "Docker, Kubernetes and Jenkins",
];

export const projects: {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  accent: "violet" | "cyan" | "emerald";
}[] = [
  {
    title: "Spring Boot Microservices Demo",
    description:
      "Microservices reference architecture with service discovery, an API gateway and circuit breakers, packaged with Docker.",
    tech: ["Spring Boot", "Spring Cloud", "Docker"],
    accent: "violet",
  },
  {
    title: "AWS Infrastructure as Code",
    description:
      "CloudFormation templates that automate the deployment of scalable web applications on AWS.",
    tech: ["AWS", "CloudFormation", "IaC"],
    accent: "cyan",
  },
  {
    title: "Real-time Analytics Dashboard",
    description:
      "Streaming dashboard for real-time data visualisation built on Spring Boot, Kafka and Angular.",
    tech: ["Spring Boot", "Kafka", "Angular"],
    accent: "emerald",
  },
];

export const navSections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;
