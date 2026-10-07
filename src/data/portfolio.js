/**
 * Single source of truth for all portfolio site content.
 * All UI components import directly from this file.
 */

export const profile = {
  name: "Anurag Goyal",
  role: "Software Engineer | Full-Stack",
  tagline: "Senior Software Engineer specializing in high-performance enterprise applications, cloud-native microservices, and full-stack development.",
  summary:
    "Results-driven Software Engineer with 7+ years of experience in designing, developing and optimizing high performance enterprise applications and cloud native microservices. Proficient in Java, Spring Boot, Spring Web-Flux, PostgreSQL, AWS, and Docker, Kubernetes and System Design with a solid foundation in data structures, algorithms, and software architecture. Proven track record of performance optimization, API security, and modernizing legacy systems. Comfortable working end-to-end and actively interested in full-stack roles. Hands on experience in performance optimization, API Security, Cloud Deployment and Agile Software deployment.",
  location: "Bangalore, India",
  email: "goyal3114@gmail.com",
  phone: "+91 9179064410",
  resumeLink: "./Anurag_Goyal_Resume.pdf",
  socialLinks: {
    github: "https://github.com/Anuraggoyal3114",
    linkedin: "https://www.linkedin.com/in/anurag-goyal-349750128",
    email: "mailto:goyal3114@gmail.com",
    phone: "tel:+919179064410",
  },
};

export const stats = [
  {
    label: "Years of Experience",
    value: "7+",
    description: "In enterprise software engineering & full-stack development",
  },
  {
    label: "API Latency Reduction",
    value: "70%",
    description: "Achieved via streaming and compression techniques",
  },
  {
    label: "APIs Secured",
    value: "30+",
    description: "Integrated with Spring Security & RBAC",
  },
  {
    label: "Companies",
    value: "3",
    description: "IBM, Virtusa, and BCITS",
  },
];

export const skills = {
  programmingLanguages: {
    title: "Programming Languages",
    skills: ["Java", "JavaScript", "HTML", "Angular", "Python"],
  },
  databases: {
    title: "Databases",
    skills: ["PostgreSQL", "Oracle", "Redis"],
  },
  frameworksAndWeb: {
    title: "Frameworks & Web",
    skills: [
      "Spring Boot",
      "Spring Web-Flux",
      "RESTful APIs",
      "Swagger / OpenAPI",
      "OAuth",
    ],
  },
  cloudAndDevOps: {
    title: "Cloud & DevOps",
    skills: [
      "AWS (EC2, ECS, S3)",
      "Docker",
      "Kubernetes",
      "Jenkins",
      "Git",
    ],
  },
  testingTools: {
    title: "Testing Tools",
    skills: ["JUnit", "Mockito", "Selenium"],
  },
  architecture: {
    title: "Architecture & Methodology",
    skills: [
      "REST",
      "Microservices",
      "CI/CD Pipelines",
      "System Design",
      "Agile Software Deployment",
      "API Security",
      "Performance Optimization",
    ],
  },
};

export const experience = [
  {
    id: "ibm",
    role: "Sr. Software Engineer",
    company: "IBM",
    location: "Bangalore",
    period: "June 2024 - Current",
    techStack: ["Java", "Spring Boot", "JavaScript", "Python", "PostgreSQL"],
    highlights: [
      "Designed and implemented an AI-based ETA Prediction systems for file uploads using Gradient Boosted Decision Trees (GBDT) trained on historical upload data to estimate completion times and improve user experience.",
      "Optimized backend APIs by implementing streaming and compression techniques reducing response times by approximately 70% while improving scalability for large datasets.",
      "Seamlessly integrated Spring Security into ~30 APIs, overcoming implementation challenges to elevate application security.",
      "Developed and maintained Python automation scripts to automate operational workflows and reducing manual effort and improving process efficiency.",
    ],
  },
  {
    id: "virtusa",
    role: "Software Engineer",
    company: "Virtusa",
    location: "Bangalore",
    period: "May 2022 – June 2024",
    techStack: ["Java", "Spring Boot", "Selenium", "Git"],
    highlights: [
      "Developed and modern-ized scalable RESTful APIs by migrating legacy applications to a Java Spring Boot microservices architecture, improving system scalability, maintainability and performance.",
      "Refactored existing codebase to enhance code quality reducing technical debt and improving long-term application stability.",
    ],
  },
  {
    id: "bcits",
    role: "Software Engineer",
    company: "BCITS",
    location: "Bangalore",
    period: "Dec 2019 – May 2022",
    techStack: ["Java", "Spring Boot", "JavaScript", "Oracle", "PostgreSQL"],
    highlights: [
      "Designed and implemented Role-Based Access Control (RBAC) using spring security, enabling secure authentication and authorization.",
      "Built and enhanced interactive Java-script UI components while collaborating with frontend and backend systems to deliver end-to end features.",
    ],
  },
];

