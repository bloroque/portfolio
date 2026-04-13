const translations = {
  en: {
    // Navigation
    nav: {
      about: "Profile",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      contact: "Contact",
    },

    // Header
    header: {
      lightMode: "Switch to light mode",
      darkMode: "Switch to dark mode",
    },

    // Home Section
    home: {
      greeting: "Hi there, I'm",
      role: "Fullstack PHP & JavaScript Developer",
      badge: "Open to new challenges",
      experience: "4+ years of experience (since Nov. 2021). Based in Madagascar, specializing in SaaS applications, business platforms and custom web solutions.",
      contactBtn: "Contact",
      cvBtn: "Download CV",
      downloadCV: "Download my CV",
      services: {
        title: "My Services",
        website: "Website Development",
        websiteDesc: "Custom showcase & e-commerce websites, optimized for SEO and performance.",
        fullstack: "Full-Stack Development",
        fullstackDesc: "Complete web applications with modern front-end and robust back-end.",
        saas: "SaaS Applications",
        saasDesc: "Scalable multi-tenant platforms with subscription management.",
        api: "API & Backend",
        apiDesc: "RESTful APIs, microservices architectures and third-party integrations.",
        ui: "UI/UX Integration",
        uiDesc: "Pixel-perfect integration of mockups into responsive, accessible interfaces.",
        maintenance: "Maintenance & Support",
        maintenanceDesc: "Monitoring, bug fixes, updates and continuous improvement."
      }
    },

    // About Section
    about: {
      title: "― About Me",
      imageAlt: "Profile photo",
      paragraph1:
        "I am a passionate Fullstack Developer with solid experience in designing and developing modern web applications. I master both front-end and back-end technologies, enabling me to create complete and high-performance solutions.",
      paragraph2:
        "My approach combines technical rigor and creativity to build smooth and robust tools, tailored to users' real needs.",
      paragraph3:
        "Autonomous and team-oriented, I enjoy tackling complex challenges and transforming ideas into tangible digital products.",
      cta: "Let's work together!",
      highlightTech: "Full-Stack",
      highlightCreative: "Creative Problem Solver",
      highlightTeam: "Team Player",
      animTitle1: "Passionate",
      animTitle2: "about Code",
    },

    // Skills Section
    skills: {
      title: "― Development Expertise",
      subtitle:
        "Always up-to-date with the latest technologies and innovations in web and mobile development",
      whatIKnow: "― What I Master",
      hardSkillsTitle: "Hard Skills (Stack)",
      description1:
        "My technical expertise covers the entire web application development cycle, from front-end design to back-end implementation and deployment.",
      description2:
        "I work with modern frameworks and tools that enable me to build robust, scalable, and maintainable applications.",
      description3:
        "I am constantly on the lookout for new technologies and best practices to deliver high-quality projects.",
      cta: "Let's work together!",
      categories: {
        languagesFrameworks: "Languages & Frameworks",
        architectureParadigms: "Architecture & Paradigms",
        databases: "Databases",
        apisComm: "APIs & Communication",
        uiDesign: "UI & Design Systems",
        toolsDevops: "Tools & DevOps",
      },
      groups: {
        backend: "Backend",
        frontend: "Frontend",
        database: "Database",
        tools: "Tools & DevOps",
      },
      engineering: {
        title: "Engineering Fundamentals",
        description: "I design my applications following proven architectural principles: OOP, SOLID, Clean Architecture, DDD and MVC patterns. I structure data flows with DTOs to ensure clear separation of concerns, maintainability and scalability across every project.",
      },
      softSkills: {
        title: "Soft Skills",
        description: "Technical rigor, clear communication and strong teamwork define my approach. I adapt quickly to new environments, tackle complex problems methodically, and maintain a genuine curiosity that drives continuous learning and professional growth.",
      },
    },

    // Projects Section
    projects: {
      intro:
        "I have had the opportunity to work on several projects that have allowed me to develop my skills and showcase my creativity. Each project represents an opportunity to create something beautiful, functional, and unique. In this portfolio, I am happy to present some of my best work.",
      title: "― Projects",
      subtitle: "and Challenges",
      viewAll: "View All Projects",
      detailTitle: "Project Details",
      detailSubtitle: "Discover my work and the technologies used",
      viewMore: "View more",
      detail: "Detail",
      backHome: "Back to home",
      filterAll: "All",
      techUsed: "Technologies used",
      liveDemo: "Live Demo",
      sourceCode: "Source Code",
      noResults: "No projects match this filter.",
      statusLabels: {
        completed: "Completed",
        inProgress: "In Progress",
        standby: "Standby",
      },
      items: {
        p1: {
          title: "SaaS Platform",
          desc: "A complete SaaS management application with authentication, dashboards, and real-time data analytics.",
          role: "Fullstack Developer",
          duration: "6 months",
          client: "Startup client",
          features: ["User authentication & roles", "Real-time dashboards", "Data analytics & reports", "REST API", "Responsive design"],
          challenge: "Building a scalable multi-tenant architecture capable of handling thousands of concurrent users while maintaining real-time data synchronization across dashboards."
        },
        p2: {
          title: "Business Portal",
          desc: "Custom business portal with role-based access, reporting modules, and API integrations.",
          role: "Backend Lead",
          duration: "4 months",
          client: "Enterprise client",
          features: ["Role-based access control", "Dynamic reporting", "Third-party API integration", "Data export (CSV/PDF)", "Activity logging"],
          challenge: "Integrating multiple third-party APIs with different authentication schemes while ensuring data consistency and implementing a flexible role-based permission system."
        },
        p3: {
          title: "Portfolio Website",
          desc: "Modern portfolio website with animations, dark mode, and multilingual support.",
          role: "Frontend Developer",
          duration: "2 months",
          client: "Personal project",
          features: ["Framer Motion animations", "Dark/light theme", "EN/FR multilingual", "Responsive layout", "Contact form & scheduler"],
          challenge: "Creating smooth, performant animations across all sections while maintaining accessibility and ensuring consistent rendering in both light and dark themes."
        },
        p4: {
          title: "E-commerce Solution",
          desc: "Full-featured e-commerce platform with payment gateway, inventory management, and order tracking.",
          role: "Fullstack Developer",
          duration: "8 months",
          client: "Retail client",
          features: ["Payment gateway integration", "Inventory management", "Order tracking system", "Admin dashboard", "Email notifications"],
          challenge: "Implementing a secure payment pipeline with multiple providers and building a real-time inventory system that prevents overselling during high-traffic periods."
        },
      },
      sectionLabels: {
        role: "My Role",
        duration: "Duration",
        client: "Client",
        features: "Key Features",
        challenge: "Main Challenge",
        techStack: "Tech Stack",
        links: "Links",
      },
    },

    // Experience Section
    experience: {
      title: "― Experience",
      subtitle: "My professional journey and career path.",
      jobs: [
        {
          role: "Fullstack Developer",
          company: "Freelance",
          type: "Self-employed",
          period: "Jan 2024 – Present",
          duration: "2 yrs+",
          location: "Fianarantsoa, Madagascar",
          remote: "Remote",
          current: true,
          description: "Design and development of modern web applications for various clients. Complete management from requirements gathering through deployment.",
          achievements: [
            "Built responsive portfolio and SaaS platforms with React & Node.js",
            "Integrated third-party APIs (Google Calendar, payment gateways)",
            "Delivered 5+ projects end-to-end with high client satisfaction",
          ],
          skills: ["React", "Node.js", "Tailwind CSS", "MongoDB", "REST API", "Git"],
        },
        {
          role: "Frontend Developer",
          company: "Tech Company",
          type: "Full-time",
          period: "Nov 2021 – Dec 2023",
          duration: "2 yrs 2 mos",
          location: "Fianarantsoa, Madagascar",
          remote: "Hybrid",
          current: false,
          description: "Developed user interfaces and interactive features for web applications in an agile team.",
          achievements: [
            "Migrated legacy jQuery codebase to React, improving performance by 40%",
            "Implemented responsive designs following Figma mockups pixel-perfect",
            "Collaborated with backend team on REST API integration",
          ],
          skills: ["React", "JavaScript", "CSS3", "Figma", "jQuery", "Agile"],
        },
      ],
    },

    // Contact Section
    contact: {
      title: "― Contact Me",
      description:
        "Have a project in mind or want to collaborate? Feel free to reach out!",
      tabs: {
        form: "Contact Form",
        scheduler: "Schedule a Meeting",
      },
      nameLabel: "Full Name",
      emailLabel: "Email",
      messageLabel: "Message",
      sendButton: "Send Message",
      namePlaceholder: "Your name",
      emailPlaceholder: "your@email.com",
      messagePlaceholder: "Your message...",
      infoTitle: "Get in Touch",
      availableStatus: "Available for new projects",
      responseTime: "I typically respond within 24 hours. Feel free to use either the form or schedule a meeting directly.",
      scheduler: {
        noDateSelected: "No date selected",
        selectDatePrompt: "Select a date on the calendar to see available time slots.",
        confirmButton: "Confirm Appointment",
        modal: {
          title: "Confirm your details",
          nameLabel: "Full Name",
          namePlaceholder: "Your name",
          emailLabel: "Email address",
          emailPlaceholder: "your@email.com",
          phoneLabel: "Phone number",
          phonePlaceholder: "+261 00 000 00",
          notesLabel: "Additional notes",
          notesPlaceholder: "Please provide any information that will help prepare our meeting.",
          cancelButton: "Cancel",
          confirmButton: "Confirm appointment",
        },
      },
    },

    // Footer
    footer: {
      copyright: "Copyright",
      rights: "All rights reserved",
    },
  },

  fr: {
    // Navigation
    nav: {
      about: "Profil",
      skills: "Compétences",
      experience: "Expériences",
      projects: "Projets",
      contact: "Contact",
    },

    // Header
    header: {
      lightMode: "Passer en mode clair",
      darkMode: "Passer en mode sombre",
    },

    // Home Section
    home: {
      greeting: "Hey ! Moi c'est",
      role: "Développeur Fullstack PHP & JavaScript",
      badge: "À l'écoute de nouveaux défis",
      experience: "Plus de 4 ans d'expérience (depuis nov. 2021). Basé à Madagascar, spécialisé dans les applications SaaS, plateformes métier et solutions web sur mesure.",
      contactBtn: "Contact",
      cvBtn: "Télécharger le CV",
      downloadCV: "Télécharger mon CV",
      services: {
        title: "Mes Services",
        website: "Développement Site Internet",
        websiteDesc: "Sites vitrines & e-commerce sur mesure, optimisés pour le SEO et la performance.",
        fullstack: "Développement Full-Stack",
        fullstackDesc: "Applications web complètes avec front-end moderne et back-end robuste.",
        saas: "Applications SaaS",
        saasDesc: "Plateformes multi-tenants évolutives avec gestion d'abonnements.",
        api: "API & Backend",
        apiDesc: "APIs RESTful, architectures microservices et intégrations tierces.",
        ui: "Intégration UI/UX",
        uiDesc: "Intégration pixel-perfect des maquettes en interfaces responsives et accessibles.",
        maintenance: "Maintenance & Support",
        maintenanceDesc: "Surveillance, correctifs, mises à jour et amélioration continue."
      }
    },

    // About Section
    about: {
      title: "― À propos de moi",
      imageAlt: "Photo de profil",
      paragraph1:
        "Développeur Fullstack PHP & JavaScript, avec une solide expérience dans la conception et le développement d'applications web modernes. Je maîtrise les technologies front-end et back-end, ce qui me permet de créer des solutions complètes et performantes.",
      paragraph2:
        "Mon approche allie rigueur technique et créativité pour créer des outils fluides et robustes, adaptés aux besoins réels des utilisateurs.",
      paragraph3:
        "Autonome et orienté vers le travail d'équipe, j'aime relever des défis complexes et transformer les idées en produits numériques concrets.",
      cta: "Travaillons ensemble !",
      highlightTech: "Full-Stack",
      highlightCreative: "Résolveur Créatif",
      highlightTeam: "Esprit d'Équipe",
      animTitle1: "Passionné",
      animTitle2: "de Code",
    },

    // Skills Section
    skills: {
      title: "― Expertise en Développement",
      subtitle:
        "Toujours à jour avec les dernières technologies et innovations en développement web et mobile",
      whatIKnow: "― Ce que je maîtrise",
      hardSkillsTitle: "Hard Skills (Stack technique)",
      description1:
        "Mon expertise technique couvre l'ensemble du cycle de développement d'applications web, de la conception frontend à l'implémentation back-end et au déploiement.",
      description2:
        "Je travaille avec des frameworks et outils modernes qui me permettent de construire des applications robustes, évolutives et maintenables.",
      description3:
        "Je suis constamment à l'affût des nouvelles technologies et des meilleures pratiques pour livrer des projets de haute qualité.",
      cta: "Travaillons ensemble !",
      categories: {
        languagesFrameworks: "Langages & Frameworks",
        architectureParadigms: "Architecture & Paradigmes",
        databases: "Bases de données",
        apisComm: "APIs & Communication",
        uiDesign: "UI & Design Systems",
        toolsDevops: "Outils & DevOps",
      },
      groups: {
        backend: "Backend",
        frontend: "Frontend",
        database: "Base de données",
        tools: "Outils & DevOps",
      },
      engineering: {
        title: "Fondamentaux d'ingénierie",
        description: "Je conçois mes applications selon des principes architecturaux éprouvés : POO, SOLID, Clean Architecture, DDD et le pattern MVC. Je structure les flux de données avec des DTO pour garantir une séparation claire des responsabilités, la maintenabilité et la scalabilité de chaque projet.",
      },
      softSkills: {
        title: "Soft Skills",
        description: "Rigueur technique, communication claire et esprit d'équipe définissent mon approche. Je m'adapte rapidement à de nouveaux environnements, résous les problèmes de manière méthodique, et entretiens une curiosité constante qui alimente mon apprentissage continu et ma progression professionnelle.",
      },
    },

    // Projects Section
    projects: {
      intro:
        "J'ai eu l'opportunité de travailler sur plusieurs projets qui m'ont permis de développer mes compétences et de montrer ma créativité. Chaque projet représente une occasion de créer quelque chose de beau, fonctionnel et unique. Dans ce portfolio, je suis heureux de présenter certains de mes meilleurs travaux.",
      title: "― Projets",
      subtitle: "et Défis",
      viewAll: "Voir tous",
      detailTitle: "Détails des projets",
      detailSubtitle: "Découvrez mes réalisations et les technologies utilisées",
      viewMore: "Voir plus",
      detail: "Détail",
      backHome: "Retour à l'accueil",
      filterAll: "Tout",
      techUsed: "Technologies utilisées",
      liveDemo: "Démo en ligne",
      sourceCode: "Code source",
      noResults: "Aucun projet ne correspond à ce filtre.",
      statusLabels: {
        completed: "Terminé",
        inProgress: "En cours",
        standby: "En attente",
      },
      items: {
        p1: {
          title: "Plateforme SaaS",
          desc: "Application SaaS complète avec authentification, tableaux de bord et analyse de données en temps réel.",
          role: "Développeur Fullstack",
          duration: "6 mois",
          client: "Client startup",
          features: ["Authentification & rôles", "Tableaux de bord temps réel", "Analyses & rapports", "API REST", "Design responsive"],
          challenge: "Construire une architecture multi-tenant évolutive capable de gérer des milliers d'utilisateurs simultanés tout en maintenant la synchronisation des données en temps réel."
        },
        p2: {
          title: "Portail Métier",
          desc: "Portail métier sur mesure avec gestion des rôles, modules de reporting et intégrations API.",
          role: "Lead Backend",
          duration: "4 mois",
          client: "Client entreprise",
          features: ["Contrôle d'accès par rôles", "Reporting dynamique", "Intégration API tierces", "Export de données (CSV/PDF)", "Journal d'activités"],
          challenge: "Intégrer plusieurs API tierces avec différents systèmes d'authentification tout en assurant la cohérence des données et un système de permissions flexible."
        },
        p3: {
          title: "Site Portfolio",
          desc: "Site portfolio moderne avec animations, mode sombre et support multilingue.",
          role: "Développeur Frontend",
          duration: "2 mois",
          client: "Projet personnel",
          features: ["Animations Framer Motion", "Thème sombre/clair", "Multilingue EN/FR", "Layout responsive", "Formulaire & planificateur"],
          challenge: "Créer des animations fluides et performantes sur toutes les sections tout en maintenant l'accessibilité et un rendu cohérent en mode clair et sombre."
        },
        p4: {
          title: "Solution E-commerce",
          desc: "Plateforme e-commerce complète avec passerelle de paiement, gestion de stock et suivi de commandes.",
          role: "Développeur Fullstack",
          duration: "8 mois",
          client: "Client retail",
          features: ["Intégration passerelle de paiement", "Gestion de stock", "Suivi de commandes", "Dashboard admin", "Notifications email"],
          challenge: "Implémenter un pipeline de paiement sécurisé avec plusieurs fournisseurs et un système d'inventaire temps réel empêchant la survente en période de fort trafic."
        },
      },
      sectionLabels: {
        role: "Mon Rôle",
        duration: "Durée",
        client: "Client",
        features: "Fonctionnalités clés",
        challenge: "Défi principal",
        techStack: "Technologies",
        links: "Liens",
      },
    },

    // Experience Section
    experience: {
      title: "― Expériences",
      subtitle: "Mon parcours professionnel et mes réalisations.",
      jobs: [
        {
          role: "Développeur Fullstack",
          company: "Freelance",
          type: "Indépendant",
          period: "Jan 2024 – Présent",
          duration: "2 ans+",
          location: "Fianarantsoa, Madagascar",
          remote: "À distance",
          current: true,
          description: "Conception et développement d'applications web modernes pour divers clients. Gestion complète du recueil des besoins jusqu'au déploiement.",
          achievements: [
            "Création de portfolios et plateformes SaaS avec PHP & Laravel",
            "Intégration d'APIs tierces (Google Calendar, passerelles de paiement)",
            "Livraison de 5+ projets de bout en bout avec satisfaction client élevée",
          ],
          skills: ["PHP", "CodeIgniter", "Laravel/Lumen", "Symfony", "Vue.js", "jQuery", "Wordpress"],
        },
      ],
    },

    // Contact Section
    contact: {
      title: "― Contactez-moi",
      description:
        "Vous avez un projet en tête ou souhaitez collaborer ? N'hésitez pas à me contacter !",
      tabs: {
        form: "Formulaire de contact",
        scheduler: "Planifier un rendez-vous",
      },
      nameLabel: "Nom complet",
      emailLabel: "E-mail",
      messageLabel: "Message",
      sendButton: "Envoyer le message",
      namePlaceholder: "Votre nom",
      emailPlaceholder: "votre@email.com",
      messagePlaceholder: "Votre message...",
      infoTitle: "Restons en contact",
      availableStatus: "Disponible pour de nouveaux projets",
      responseTime: "Je réponds généralement sous 24 heures. N'hésitez pas à utiliser le formulaire ou à planifier directement un rendez-vous.",
      scheduler: {
        noDateSelected: "Aucune date sélectionnée",
        selectDatePrompt: "Sélectionnez une date sur le calendrier pour voir les créneaux disponibles.",
        confirmButton: "Confirmer le rendez-vous",
        modal: {
          title: "Confirmer vos coordonnées",
          nameLabel: "Nom complet",
          namePlaceholder: "Votre nom",
          emailLabel: "Adresse e-mail",
          emailPlaceholder: "votre@email.com",
          phoneLabel: "Numéro de téléphone",
          phonePlaceholder: "+261 00 000 00",
          notesLabel: "Notes supplémentaires",
          notesPlaceholder: "Merci de renseigner tout ce qui aidera à préparer notre rendez-vous.",
          cancelButton: "Annuler",
          confirmButton: "Confirmer le rendez-vous",
        },
      },
    },

    // Footer
    footer: {
      copyright: "Droits d'auteur",
      rights: "Tous droits réservés",
    },
  },
};

export default translations;
