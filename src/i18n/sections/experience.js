const experience = {
  en: {
    experience: {
      title: "― Experience",
      subtitle:
        "4+ years building fullstack web apps with PHP/Laravel and Vue.js — from ERP maintenance to custom client solutions. Open to new challenges.",
      jobs: [
        {
          role: "Looking for New Opportunities",
          type: "Full-time / Freelance",
          location: "Remote / Madagascar",
          isLooking: true,
          current: true,
        },
        {
          role: "Fullstack Developer",
          company: "MANAO logiciel",
          type: "Permanent contract",
          dateStart: "08-2020",
          dateFinish: null,
          location: "Fianarantsoa, Madagascar",
          remote: "On-site",
          current: false,
          description: "Fullstack owner of the MANAO ERP ecosystem and custom client solutions: full ownership of the product cycle — scoping, architecture, development and delivery.",
          achievements: [
            {
              title: "Evolutionary maintenance and performance improvements on MANAO ERP application modules, serving multiple business clients.",
              details: [
                "Designed and implemented a Laravel 12 REST API orchestrating automated per-client database provisioning (multi-tenant), controlled schema and data duplication, and integrity validation mechanisms.",
                "Optimization and maintenance of the centralized SSO: identity management, access control, session synchronization, Redis layer integration, and cross-application security hardening.",
                "Maintenance and improvement of the modular back-office: centralized client management, license lifecycle, roles and permissions, dashboards and reporting, and DMS usage tracking.",
                "Designed and developed a Vue.js micro-frontend serving as a shared header across all ERP applications — navigation, app shortcuts, notifications and user profile management.",
                "Refactoring and migration of a legacy procedural PHP treasury app to a CodeIgniter MVC architecture — multi-tenant model with dynamic DB switching, JWT-secured REST APIs, front-end modernization and security hardening.",
              ],
            },
            {
              title: "Delivered end-to-end custom web applications for CELAVIpierre — from requirements gathering to production deployment.",
              details: [],
            },
          ],
          skills: [
            "PHP",
            "CodeIgniter",
            "Laravel",
            "Vue.js",
            "jQuery",
            "MySQL",
            "Redis",
            "Git/Gitflow",
          ],
        },
      ],
    },
  },
  fr: {
    experience: {
      title: "― Expériences",
      subtitle:
        "Plus de 4 ans à développer des applications web fullstack avec PHP/Laravel et Vue.js — de la maintenance ERP aux solutions sur mesure. Ouvert à de nouvelles opportunités.",
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
          company: "MANAO logiciel",
          type: "CDI",
          dateStart: "08-2020",
          dateFinish: null,
          location: "Fianarantsoa, Madagascar",
          remote: "Présentiel",
          current: false,
          description: "Fullstack owner de l’écosystème ERP MANAO et des solutions clients sur mesure : ownership complet du cycle produit — cadrage, architecture, développement et mise en production.",
          achievements: [
            {
              title: "Maintenance évolutive et amélioration des performances des modules applicatifs de l'ERP MANAO, utilisé par plusieurs clients entreprises.",
              details: [
                "Conception et implémentation d'une API REST avec Laravel 12 orchestrant le provisionnement automatisé de bases de données dédiées par client (multi-tenant), la duplication maîtrisée des schémas et des données, et les mécanismes de validation d'intégrité.",
                "Optimisation et maintenance du SSO centralisé : gestion des identités, contrôle d'accès, synchronisation des sessions, intégration d'une couche Redis, et renforcement de la sécurité cross-applications.",
                "Maintenance et amélioration du back-office modulaire : gestion centralisée des clients, du cycle de vie des licences, des rôles et permissions, tableaux de bord et reporting, et suivi de la consommation GED.",
                "Conception et développement d'un micro-frontend Vue.js servant de header commun à toutes les applications de l'ERP — navigation, raccourcis applicatifs, notifications et gestion du profil utilisateur.",
                "Refonte et migration d'une application de gestion de trésorerie legacy PHP procédural vers une architecture MVC sous CodeIgniter — modèle multi-tenant avec basculement dynamique de BDD, API REST sécurisées via JWT, modernisation du front-end et renforcement de la sécurité.",
              ],
            },
            {
              title: "Développement complet d'applications web sur mesure pour CELAVIpierre — recueil des besoins, conception technique et mise en production.",
              details: [],
            },
          ],
          skills: [
            "PHP",
            "CodeIgniter",
            "Laravel",
            "Vue.js",
            "jQuery",
            "MySQL",
            "Redis",
            "Git/Gitflow",
          ],
        },
      ],
    },
  },
};

export default experience;