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
      experience: "{{years}}+ years of experience. Based in Madagascar, Specialized in SaaS architectures and business applications, I develop robust, maintainable, and performance-oriented solutions.",
      contactBtn: "Discuss your project",
      cvBtn: "View my CV",
      downloadCV: "View my CV",
      services: {
        title: "My Services",
        intro: "Here are the services I offer to bring your projects to life.",
        website: {
          title: "Website Development",
          detail: {
            desc: "Design and development of modern, high-performance websites:",
            specification: [
              "Custom websites or Landing pages",
              "Responsive & mobile-first design",
              "UI/UX integration"
            ]
          }
        },
        webapp: {
          title: "Web Application Development",
          detail: {
            desc: "Custom web application design and development:",
            specification: [
              "Robust backend development",
              "Interactive frontend",
              "Business/SaaS apps (CRM, ERP, email)"
            ]
          }
        },
        api: {
          title: "API Design & Integration",
          detail: {
            desc: "Creation and integration of robust APIs:",
            specification: [
              "Secure REST APIs (JWT, auth)",
              "Third-party integrations (payment, SMS, email)",
              "API documentation (Swagger / OpenAPI)"
            ]
          }
        },
        consulting: {
          title: "System Architecture Consulting",
          detail: {
            desc: "Technical consulting and structuring:",
            specification: [
              "Architecture choice (Clean, MVC, Microservices)",
              "Backend/frontend structuring",
              "Development best practices"
            ]
          }
        },
        maintenance: {
          title: "Maintenance & Optimization",
          detail: {
            desc: "Improvement and support of existing applications:",
            specification: [
              "Refactoring (Clean code, SOLID)",
              "Performance optimization",
              "Bug fixes & technical updates"
            ]
          }
        }
      }
    },

    // About Section
    about: {
      title: "― About Me",
      imageAlt: "Profile photo",
      paragraph1:
      "I am a Fullstack Developer with strong experience in designing and building modern web applications. I work across both front-end and back-end to deliver complete, high-performance solutions.",

      paragraph2:
      "My approach combines technical rigor with creativity to build smooth, reliable tools that solve real user problems.",

      paragraph3:
      "Curious, autonomous, and team-oriented, I enjoy tackling complex challenges and turning ideas into concrete digital products.",
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
      "I stay up-to-date with modern technologies and best practices to build scalable, high-quality web applications.",
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
        description: "I leverage well-established architectural paradigms and patterns (OOP, SOLID, Clean Architecture, DDD, MVC) to design robust, scalable, sustainable applications with a clear and maintainable structure.",
      },
      softSkills: {
        title: "Soft Skills",
        description: "Technical rigor and clear communication shape my work. I value collaboration, fast adaptation, structured problem-solving, and continuous curiosity to keep improving."
      },
    },

    // Projects Section
    projects: {
      intro:
      "I have worked on a variety of projects that strengthened both my technical and problem-solving skills. Each project focuses on delivering reliable, scalable, and user-centered solutions.",
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
          role: "Open to New Opportunities",
          type: "Full-time / Freelance",
          location: "Remote / Madagascar",
          isLooking: true,
          current: true,
        },
        {
          role: "Fullstack Developer",
          company: "Freelance",
          type: "Self-employed",
          dateStart: "08-2020",
          dateFinish: "03-2026",
          location: "Fianarantsoa, Madagascar",
          remote: "Remote",
          current: false,
          description: "Design and development of modern web applications for various clients. Complete management from requirements gathering through deployment.",
          achievements: [
            "Built responsive portfolio and SaaS platforms with React & Node.js",
            "Integrated third-party APIs (Google Calendar, payment gateways)",
            "Delivered 5+ projects end-to-end with high client satisfaction",
          ],
          skills: ["React", "Node.js", "Tailwind CSS", "MongoDB", "REST API", "Git"],
        },
      ],
    },

    // Contact Section
    contact: {
      title: "― Contact Me",
      description:
      "Have a project in mind or looking for a developer? Let’s discuss how I can help bring your ideas to life.",
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
      experience: "+ de {{years}} ans d'expérience. Basé à Madagascar, Spécialisé en architectures SaaS et applications métier, je développe des solutions robustes, maintenables et orientées performance.",
      contactBtn: "Discuter de votre projet",
      cvBtn: "Voir mon CV",
      downloadCV: "Voir mon CV",
      services: {
        title: "Mes Services",
        intro: "Voici les services que je propose pour donner vie à vos projets.",
        website: {
          title: "Création de Sites Web modernes",
          detail: {
            desc: "Conception et développement de sites web modernes, rapides et performants :",
            specification: [
              "Sites sur mesure / Landing pages",
              "Responsive & Design mobile-first",
              "Intégration UI/UX"
            ]
          }
        },
        webapp: {
          title: "Développement d’applications web",
          detail: {
            desc: "Conception et développement d'applications web sur mesure :",
            specification: [
              "Développement Backend robuste",
              "Frontend interactif",
              "Applications métier (CRM, ERP, etc)"
            ]
          }
        },
        api: {
          title: "Conception & Intégration d'API",
          detail: {
            desc: "Création et intégration d'API robustes :",
            specification: [
              "API REST sécurisées (JWT, auth)",
              "Intégrations tierces (paiement, SMS, email)",
              "Documentation API (Swagger / OpenAPI)"
            ]
          }
        },
        consulting: {
          title: "Conseil en Architecture Système",
          detail: {
            desc: "Conseil technique et structuration :",
            specification: [
              "Architecture (Clean, MVC, Microservices)",
              "Structuration backend/frontend",
              "Bonnes pratiques de développement"
            ]
          }
        },
        maintenance: {
          title: "Maintenance & Optimisation",
          detail: {
            desc: "Amélioration et support d'applications existantes :",
            specification: [
              "Refactoring (Clean code, SOLID)",
              "Optimisation des performances",
              "Debugs & mises à jour"
            ]
          }
        }
      }
    },

    // About Section
    about: {
      title: "― À propos de moi",
      imageAlt: "Photo de profil",
      paragraph1:
      "Développeur Fullstack avec une solide expérience dans la conception et le développement d’applications web modernes. J’interviens aussi bien sur le front-end que le back-end pour créer des solutions complètes et performantes.",

      paragraph2:
      "Mon approche allie rigueur technique et créativité pour concevoir des outils fluides, fiables et réellement utiles aux utilisateurs.",

      paragraph3:
      "Curieux, autonome et orienté équipe, j’aime relever des défis complexes et transformer des idées en produits digitaux concrets.",
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
        "Je m’appuie sur des technologies modernes et des bonnes pratiques pour concevoir des applications web robustes et évolutives.",
      whatIKnow: "― Ce que je maîtrise",
      hardSkillsTitle: "Compétences techniques (Stack)",
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
        title: "Fondamentaux d’ingénierie",
        description: "Je m’appuie sur des paradigmes et patterns d’architecture reconnus (POO, SOLID, Clean Architecture, DDD, MVC) pour concevoir des applications fiables, évolutives et maintenables, avec une structure claire et durable.",
      },

      softSkills: {
        title: "Soft Skills",
        description: "Rigueur technique et communication claire structurent mon travail. J’accorde une forte importance à la collaboration, à l’adaptation rapide et à une analyse méthodique des problèmes, avec une curiosité constante pour progresser."
      },
    },

    // Projects Section
    projects: {
      intro:
      "J’ai travaillé sur différents projets qui m’ont permis de renforcer mes compétences techniques et ma capacité à résoudre des problématiques concrètes. Chaque réalisation vise à offrir des solutions fiables, évolutives et centrées sur l’utilisateur.",
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
          role: "À la recherche de nouvelles opportunités",
          type: "Temps plein / Freelance",
          location: "À distance / Madagascar",
          isLooking: true,
          current: true,
        },
        {
          role: "Développeur Fullstack",
          company: "Freelance",
          type: "Indépendant",
          dateStart: "08-2020",
          dateFinish: null,
          location: "Fianarantsoa, Madagascar",
          remote: "À distance",
          current: false,
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
      "Vous avez un projet ou recherchez un développeur ? Discutons de la manière dont je peux vous aider à concrétiser vos idées.",
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
