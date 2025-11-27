import { SiteConfig } from './types';

export const siteConfig: SiteConfig = {
    // Personal Information
    personal: {
        name: 'Fachrin Aulia Nasution',
        tagline: 'An #AlwaysInBeta Software Engineer',
        email: 'hi@fachr.in',
        location: 'Berlin, Germany',
        profileImage: '/images/fachrin-memoji.jpg',
    },

    // Hero Section - Current Positions & Past Roles
    hero: {
        title: 'Fachrin Aulia Nasution',
        subtitle: 'An #AlwaysInBeta Software Engineer',
        image: '/images/fachrin-memoji.jpg',
        badges: [
            {
                icon: 'https://cdn.prod.website-files.com/6238b5a08434ef3f01200548/6238b5a08434efbabe200613_Upvest_Monogram_16.png',
                text: 'Senior Product Engineer @ Upvest',
            },
            {
                icon: 'https://choco.com/static/images/favicon-32x32.png',
                text: 'Ex Senior Software Engineer @ Choco',
            },
            {
                icon: 'https://www.deliveryhero.com/wp-content/themes/DeliveryHero/assets/img/icons/dh-favicon.ico',
                text: 'Ex Software Engineer @ Delivery Hero',
            },
            {
                icon: 'https://www.gotocompany.com/favicon.png',
                text: 'Ex Product Engineer @ Gojek & Tokopedia',
            },
        ],
    },

    // About Section
    about: {
        title: 'About',
        greeting: "Hi, Fachrin's here",
        description: "A software engineer based in Berlin, Germany. I've been working closely with the cutting-edge technology as well as in the making of scalable and high-performing software for startups and enterprises. If you'd like to converse, discuss, or create something amazing together,",
        cta: {
            text: "let's get in touch",
            link: '#contact-heading',
        },
    },

    // Experience Section
    experience: [
        {
            company: 'Upvest',
            role: 'Senior Product Engineer',
            location: 'Berlin, Germany',
            period: 'Oct 2023 – Present',
            description: [
                'Designed a robust system to process corporate action announcements from multiple third-party sources such as BNP and WMDaten. The system is capable of ensuring the accuracy and integrity of corporate action information (data validation), handling discrepancies between data sources efficiently (conflict management), and consolidating information from various sources into a cohesive dataset (data merging).',
                'Led a strategic cross-functional tax exemption information management system, enabling efficient management of tax exemption information for a diverse user base across major clients like N26 and Revolut. Played a key role in designing the multi-tenancy architecture for the entire tax exemption system.',
                'Introduced a Domain-Driven Design (DDD) code architecture for the corporate action service repository, significantly enhancing project execution speed and productivity. Set a benchmark for effective maintainable architecture within the organisation.',
                'Designed and implemented an extensive Swift MT564 message parser, ensuring full compliance with Swift ISO 20022 standards that accurately extracts detailed corporate action data, translates Swift syntax into the domain model leading to a significant enhancement in data handling and processing efficiency.',
            ],
            techStack: ['Golang', 'Kafka', 'PostgreSQL', 'BigQuery', 'gRPC', 'SFTP', 'Swift ISO 20022', 'Protobuf'],
        },
        {
            company: 'Choco',
            role: 'Senior Software Engineer',
            location: 'Berlin, Germany',
            period: 'May 2023 – Oct 2023',
            description: [
                'Resolved a critical challenge at Choco by optimising the loading performance of product view pages with up to 2k products. Identified and eliminated bottlenecks in GraphQL queries with numerous resolvers, slashing wait times and significantly enhancing user experience and interface performance.',
                'Designed and executed a high-performance data migration and synchronisation pipeline, seamlessly transitioning data from legacy to performant data sources while ensuring uninterrupted service.',
            ],
            techStack: ['AWS Lambda', 'GraphQL', 'DynamoDB', 'DynamoDB Streams', 'Amazon Kinesis'],
        },
        {
            company: 'Delivery Hero',
            role: 'Software Engineer II',
            location: 'Berlin, Germany',
            period: 'May 2022 – May 2023',
            description: [
                'Introduced a better mechanism to send metrics to Datadog across the billing domain by writing a proper HTTP and SQS middleware in Golang codebase to improve monitoring and alerting standards, and helped the team with north-star metrics for p50 - p99 distribution of incoming and outgoing http request latency, consumer processing and delay time, and etc.',
            ],
            techStack: ['Golang', 'Datadog', 'SQS'],
        },
        {
            company: 'Gojek',
            role: 'Lead Product Engineer',
            location: 'Jakarta, Indonesia',
            period: 'Apr 2020 – May 2022',
            description: [
                'Led the launch of new service types such as GoCar Protect, GoRide EV, and GoCar Premium across countries, as well as being heavily involved in its initial technical analysis. It greatly helped Gojek in gaining a large number of active users and successfully becoming the market\'s top during the pandemic.',
                'Led the technical analysis and development of Gojek Singapore\'s Cancellation Fee improvement. It resolved issues with order cancellation caused by incorrect fare calculations. Changed the mechanism for calculating cancellation fees, and greatly reduced complaint tickets raised by 3%.',
                'Led the development of Driver Karma V2, a feature for communicating information about the driver partner\'s achievement, feedback, and vehicle hygiene to customers. They feel safer to take a ride as a consequence of knowing the driver better.',
                'Researched and developed a machine learning model using BERT algorithm to predict the chat intent between drivers and riders. It helped Gojek in reducing the order cancellation rate by 3% and saved thousands of dollars in Singapore.',
                'Initiated and developed an automated testing framework to verify published Kafka messages. It\'s widely used and attached to the CI/CD pipeline across Gojek product groups like: Transport, Gofood, and Logistic.',
                'Developed a revamped Tipping Widget that revolutionised the user experience on giving drivers a tip. It increased the average tip amount by 100%, and increased the tip frequency by 13%.',
                'Done various engineering initiatives. E.g: reduced Kafka consumer processing time on service deployment from 1 hour to only 5 minutes. The consumer processes roughly ~10K messages per minute.',
            ],
            techStack: [
                'Golang',
                'Python',
                'Redis',
                'Kafka',
                'BigQuery',
                'TensorFlow',
                'Clojure',
                'PostgreSQL',
                'HAProxy',
                'Java',
                'Gitlab',
                'RabbitMQ',
            ],
        },
        {
            company: 'Tokopedia',
            role: 'Software Engineer L3',
            location: 'Jakarta, Indonesia',
            period: 'Apr 2019 – Mar 2020',
            description: [
                'Worked on SuperInteger, a new integer type for Tokopedia\'s Go GraphQL library. Previously, it only supported 32 bit integers, SuperInteger supports 53 bit integers. It is then widely used in the organisation.',
                'Created a database migration layer switching from PostgreSQL to CockroachDB without causing down time. Using CockroachDB helped the team achieve horizontally scalable and available database environment.',
                'Developed a regression test framework to ensure that recent software changes do not negatively impact the existing flow by running multiple micro services in an isolated Docker environment.',
                'Speed up the shopping cart microservice processing time up to 200-400 ms faster by applying concurrency.',
            ],
            techStack: [
                'Golang',
                'GraphQL',
                'PostgreSQL',
                'CockroachDB',
                'Redis',
                'Docker',
                'gRPC',
                'Protobuf',
                'WireMock',
            ],
        },
    ],

    // Projects/Works Section
    works: [
        {
            name: 'Driver Karma V2',
            company: 'Gojek',
            image: '/images/driver-karma.webp',
            source: 'driver-karma-v2',
            description: 'Led the development of Driver Karma V2, a feature for communicating information about the driver partner\'s achievement, feedback, and vehicle hygiene to customers. They feel safer to take a ride as a consequence of knowing the driver better.',
            role: 'Led the technical design and full-stack development of the feature, including backend services for aggregating driver metrics and frontend integration.',
            stack: 'Golang, Kafka, Clojure, PostgreSQL, HAProxy',
        },
        {
            name: 'Tipping Widget',
            company: 'Gojek',
            image: '/images/tipping-service.webp',
            source: 'tipping-widget',
            description: 'Developed a revamped Tipping Widget that revolutionised the user experience on giving drivers a tip. It increased the average tip amount by 100%, and increased the tip frequency by 13%.',
            role: 'Designed and implemented the entire tipping system, including microservices architecture, payment processing, and real-time notifications.',
            stack: 'Golang, Redis, Kafka, PostgreSQL, RabbitMQ, HAProxy',
        },
        {
            name: 'Chat Intent Classification',
            company: 'Gojek',
            image: '/images/chat-intent-detection.webp',
            source: 'chat-intent',
            description: 'Researched and developed a machine learning model using BERT algorithm to predict the chat intent between drivers and riders. It helped Gojek in reducing the order cancellation rate by 3% and saved thousands of dollars in Singapore.',
            role: 'Led the ML research, model training, and production deployment of the BERT-based intent classification system.',
            stack: 'Golang, Python, Redis, Kafka, BigQuery, TensorFlow',
        },
        {
            name: 'Shuffle Cards Provider',
            company: 'Gojek',
            image: '/images/shuffle-cards.webp',
            source: 'shuffle-cards',
            description: 'Built a dynamic content delivery system for the Gojek app homepage, enabling personalized card shuffling based on user behavior and preferences.',
            role: 'Designed and implemented the card orchestration service and personalization algorithms.',
            stack: 'Golang, Redis, Kafka, PostgreSQL',
        },
        {
            name: 'New Service Types Launch',
            company: 'Gojek',
            image: '/images/service-type-launches.webp',
            source: 'service-types-launch',
            description: 'Led the launch of new service types such as GoCar Protect, GoRide EV, and GoCar Premium across countries, as well as being heavily involved in its initial technical analysis. It greatly helped Gojek in gaining a large number of active users and successfully becoming the market\'s top during the pandemic.',
            role: 'Led the technical architecture, cross-functional coordination, and rollout strategy for multiple new service launches.',
            stack: 'Golang, Python, Redis, Kafka, BigQuery, PostgreSQL',
        },
        {
            name: 'Service Restricted Area',
            company: 'Gojek',
            image: '/images/area-based-service-restriction.webp',
            source: 'service-restricted-area',
            description: 'Implemented geofencing and area-based service restrictions to ensure compliance with local regulations and optimize service availability across different regions.',
            role: 'Designed and developed the geofencing service and policy engine for service area management.',
            stack: 'Golang, Redis, PostgreSQL, HAProxy',
        },
    ],

    // Podcast Section
    podcast: {
        title: 'Podcasts',
        episodeUrl: 'https://open.spotify.com/embed/episode/42h5loszLcsDAZnNfY01ME?utm_source=generator&theme=0',
    },

    // Contact Section
    contact: {
        title: 'Get In Touch',
        links: [
            {
                name: 'Email',
                value: 'hi@fachr.in',
                href: 'mailto:hi@fachr.in',
                type: 'email' as const,
            },
            {
                name: 'LinkedIn',
                value: 'Fachrin Aulia Nasution',
                href: 'https://www.linkedin.com/in/fachrinfan',
                type: 'linkedin' as const,
            },
            {
                name: 'GitHub',
                value: '@parinpan',
                href: 'https://github.com/parinpan',
                type: 'github' as const,
            },
            {
                name: 'X (Twitter)',
                value: '@fachrinx',
                href: 'https://x.com/fachrinx',
                type: 'twitter' as const,
            },
        ],
        calendlyUrl: 'https://calendly.com/fachrin/30min',
        collaboration: {
            title: 'Interested in collaboration?',
            text: "I work on distributed systems and product engineering. Open to a chat if something interesting comes along.",
            cta: 'Schedule a call',
        },
    },

    // GitHub Section
    github: {
        username: 'parinpan',
        maxReposToShow: 6,
    },

    // Social Links (if needed elsewhere)
    social: {
        github: 'https://github.com/parinpan',
        linkedin: 'https://www.linkedin.com/in/fachrinfan',
        twitter: 'https://x.com/fachrinx',
        email: 'mailto:hi@fachr.in',
    },

    // SEO & Metadata
    seo: {
        title: 'Fachrin Aulia Nasution | Senior Product Engineer & Distributed Systems Specialist',
        description: 'A Senior Product Engineer based in Berlin, specializing in high-scale distributed systems, Golang, and cloud architecture. Experienced at Upvest, Choco, Delivery Hero, and Gojek. Building the financial infrastructure of tomorrow.',
        keywords: [
            'Software Engineer',
            'Product Engineer',
            'Distributed Systems',
            'Golang',
            'Go',
            'Backend Developer',
            'Full Stack Engineer',
            'Berlin',
            'Germany',
            'Upvest',
            'Fintech',
            'React',
            'Next.js',
            'TypeScript',
            'Kafka',
            'Microservices',
            'System Design',
        ],
        ogImage: 'https://fachr.in/images/og-image.png',
        twitterHandle: '@fachrinx',
        url: 'https://fachr.in',
    },

    // Analytics
    analytics: {
        googleAnalyticsId: 'G-47RWR2V97T',
        clarityId: 'u9sgieou3d',
    },

    // Media & Appearances Section
    appearances: {
        title: 'Appearances',
        subtitle: 'Talks & Podcasts',
        description: 'A collection of talks, interviews, and features on software engineering and technology.',
        items: [
            {
                type: 'video' as const,
                title: 'Upvest\'s Engineering Day 2025',
                image: '/images/media/upvest-thumbnail.png',
                url: 'https://www.youtube.com/watch?v=GvWWQf71hiE',
                description: 'Upvest\'s Engineering team gathered in Berlin for Engineering Day 2025, a day to collaborate, strengthen personal connections, and dive deep into client needs.',
                date: 'November 2025',
                platform: 'YouTube',
                duration: '2:13',
                language: 'English'
            },
            {
                type: 'video' as const,
                title: 'Hands-On Training: Introduction to CAP Theorem on Distributed Database',
                image: '/images/media/cap-theorem-thumbnail.jpg',
                url: 'https://www.youtube.com/watch?v=LGl6jW7Sykg',
                description: 'I delivered a workshop on the CAP Theorem in distributed databases for the Data Science and Artificial Intelligence master\'s program at Universitas Sumaterta Utara.',
                date: 'March 2023',
                platform: 'YouTube',
                duration: '2:32:49',
                language: 'Indonesian'
            },
            {
                type: 'talk' as const,
                title: 'Tech Roles in Indonesia\'s Start-Up Ecosystem',
                image: '/images/media/startup-industry-thumbnail.jpg',
                url: 'https://www.instagram.com/p/CIAuEeNhMut/',
                description: 'Discussing career paths and tech roles in Indonesia\'s rapidly growing start-up industry, as part of the university\'s Dies Natalis celebration.',
                date: 'November 2020',
                platform: 'Webinar',
                language: 'Indonesian'
            },
            {
                type: 'talk' as const,
                title: 'How to Think in Functional Programming',
                image: '/images/media/facebook-devc-thumbnail.jpg',
                url: 'https://www.facebook.com/events/554379655443696',
                description: 'Exploring the paradigm shift from Object-Oriented to Functional Programming. A deep dive into thinking functionally for better code quality and maintainability.',
                date: 'June 2020',
                platform: 'Webinar',
                language: 'Indonesian'
            },
        ],
    },

    // Podcast Section
    podcasts: [
        {
            title: 'Life as a Product Engineer at Gojek',
            episodeUrl: 'https://open.spotify.com/embed/episode/42h5loszLcsDAZnNfY01ME?utm_source=generator&theme=0',
            description: 'Sharing experiences and insights from working as a Product Engineer in Indonesia\'s tech startup ecosystem.',
            date: 'August 2021',
            language: 'Indonesian',
        },
    ],

    // Blog Section
    blog: {
        title: 'Journal',
        description: 'A collection of thoughts on software engineering and my personal journey.',
        emptyState: {
            title: 'Writing in progress',
            description: "I'm currently crafting some thoughts on engineering, systems, and life. Check back soon!",
        },
    },

    // Now Page
    now: {
        title: 'Now',
        subtitle: "What I'm focused on at the moment.",
        updatedAt: 'Updated November 21, 2025',
        sections: [
            {
                title: '📍 Location',
                content: 'Living in <strong>Berlin, Germany</strong> 🇩🇪. It\'s a long way from Indonesia, but I\'m finding a home in the contrast. I am romanticizing the gritty beauty of this city while holding onto my roots. Currently in the process of applying for my <strong>Permanent Residence</strong> permit.',
            },
            {
                title: '💼 Work',
                content: "I'm a Senior Product Engineer at <strong>Upvest</strong>, helping democratize investment. We're building the financial infrastructure of tomorrow. It's challenging, high-scale, and incredibly rewarding.",
            },
            {
                title: '🌱 Growth',
                content: 'Stepping outside the tech bubble. I\'m educating myself on <strong>personal finance</strong> and <strong>investing</strong>, and following my curiosity into random <strong>scientific</strong> rabbit holes. Above all, I\'m learning the most challenging framework of all: <strong>fatherhood</strong>.',
            },
            {
                title: '⚡️ Hobbies',
                content: 'My love language is <strong>food</strong> and <strong>travel</strong>. My wife and I basically plan our trips around what we want to eat. When I\'m not doing that, I\'m probably deep into a Netflix binge or reading some random corner-of-the-internet article that keeps me up way too late.',
            },
        ],
    },

    // Command Menu
    commandMenu: {
        navigation: [
            { name: 'Home', icon: 'Home', id: 'main-content', path: '/' },
            { name: 'About', icon: 'Info', id: 'about-heading' },
            { name: 'Experience', icon: 'Briefcase', id: 'experience-heading' },
            { name: 'Projects', icon: 'FolderGit2', id: 'projects-heading' },
            { name: 'Appearances', icon: 'User', path: '/appearances' },
            { name: 'Contact', icon: 'Mail', id: 'contact-heading' },
            { name: 'Blog', icon: 'PenTool', path: '/blog' },
            { name: 'Now', icon: 'Clock', path: '/now' },
        ],
        social: [
            { name: 'GitHub', icon: 'Github', url: 'https://github.com/parinpan' },
            { name: 'LinkedIn', icon: 'Linkedin', url: 'https://www.linkedin.com/in/fachrinfan' },
            { name: 'Twitter', icon: 'Twitter', url: 'https://x.com/fachrinx' },
        ],
        general: [
            { name: 'Copy Email', icon: 'Copy', action: 'copy_email' },
            { name: 'View Source Code', icon: 'Code', url: 'https://github.com/parinpan/fachr.in' },
        ],
    },

    // Footer
    footer: {
        copyrightText: 'Fachrin Aulia Nasution. All rights reserved.',
    },

    // UI Strings
    ui: {
        themeToggle: 'Toggle theme',
        languageToggle: 'Toggle language',
        backToTop: 'Back to top',
        commandMenu: {
            open: 'Open Command Menu',
            placeholder: 'Type a command or search...',
            noResults: 'No results found.',
            esc: 'ESC',
            headings: {
                navigation: 'Navigation',
                journal: 'Journal',
                social: 'Social',
                general: 'General',
            },
            actions: {
                copyEmail: 'Copy Email',
                sourceCode: 'View Source Code',
            },
        },
        githubRepos: 'Github Repositories',
        githubActions: {
            viewAllRepos: 'View all repositories',
            viewRepoOnGithub: 'View {name} on GitHub',
        },
        workList: {
            featuredProjects: 'Featured Projects',
            partOfWork: 'Part of my work at',
            closeDetails: 'Close project details',
            labels: {
                project: 'Project',
                description: 'Description',
                role: 'My Role',
                stack: 'Tech Stack',
            },
        },
        appearanceList: {
            scrollLeft: 'Scroll left',
            scrollRight: 'Scroll right',
            types: {
                video: 'Video',
                talk: 'Talk',
                article: 'Article',
            },
            actions: {
                watchVideo: 'Watch Video',
                viewTalk: 'View Talk',
                viewDetails: 'View Details',
            },
        },
        experience: {
            title: 'Professional Experience',
            expand: 'Expand',
            collapse: 'Collapse',
            technologies: 'Technologies',
            more: 'more',
        },
        now: {
            update: 'Update',
        },
        notFound: {
            title: '404',
            subtitle: 'Not Found',
            description: "The requested resource could not be found on this server.",
            backButton: 'cd /home',
            buttonText: 'Return Home',
        },
    },
};


