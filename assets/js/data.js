/* CV content — single source of truth for both languages. */
window.CV = {
  es: {
    ui: {
      skip: "Ir al contenido",
      pdf: "PDF",
      pdfTitle: "Descargar CV en PDF",
      theme: "Cambiar tema",
      builtWith: "Hecho con HTML, CSS y JavaScript. Sin frameworks."
    },
    hero: {
      role: "Ingeniero de Software Full Stack Senior",
      stack: "Software para seguros · C# / .NET · Angular · Azure · SQL Server",
      cv: "Descargar CV",
      emailMe: "Escríbeme",
      exp: "8+ años de experiencia",
      remote: "Remoto",
      location: "Holguín, Cuba · hora de Cuba (UTC−5, UTC−4 en verano)",
      available: "Disponible para propuestas",
      english: "Inglés",
      fluent: "Fluido",
      spanish: "Español",
      native: "Nativo"
    },
    about: {
      title: "Perfil",
      p1: "Ingeniero Full Stack Senior con más de 8 años de experiencia, los últimos seis construyendo una plataforma para el sector asegurador con C#/.NET, Angular y Azure. El sistema multi-tenant da servicio a 5 tenants y a unos 700 usuarios, y me encargo de las funcionalidades de punta a punta: requisitos, arquitectura, implementación, despliegue y retroalimentación del cliente.",
      results: [
        { n: "~700", l: "usuarios en una plataforma multi-tenant para seguros" },
        { n: "20+", l: "reportes manuales reemplazados por Custom Views" },
        { n: "~1,9 M", l: "filas al día por un único pipeline de Synapse" }
      ],
      p2: "Mi trabajo incluye flujos de CRM y reclutamiento de agentes, generación de documentos con integraciones de Adobe Sign y DocuSign, un motor de consultas dinámicas que reemplazó más de 20 reportes manuales y un pipeline de Azure Synapse que carga ~1,9 M de filas al día. También he orientado a desarrolladores a tiempo parcial del equipo."
    },
    console: {
      title: "Terminal",
      hint: "Esto es una consola de verdad. Escribe help y pulsa Enter.",
      label: "Escribe un comando",
      welcome: "Escribe help para ver los comandos disponibles.",
      helpHeader: "Comandos disponibles:",
      notFound: "comando no encontrado: {0}",
      notFoundHint: "escribe help para ver la lista.",
      jumped: "→ saltando a {0}",
      themeSet: "tema: {0}",
      langSet: "idioma: {0}",
      pdfMsg: "descargando {0}",
      opening: "abriendo {0}",
      noMatch: "sin resultados para: {0}",
      usage: "uso: {0}",
      sudoMsg: "rene no figura en el fichero sudoers. Se reportará el incidente.",
      exitMsg: "No se puede salir de un CV. Prueba con pdf.",
      copied: "copiado al portapapeles",
      noFile: "cat: {0}: no existe el fichero",
      highlights: [
        "~700 usuarios en una plataforma multi-tenant para seguros",
        "Más de 20 reportes manuales reemplazados por un motor de Custom Views",
        "~1,9 M de filas al día por un único pipeline de Synapse parametrizado",
        "Integraciones con Adobe Sign y DocuSign y generación de documentos en Azure"
      ],
      cmds: {
        help: "esta ayuda",
        whoami: "quién soy, en una línea",
        status: "disponibilidad, modalidad y horario",
        highlights: "lo más destacado, en cuatro líneas",
        about: "salta al perfil",
        experience: "salta a la experiencia",
        skills: "lista las habilidades — skills azure para filtrar",
        education: "salta a la educación",
        certs: "salta a las certificaciones",
        ls: "lista las secciones",
        cat: "muestra una sección — cat about.md",
        contact: "formas de contacto",
        email: "copia mi correo al portapapeles",
        open: "abre un perfil — open github",
        pdf: "descarga el CV en PDF",
        theme: "cambia el tema — theme light",
        lang: "cambia el idioma — lang en",
        clear: "limpia la terminal"
      }
    },
    exp: {
      title: "Experiencia profesional",
      items: [
        {
          company: "Trulydata",
          role: "Ingeniero de Software Full Stack Senior",
          when: "2020 – Presente",
          where: "Remoto",
          current: true,
          bullets: [
            "Construí un motor de **Custom Views** que permite definir vistas de datos desde la interfaz y genera dinámicamente las consultas de base de datos. Ha **reemplazado más de 20 reportes manuales** y da soporte a pantallas con alto volumen de datos.",
            "Migré el ETL analítico de Spark Mapping Data Flows a un único **pipeline de Azure Synapse parametrizado**, con programación automática y reintento por tenant. Hoy carga **~1,9 M de filas (~0,5 GB) al día**.",
            "Integré **Adobe Sign y DocuSign** y desarrollé la **generación y gestión de documentos** en la nube con servicios de Azure y plantillas.",
            "Soy responsable del desarrollo de una **plataforma multi-tenant para el sector asegurador** con **5 tenants y unos 700 usuarios**, construida con **C#, .NET, Angular, Entity Framework Core, SQL Server y Azure**, en un equipo de tres personas.",
            "Entrego aplicaciones de CRM, flujos de agentes y reportería para aseguradoras, incluida una **plataforma configurable de reclutamiento de agentes** que se adapta a los requisitos de cada agencia y admite firma digital.",
            "Diseño los flujos de negocio con **Commands y Events**, lo que da trazabilidad, procesamiento asíncrono y registro de actividad en operaciones críticas, y mantengo el aislamiento entre tenants con control de acceso por roles, permisos, suscripciones y autenticación en Azure.",
            "Escribo **reportes complejos en SQL Server y Stored Procedures** para necesidades de negocio específicas.",
            "Despliego a QA y producción con **pipelines CI/CD de Azure DevOps**, trabajo directamente con los clientes para levantar requisitos e iterar según su retroalimentación, y he orientado a desarrolladores a tiempo parcial."
          ]
        },
        {
          company: "Freelance",
          role: "Desarrollador de Software",
          when: "2018 – 2020",
          where: "",
          current: false,
          bullets: [
            "Construí plataformas web y aplicaciones Android para estudios de fotografía, con **React, Angular, Vue, Django, Python, Java y PostgreSQL** según el proyecto.",
            "Construí un bot de Telegram sobre la **API de Moodle** para la gestión automatizada de ficheros."
          ]
        }
      ]
    },
    skills: {
      title: "Habilidades técnicas",
      core: ["C#", ".NET", "ASP.NET Core", "Angular", "TypeScript", "SQL Server", "Entity Framework Core"],
      groups: [
        { name: "Lenguajes y Frameworks", items: ["C#", ".NET", "ASP.NET Core", "Angular", "TypeScript", "JavaScript", "Python", "Java", "React", "Vue"] },
        { name: "Backend y Arquitectura", items: ["REST APIs", "ABP Framework", "Entity Framework Core", "Commands & Events", "Procesamiento asíncrono", "Arquitectura Multi-Tenant", "Autenticación y Autorización", "Arquitectura por capas (Domain/Application)"] },
        { name: "Bases de Datos y Datos", items: ["SQL Server", "PostgreSQL", "Cosmos DB", "Stored Procedures", "Reportería dinámica", "Migración de datos"] },
        { name: "Azure y DevOps", items: ["Azure Synapse", "Azure Functions", "Blob Storage", "Azure Queues", "App Services", "Azure DevOps", "CI/CD"] },
        { name: "Integraciones y Prácticas", items: ["Adobe Sign", "DocuSign", "Git", "Desarrollo Ágil", "Code Review", "Mentoría", "Jira", "Desarrollo asistido por IA"] }
      ]
    },
    edu: {
      title: "Educación",
      degree: "Ingeniería de Software",
      school: "Universidad de Holguín",
      place: "Holguín, Cuba",
      thesis: "Tesis: Infraestructura de Clave Pública (PKI) basada en EJBCA."
    },
    certs: {
      title: "Certificaciones y habilidades aplicadas",
      issued: "Emitido",
      expires: "Vence",
      credential: "Ver credencial",
      more: "Ver más en LinkedIn"
    }
  },

  en: {
    ui: {
      skip: "Skip to content",
      pdf: "PDF",
      pdfTitle: "Download CV as PDF",
      theme: "Toggle theme",
      builtWith: "Built with HTML, CSS and JavaScript. No frameworks."
    },
    hero: {
      role: "Senior Full Stack Software Engineer",
      stack: "Insurance software · C# / .NET · Angular · Azure · SQL Server",
      cv: "Download CV",
      emailMe: "Email me",
      exp: "8+ years of experience",
      remote: "Remote",
      location: "Holguín, Cuba · Cuba time (UTC−5, UTC−4 in summer)",
      available: "Open to opportunities",
      english: "English",
      fluent: "Fluent",
      spanish: "Spanish",
      native: "Native"
    },
    about: {
      title: "Profile",
      p1: "Senior Full Stack Engineer with 8+ years of experience, the last six building an insurance-industry platform on C#/.NET, Angular and Azure. The multi-tenant system serves 5 tenants and about 700 users, and I own features end to end: requirements, architecture, implementation, deployment and client feedback.",
      results: [
        { n: "~700", l: "users on a multi-tenant insurance platform" },
        { n: "20+", l: "manual reports replaced by Custom Views" },
        { n: "~1.9M", l: "rows a day through one Synapse pipeline" }
      ],
      p2: "My work includes CRM and agent-recruitment workflows, document generation with Adobe Sign and DocuSign integrations, a dynamic query engine that replaced more than 20 manual reports, and a parameterized Azure Synapse pipeline that loads ~1.9M rows a day. I have also mentored part-time developers on the team."
    },
    console: {
      title: "Terminal",
      hint: "This is a real console. Type help and hit Enter.",
      label: "Type a command",
      welcome: "Type help to see the available commands.",
      helpHeader: "Available commands:",
      notFound: "command not found: {0}",
      notFoundHint: "type help for the list.",
      jumped: "→ jumping to {0}",
      themeSet: "theme: {0}",
      langSet: "language: {0}",
      pdfMsg: "downloading {0}",
      opening: "opening {0}",
      noMatch: "no matches for: {0}",
      usage: "usage: {0}",
      sudoMsg: "rene is not in the sudoers file. This incident will be reported.",
      exitMsg: "You cannot exit a CV. Try pdf instead.",
      copied: "copied to clipboard",
      noFile: "cat: {0}: no such file",
      highlights: [
        "~700 users on a multi-tenant insurance platform",
        "20+ manual reports replaced by one Custom Views engine",
        "~1.9M rows a day through a single parameterized Synapse pipeline",
        "Adobe Sign and DocuSign integrations, and document generation on Azure"
      ],
      cmds: {
        help: "this help",
        whoami: "who I am, in one line",
        status: "availability, work mode and time zone",
        highlights: "the headline results, in four lines",
        about: "jump to the profile",
        experience: "jump to the experience",
        skills: "list skills — skills azure to filter",
        education: "jump to the education",
        certs: "jump to the certifications",
        ls: "list the sections",
        cat: "print a section — cat about.md",
        contact: "ways to reach me",
        email: "copy my email address to the clipboard",
        open: "open a profile — open github",
        pdf: "download the CV as PDF",
        theme: "switch theme — theme light",
        lang: "switch language — lang en",
        clear: "clear the terminal"
      }
    },
    exp: {
      title: "Professional Experience",
      items: [
        {
          company: "Trulydata",
          role: "Senior Full Stack Software Engineer",
          when: "2020 – Present",
          where: "Remote",
          current: true,
          bullets: [
            "Built a **Custom Views** engine that lets users define data views in the UI and generates the underlying database queries dynamically. It has **replaced more than 20 manual reports** and powers data-heavy screens.",
            "Migrated the analytics ETL from Spark Mapping Data Flows to a single **parameterized Azure Synapse pipeline** with automated scheduling and per-tenant retry. It now loads **~1.9M rows (~0.5 GB) a day**.",
            "Integrated **Adobe Sign and DocuSign** and built cloud-based **document generation and management** on Azure services and templates.",
            "Own development of a **multi-tenant insurance platform** serving **5 tenants and about 700 users**, built with **C#, .NET, Angular, Entity Framework Core, SQL Server and Azure**, in a team of three.",
            "Deliver CRM, agent-workflow and reporting applications for insurance companies, including a **configurable agent-recruitment platform** that adapts to each agency's requirements and supports digital signatures.",
            "Design business workflows around **Commands and Events**, giving critical operations traceability, asynchronous processing and activity logging, and keep tenants isolated with role-based access, permissions, subscriptions and Azure-based authentication.",
            "Write complex **SQL Server reports and stored procedures** for business-specific reporting needs.",
            "Ship to QA and production through **Azure DevOps CI/CD pipelines**, work directly with clients to gather requirements and iterate on their feedback, and have mentored part-time developers."
          ]
        },
        {
          company: "Freelance",
          role: "Software Developer",
          when: "2018 – 2020",
          where: "",
          current: false,
          bullets: [
            "Built web platforms and Android apps for photography studios, using **React, Angular, Vue, Django, Python, Java and PostgreSQL** depending on the project.",
            "Built a Telegram bot on the **Moodle API** for automated file management."
          ]
        }
      ]
    },
    skills: {
      title: "Technical Skills",
      core: ["C#", ".NET", "ASP.NET Core", "Angular", "TypeScript", "SQL Server", "Entity Framework Core"],
      groups: [
        { name: "Languages & Frameworks", items: ["C#", ".NET", "ASP.NET Core", "Angular", "TypeScript", "JavaScript", "Python", "Java", "React", "Vue"] },
        { name: "Backend & Architecture", items: ["REST APIs", "ABP Framework", "Entity Framework Core", "Commands & Events", "Asynchronous Processing", "Multi-Tenant Architecture", "Authentication & Authorization", "Domain/Application Layer Architecture"] },
        { name: "Databases & Data", items: ["SQL Server", "PostgreSQL", "Cosmos DB", "Stored Procedures", "Dynamic Reporting", "Data Migration"] },
        { name: "Azure & DevOps", items: ["Azure Synapse", "Azure Functions", "Blob Storage", "Azure Queues", "App Services", "Azure DevOps", "CI/CD"] },
        { name: "Integrations & Practices", items: ["Adobe Sign", "DocuSign", "Git", "Agile Development", "Code Review", "Mentoring", "Jira", "AI-Assisted Development"] }
      ]
    },
    edu: {
      title: "Education",
      degree: "Software Engineering",
      school: "University of Holguín",
      place: "Holguín, Cuba",
      thesis: "Thesis: Public Key Infrastructure (PKI) built on EJBCA."
    },
    certs: {
      title: "Certifications and Applied Skills",
      issued: "Issued",
      expires: "Expires",
      credential: "Show credential",
      more: "See more on LinkedIn"
    }
  }
};
