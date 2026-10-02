/* CV content — single source of truth for both languages. */
window.CV = {
  es: {
    ui: {
      skip: "Ir al contenido",
      pdf: "PDF",
      pdfTitle: "Descargar CV en PDF",
      builtWith: "Hecho con HTML, CSS y JavaScript. Sin frameworks."
    },
    hero: {
      role: "Ingeniero de Software Full Stack Senior",
      exp: "8+ años de experiencia",
      remote: "Remoto",
      location: "Holguín, Cuba · UTC−5",
      available: "Disponible para propuestas",
      english: "Inglés",
      fluent: "Fluido",
      spanish: "Español",
      native: "Nativo"
    },
    about: {
      title: "Perfil",
      p1: "Ingeniero de software con más de 8 años de experiencia construyendo y entregando aplicaciones web empresariales de extremo a extremo. Especializado en C#, .NET, Angular, SQL Server y Microsoft Azure, con experiencia en el diseño de aplicaciones de negocio, sistemas multi-tenant, automatización de flujos de trabajo, gestión documental, reportería, migración de datos y soluciones en la nube.",
      p2: "Acostumbrado a trabajar de forma autónoma en funcionalidades complejas, desde los requisitos y la arquitectura hasta la implementación, pruebas, despliegue y retroalimentación del cliente. Sólida base en arquitectura de aplicaciones empresariales, flujos asíncronos, servicios cloud y desarrollo asistido por IA."
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
      cmds: {
        help: "esta ayuda",
        whoami: "quién soy, en una línea",
        about: "salta al perfil",
        experience: "salta a la experiencia",
        skills: "lista las habilidades — skills azure para filtrar",
        education: "salta a la educación",
        certs: "salta a las certificaciones",
        contact: "formas de contacto",
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
          role: "Ingeniero de Software Full Stack",
          when: "2020 – Presente",
          where: "Remoto",
          current: true,
          bullets: [
            "Desarrollo y mantengo una plataforma **multi-tenant** para compañías de seguros que da servicio a alrededor de **700 usuarios**, construida con **C#, .NET, Angular, Entity Framework Core, SQL Server y Microsoft Azure**.",
            "Diseño e implemento aplicaciones de negocio para **compañías de seguros**: plataformas CRM, flujos de trabajo de agentes, gestión documental y sistemas de reportería.",
            "Mantengo el aislamiento entre tenants con control de acceso por roles, permisos, suscripciones y autenticación basada en Azure.",
            "Diseño flujos de negocio mediante **Commands y Events**, aportando trazabilidad, procesamiento asíncrono y registro de actividad en operaciones críticas.",
            "Construyo soluciones cloud de **gestión y generación de documentos** con servicios de Azure y flujos basados en plantillas.",
            "Desarrollo integraciones con **plataformas de firma digital como Adobe Sign y DocuSign**.",
            "Diseño e implemento **pipelines de Azure Synapse** para migración y transformación de datos entre sistemas.",
            "Construí un servicio dinámico de **Custom Views** que permite a los usuarios definir vistas de datos desde el frontend y generar dinámicamente las consultas de base de datos necesarias, dando soporte a reportería empresarial e interfaces con alto volumen de datos.",
            "Desarrollo **reportes complejos en SQL Server, Stored Procedures y soluciones de reportería dinámica** para distintos requisitos de negocio.",
            "Desarrollo una **plataforma web configurable de reclutamiento de agentes**, adaptable a los requisitos de cada agencia, que agiliza flujos de trabajo y soporta firma digital.",
            "Trabajo directamente con clientes y stakeholders para entender requisitos, diseñar soluciones e iterar según su retroalimentación.",
            "Despliego y doy soporte a aplicaciones en **entornos de Azure**, incluyendo pipelines CI/CD, entornos de QA y releases a producción con Azure DevOps.",
            "Tomo decisiones técnicas y de arquitectura en nuevas funcionalidades, manteniendo consistencia con la arquitectura y los patrones de ingeniería existentes.",
            "Uso herramientas de **desarrollo asistido por IA** para acelerar implementación, investigación y resolución de problemas, revisando y validando el código generado y manteniendo la responsabilidad sobre las decisiones técnicas y de arquitectura."
          ]
        },
        {
          company: "Freelance",
          role: "Desarrollador de Software",
          when: "2018 – 2020",
          where: "",
          current: false,
          bullets: [
            "Desarrollé aplicaciones web y soluciones de software con **React, Angular, Vue, Django, Python, Java y PostgreSQL**.",
            "Construí plataformas web y aplicaciones Android para estudios de fotografía.",
            "Desarrollé una **Infraestructura de Clave Pública (PKI)** basada en EJBCA como proyecto de tesis universitaria.",
            "Construí un bot de Telegram integrado con la **API de Moodle** para la gestión automatizada de ficheros."
          ]
        }
      ]
    },
    skills: {
      title: "Habilidades técnicas",
      groups: [
        { name: "Lenguajes y Frameworks", items: ["C#", ".NET", "ASP.NET Core", "Angular", "TypeScript", "JavaScript", "Python", "Java", "React", "Vue", "HTML", "CSS"] },
        { name: "Backend y Arquitectura", items: ["REST APIs", "Entity Framework Core", "ABP Framework", "Commands & Events", "Procesamiento asíncrono", "Arquitectura Multi-Tenant", "Autenticación y Autorización", "Arquitectura por capas (Domain/Application)"] },
        { name: "Bases de Datos y Datos", items: ["SQL Server", "PostgreSQL", "Cosmos DB", "Entity Framework Core", "Stored Procedures", "Reportería dinámica", "Migración de datos", "Azure Synapse"] },
        { name: "Microsoft Azure", items: ["Azure Functions", "Blob Storage", "Azure Queues", "Azure Synapse", "App Services", "Azure DevOps", "CI/CD"] },
        { name: "Integraciones Empresariales", items: ["Adobe Sign", "DocuSign"] },
        { name: "Prácticas de Desarrollo", items: ["Git", "Desarrollo Ágil", "Jira", "Zoho", "Gestión de tickets", "Code Review", "Colaboración con clientes", "Despliegue en la nube", "Desarrollo asistido por IA"] }
      ]
    },
    edu: {
      title: "Educación",
      degree: "Ingeniería de Software",
      school: "Universidad de Holguín",
      place: "Holguín, Cuba"
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
      builtWith: "Built with HTML, CSS and JavaScript. No frameworks."
    },
    hero: {
      role: "Senior Full Stack Software Engineer",
      exp: "8+ years of experience",
      remote: "Remote",
      location: "Holguín, Cuba · UTC−5",
      available: "Open to opportunities",
      english: "English",
      fluent: "Fluent",
      spanish: "Spanish",
      native: "Native"
    },
    about: {
      title: "Profile",
      p1: "Software Engineer with 8+ years of experience building and delivering enterprise web applications across the full stack. Specialized in C#, .NET, Angular, SQL Server and Microsoft Azure, with experience designing business applications, multi-tenant systems, workflow automation, document management, reporting, data migration and cloud-based solutions.",
      p2: "Experienced in working independently on complex features from requirements and architecture through implementation, testing, deployment and client feedback. Strong background in enterprise application architecture, asynchronous workflows, cloud services and AI-assisted software development."
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
      cmds: {
        help: "this help",
        whoami: "who I am, in one line",
        about: "jump to the profile",
        experience: "jump to the experience",
        skills: "list skills — skills azure to filter",
        education: "jump to the education",
        certs: "jump to the certifications",
        contact: "ways to reach me",
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
          role: "Full Stack Software Engineer",
          when: "2020 – Present",
          where: "Remote",
          current: true,
          bullets: [
            "Develop and maintain a **multi-tenant** platform for insurance companies serving around **700 users**, built with **C#, .NET, Angular, Entity Framework Core, SQL Server and Microsoft Azure**.",
            "Design and implement business applications for **insurance companies**, including CRM platforms, agent workflows, document management and reporting systems.",
            "Keep tenants isolated through role-based access control, permissions, subscriptions and Azure-based authentication.",
            "Design business workflows using **Commands and Events**, supporting traceability, asynchronous processing and activity logging across critical operations.",
            "Build cloud-based **document management and document generation** solutions using Azure services and template-based document workflows.",
            "Develop integrations with **digital signature platforms including Adobe Sign and DocuSign**.",
            "Design and implement **Azure Synapse pipelines** for data migration and transformation between systems.",
            "Built a dynamic **Custom Views** service that allows users to define data views from the frontend and dynamically generate the required database queries, supporting enterprise reporting and data-heavy interfaces.",
            "Develop complex **SQL Server reports, Stored Procedures and dynamic reporting solutions** for different business requirements.",
            "Develop a configurable web-based **agent recruitment platform** that adapts to different agency requirements, streamlines workflows and supports digital signatures.",
            "Work directly with clients and stakeholders to understand requirements, design solutions and iterate based on feedback.",
            "Deploy and support applications across **Azure environments**, including CI/CD pipelines, QA environments and production releases through Azure DevOps.",
            "Make architectural and technical decisions across new features while maintaining consistency with existing application architecture and engineering patterns.",
            "Use **AI-assisted development tools** to accelerate implementation, research and problem solving while reviewing and validating generated code and retaining responsibility for technical and architectural decisions."
          ]
        },
        {
          company: "Freelance",
          role: "Software Developer",
          when: "2018 – 2020",
          where: "",
          current: false,
          bullets: [
            "Developed web applications and software solutions using **React, Angular, Vue, Django, Python, Java and PostgreSQL**.",
            "Built web platforms and Android applications for photography studios.",
            "Developed a **Public Key Infrastructure (PKI)** based on EJBCA as a university degree project.",
            "Built a Telegram bot integrating with the **Moodle API** for automated file management."
          ]
        }
      ]
    },
    skills: {
      title: "Technical Skills",
      groups: [
        { name: "Languages & Frameworks", items: ["C#", ".NET", "ASP.NET Core", "Angular", "TypeScript", "JavaScript", "Python", "Java", "React", "Vue", "HTML", "CSS"] },
        { name: "Backend & Architecture", items: ["REST APIs", "Entity Framework Core", "ABP Framework", "Commands & Events", "Asynchronous Processing", "Multi-Tenant Architecture", "Authentication & Authorization", "Domain/Application Layer Architecture"] },
        { name: "Databases & Data", items: ["SQL Server", "PostgreSQL", "Cosmos DB", "Entity Framework Core", "Stored Procedures", "Dynamic Reporting", "Data Migration", "Azure Synapse"] },
        { name: "Microsoft Azure", items: ["Azure Functions", "Blob Storage", "Azure Queues", "Azure Synapse", "App Services", "Azure DevOps", "CI/CD"] },
        { name: "Enterprise Integrations", items: ["Adobe Sign", "DocuSign"] },
        { name: "Development Practices", items: ["Git", "Agile Development", "Jira", "Zoho", "Ticket Management", "Code Review", "Client Collaboration", "Cloud Deployment", "AI-Assisted Development"] }
      ]
    },
    edu: {
      title: "Education",
      degree: "Software Engineering",
      school: "University of Holguín",
      place: "Holguín, Cuba"
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