export const education = [
  {
    institution: "R.G.P.V University | IES I.P.S ACADEMY",
    degree: "Bachelor of Technology (B.E)",
    fieldOfStudy: "Electrical & Electronics (EEE)",
    location: "Indore, M.P",
    period: "2014 - 2018",
    grades: "7.01",
  },
];

export const projects = [
  {
    id: "ai-eta-prediction",
    title: "AI-Based ETA Prediction System for File Uploads",
    description:
      "Engineered an intelligent prediction service using Gradient Boosted Decision Trees (GBDT) trained on historical upload data to calculate accurate completion times and elevate enterprise file upload experience.",
    techStack: [
      "Python",
      "Gradient Boosted Decision Trees (GBDT)",
      "Java",
      "Spring Boot",
      "PostgreSQL",
    ],
    category: "AI & Backend Engineering",
    liveLink: "TODO: Add live demo URL if publicly hosted",
    githubLink: "TODO: Add GitHub repository URL if public",
    image: "TODO: Add preview image path (e.g., /assets/projects/eta-prediction.png)",
  },
  {
    id: "api-streaming-optimization",
    title: "High-Throughput API Streaming & Compression Platform",
    description:
      "Architected backend API optimization utilizing response streaming and advanced compression techniques, cutting response latency by approximately 70% while scaling dataset handling.",
    techStack: ["Java", "Spring Web-Flux", "Spring Boot", "PostgreSQL", "REST APIs"],
    category: "Performance Optimization",
    liveLink: "TODO: Add live demo URL if publicly hosted",
    githubLink: "TODO: Add GitHub repository URL if public",
    image: "TODO: Add preview image path (e.g., /assets/projects/api-streaming.png)",
  },
  {
    id: "legacy-to-microservices",
    title: "Enterprise Legacy Modernization to Cloud-Native Microservices",
    description:
      "Migrated monolithic legacy enterprise applications to scalable Java Spring Boot microservices architecture, significantly improving system maintainability, runtime performance, and reducing technical debt.",
    techStack: ["Java", "Spring Boot", "Microservices", "RESTful APIs", "Docker", "Git"],
    category: "Cloud & Microservices",
    liveLink: "TODO: Add live demo URL if publicly hosted",
    githubLink: "TODO: Add GitHub repository URL if public",
    image: "TODO: Add preview image path (e.g., /assets/projects/microservices-migration.png)",
  },
  {
    id: "rbac-spring-security",
    title: "Enterprise Role-Based Access Control (RBAC) & API Security Suite",
    description:
      "Integrated Spring Security across ~30 critical enterprise APIs with Role-Based Access Control (RBAC), implementing robust identity authorization, token verification, and endpoint hardening.",
    techStack: ["Java", "Spring Security", "OAuth", "Oracle", "PostgreSQL", "REST"],
    category: "API Security",
    liveLink: "TODO: Add live demo URL if publicly hosted",
    githubLink: "TODO: Add GitHub repository URL if public",
    image: "TODO: Add preview image path (e.g., /assets/projects/rbac-security.png)",
  },
];

export const services = [
  {
    title: "Cloud-Native Microservices",
    description:
      "Designing, breaking down monoliths, and building scalable, decoupled microservices architectures using Java and Spring Boot.",
  },
  {
    title: "Full-Stack Web Development",
    description:
      "Delivering end-to-end web applications with modern frontend interfaces (React / JavaScript / HTML) and robust backend APIs.",
  },
  {
    title: "API Performance & Latency Optimization",
    description:
      "Accelerating enterprise APIs using streaming, compression, caching (Redis), and database query tuning.",
  },
  {
    title: "Enterprise API Security & RBAC",
    description:
      "Implementing industry-standard authentication and authorization systems with Spring Security, OAuth, and Role-Based Access Control.",
  },
  {
    title: "Cloud & DevOps Automation",
    description:
      "Containerizing services with Docker, deploying to AWS (EC2, ECS, S3), automating CI/CD pipelines with Jenkins, and creating workflow automation scripts.",
  },
];

export const achievements = [
  {
    title: "Multiple Client Spot Awards",
    organization: "Client Recognition",
    year: "Various",
    description:
      "Received multiple 'Spot Awards' from multiple clients for consistent high performance, technical excellence, and impactful contributions to team projects.",
  },
  {
    title: "IBM Generative & Agentic AI Foundation",
    organization: "IBM",
    year: "2026",
    description:
      "Credentialed in Generative & Agentic AI Foundation by IBM.",
  },
];
