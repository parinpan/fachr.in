import { SiteConfig, AppearanceItem } from './types';

export const siteConfigId: SiteConfig = {
    // Personal Information
    personal: {
        name: 'Fachrin Aulia Nasution',
        tagline: 'Perekayasa Perangkat Lunak • Pembelajar Sepanjang Hayat',
        email: 'hi@fachr.in',
        location: 'Berlin, Jerman',
        profileImage: '/images/fachrin-memoji.jpg',
    },

    // Hero Section - Current Positions & Past Roles
    hero: {
        title: 'Fachrin Aulia Nasution',
        subtitle: 'Perekayasa Perangkat Lunak dan Pembelajar Sepanjang Hayat',
        image: '/images/fachrin-memoji.jpg',
        badges: [
            {
                icon: 'https://cdn.prod.website-files.com/6238b5a08434ef3f01200548/6238b5a08434efbabe200613_Upvest_Monogram_16.png',
                text: 'Insinyur Produk Senior @ Upvest',
            },
            {
                icon: 'https://choco.com/static/images/favicon-32x32.png',
                text: 'Mantan Perekayasa Perangkat Lunak Senior @ Choco',
            },
            {
                icon: 'https://www.deliveryhero.com/wp-content/themes/DeliveryHero/assets/img/icons/dh-favicon.ico',
                text: 'Mantan Perekayasa Perangkat Lunak @ Delivery Hero',
            },
            {
                icon: 'https://www.gotocompany.com/favicon.png',
                text: 'Mantan Insinyur Produk @ Gojek & Tokopedia',
            },
        ],
    },

    // About Section
    about: {
        title: 'Tentang',
        greeting: "Hai, saya Fachrin",
        description: "Saya seorang perekayasa perangkat lunak yang tinggal di Berlin, Jerman. Kesehariannya berkutat dengan teknologi mutakhir dan membangun sistem perangkat lunak yang dapat berkembang pesat untuk perusahaan rintisan hingga korporasi besar. Jika ingin mengobrol atau bekerja sama,",
        cta: {
            text: "mari terhubung",
            link: '#contact-heading',
        },
    },

    // Experience Section
    experience: [
        {
            company: 'Upvest',
            role: 'Insinyur Produk Senior',
            location: 'Berlin, Jerman',
            period: 'Okt 2023 – Saat Ini',
            description: [
                'Merancang sistem tangguh untuk memproses pengumuman aksi korporasi dari berbagai sumber pihak ketiga seperti BNP dan WMDaten. Sistem ini menjaga akurasi dan integritas informasi melalui validasi data, mengelola perbedaan antar sumber dengan efisien, serta menggabungkan informasi dari berbagai sumber menjadi satu kumpulan data yang utuh.',
                'Memimpin pengembangan sistem pengelolaan informasi pembebasan pajak yang bersifat strategis dan lintas fungsi. Sistem ini memungkinkan pengelolaan informasi pembebasan pajak yang efisien untuk beragam pengguna di klien-klien besar seperti N26 dan Revolut. Berperan besar dalam merancang arsitektur multi-tenant untuk seluruh sistem tersebut.',
                'Memperkenalkan arsitektur kode berbasis Perancangan Berbasis Domain (DDD) untuk repositori layanan aksi korporasi. Hasilnya meningkatkan kecepatan eksekusi proyek dan produktivitas secara signifikan, menjadi tolok ukur untuk arsitektur yang dapat dipelihara dengan baik di dalam organisasi.',
                'Merancang dan mengimplementasikan pengurai pesan Swift MT564 yang kompleks dengan kepatuhan penuh terhadap standar Swift ISO 20022. Pengurai ini mengekstrak data aksi korporasi secara detail, menerjemahkan sintaks Swift ke dalam model domain, dan meningkatkan efisiensi penanganan serta pemrosesan data secara signifikan.',
            ],
            techStack: ['Golang', 'Kafka', 'PostgreSQL', 'BigQuery', 'gRPC', 'SFTP', 'Swift ISO 20022', 'Protobuf'],
        },
        {
            company: 'Choco',
            role: 'Perekayasa Perangkat Lunak Senior',
            location: 'Berlin, Jerman',
            period: 'Mei 2023 – Okt 2023',
            description: [
                'Menyelesaikan tantangan krusial dengan mengoptimalkan kinerja pemuatan halaman tampilan produk yang menampilkan hingga 2 ribu produk. Mengidentifikasi dan menghilangkan hambatan pada kueri GraphQL dengan banyak resolvers, memangkas waktu tunggu dan meningkatkan pengalaman pengguna serta kinerja antarmuka secara signifikan.',
                'Merancang dan menjalankan pipeline migrasi dan sinkronisasi data berkinerja tinggi, memindahkan data dari sumber lama ke sumber data yang lebih optimal sambil memastikan layanan tetap berjalan tanpa gangguan.',
            ],
            techStack: ['AWS Lambda', 'GraphQL', 'DynamoDB', 'DynamoDB Streams', 'Amazon Kinesis'],
        },
        {
            company: 'Delivery Hero',
            role: 'Perekayasa Perangkat Lunak II',
            location: 'Berlin, Jerman',
            period: 'Mei 2022 – Mei 2023',
            description: [
                'Memperkenalkan mekanisme yang lebih baik untuk mengirim metrik ke Datadog di seluruh domain Billing dengan menulis middleware HTTP dan SQS yang tepat dalam basis kode Golang. Ini meningkatkan standar pemantauan dan peringatan, serta membantu tim dengan metrik utama seperti distribusi latensi permintaan HTTP masuk dan keluar (p50 hingga p99), waktu pemrosesan, waktu tunda, dan lain-lain.',
            ],
            techStack: ['Golang', 'Datadog', 'SQS'],
        },
        {
            company: 'Gojek',
            role: 'Insinyur Produk Utama',
            location: 'Jakarta, Indonesia',
            period: 'Apr 2020 – Mei 2022',
            description: [
                'Memimpin peluncuran layanan baru seperti GoCar Protect, GoRide EV, dan GoCar Premium di berbagai negara, serta terlibat intensif dalam analisis teknis awal. Ini sangat membantu Gojek mendapatkan banyak pengguna aktif dan berhasil menjadi yang teratas di pasar selama masa pandemi.',
                'Memimpin analisis teknis dan pengembangan perbaikan Biaya Pembatalan Gojek Singapura. Masalah ini disebabkan oleh perhitungan tarif yang salah yang menyebabkan banyak pesanan dibatalkan. Mengubah mekanisme perhitungan biaya pembatalan dan berhasil mengurangi tiket keluhan sebesar 3%.',
                'Memimpin pengembangan Driver Karma V2, fitur untuk mengomunikasikan informasi tentang pencapaian, umpan balik, dan kebersihan kendaraan mitra pengemudi kepada pelanggan. Pelanggan merasa lebih aman untuk naik karena mengenal pengemudi dengan lebih baik.',
                'Meneliti dan mengembangkan model pembelajaran mesin menggunakan algoritma BERT untuk memprediksi maksud percakapan antara pengemudi dan penumpang. Ini membantu Gojek mengurangi tingkat pembatalan pesanan sebesar 3% dan menghemat ribuan dolar di Singapura.',
                'Memprakarsai dan mengembangkan kerangka kerja pengujian otomatis untuk memverifikasi pesan Kafka. Kerangka kerja ini banyak digunakan dan terpasang pada pipeline CI/CD di berbagai grup produk Gojek seperti Transportasi, Gofood, dan Logistik.',
                'Mengembangkan Widget Tip yang telah diperbaharui dan merevolusi pengalaman pengguna dalam memberikan tip kepada pengemudi. Ini meningkatkan jumlah rata-rata tip sebesar 100%, dan meningkatkan frekuensi pemberian tip sebesar 13%.',
                'Menyelesaikan berbagai inisiatif rekayasa. Contohnya: mengurangi waktu pemrosesan konsumen Kafka saat proses deployment terjadi dari 1 jam menjadi hanya 5 menit. Konsumen tersebut memproses sekitar 10 ribu pesan per menit.',
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
            role: 'Perekayasa Perangkat Lunak L3',
            location: 'Jakarta, Indonesia',
            period: 'Apr 2019 – Mar 2020',
            description: [
                'Mengerjakan SuperInteger, tipe bilangan bulat baru untuk pustaka Go GraphQL Tokopedia. Sebelumnya hanya mendukung bilangan bulat 32 bit, SuperInteger mendukung bilangan bulat 53 bit. Tipe ini kemudian banyak digunakan di organisasi.',
                'Membuat lapisan migrasi basis data dari PostgreSQL ke CockroachDB tanpa menyebabkan waktu henti. Penggunaan CockroachDB membantu tim mencapai lingkungan basis data yang dapat diskalakan secara horizontal dan tersedia tinggi.',
                'Mengembangkan kerangka kerja pengujian regresi untuk memastikan perubahan perangkat lunak terbaru tidak berdampak negatif pada alur yang sudah ada dengan menjalankan beberapa layanan mikro dalam lingkungan Docker yang terisolasi.',
                'Mempercepat waktu pemrosesan layanan mikro keranjang belanja hingga 200-400 milidetik lebih cepat dengan menerapkan konkurensi.',
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
            description: 'Memimpin pengembangan Driver Karma V2, fitur untuk mengomunikasikan informasi tentang pencapaian, umpan balik, dan kebersihan kendaraan mitra pengemudi kepada pelanggan. Pelanggan merasa lebih aman untuk naik karena mengenal pengemudi dengan lebih baik.',
            role: 'Memimpin rancangan teknis dan pengembangan tumpukan penuh fitur ini, termasuk layanan backend untuk mengagregasi metrik pengemudi dan integrasi frontend.',
            stack: 'Golang, Kafka, Clojure, PostgreSQL, HAProxy',
        },
        {
            name: 'Tipping Widget',
            company: 'Gojek',
            image: '/images/tipping-service.webp',
            source: 'tipping-widget',
            description: 'Mengembangkan Widget Tip versi baru yang merevolusi pengalaman pengguna dalam memberikan tip kepada pengemudi. Fitur ini meningkatkan jumlah rata-rata tip sebesar 100%, dan meningkatkan frekuensi pemberian tip sebesar 13%.',
            role: 'Merancang dan mengimplementasikan seluruh sistem pemberian tip, termasuk arsitektur layanan mikro, pemrosesan pembayaran, dan notifikasi waktu nyata.',
            stack: 'Golang, Redis, Kafka, PostgreSQL, RabbitMQ, HAProxy',
        },
        {
            name: 'Chat Intent Classification',
            company: 'Gojek',
            image: '/images/chat-intent-detection.webp',
            source: 'chat-intent',
            description: 'Meneliti dan mengembangkan model pembelajaran mesin menggunakan algoritma BERT untuk memprediksi maksud percakapan antara pengemudi dan penumpang. Ini membantu Gojek mengurangi tingkat pembatalan pesanan sebesar 3% dan menghemat ribuan dolar di Singapura.',
            role: 'Memimpin riset pembelajaran mesin, pelatihan model, dan penerapan produksi sistem klasifikasi maksud berbasis BERT.',
            stack: 'Golang, Python, Redis, Kafka, BigQuery, TensorFlow',
        },
        {
            name: 'Shuffle Cards Provider',
            company: 'Gojek',
            image: '/images/shuffle-cards.webp',
            source: 'shuffle-cards',
            description: 'Membangun sistem pengiriman konten dinamis untuk beranda aplikasi Gojek, memungkinkan pengacakan kartu yang dipersonalisasi berdasarkan perilaku dan preferensi pengguna.',
            role: 'Merancang dan mengimplementasikan layanan orkestrasi kartu dan algoritma personalisasi.',
            stack: 'Golang, Redis, Kafka, PostgreSQL',
        },
        {
            name: 'New Service Types Launch',
            company: 'Gojek',
            image: '/images/service-type-launches.webp',
            source: 'service-types-launch',
            description: 'Memimpin peluncuran layanan baru seperti GoCar Protect, GoRide EV, dan GoCar Premium di berbagai negara, serta terlibat intensif dalam analisis teknis awal. Ini sangat membantu Gojek mendapatkan banyak pengguna aktif dan berhasil menjadi yang teratas di pasar selama masa pandemi.',
            role: 'Memimpin arsitektur teknis, koordinasi lintas fungsi, dan strategi peluncuran untuk berbagai peluncuran layanan baru.',
            stack: 'Golang, Python, Redis, Kafka, BigQuery, PostgreSQL',
        },
        {
            name: 'Service Restricted Area',
            company: 'Gojek',
            image: '/images/area-based-service-restriction.webp',
            source: 'service-restricted-area',
            description: 'Mengimplementasikan pagar geografis dan pembatasan layanan berbasis area untuk memastikan kepatuhan terhadap peraturan lokal dan mengoptimalkan ketersediaan layanan di berbagai wilayah.',
            role: 'Merancang dan mengembangkan layanan pagar geografis dan mesin kebijakan untuk pengelolaan area layanan.',
            stack: 'Golang, Redis, PostgreSQL, HAProxy',
        },
    ],

    // Podcast Section
    podcast: {
        title: 'Siniar',
        episodeUrl: 'https://open.spotify.com/embed/episode/42h5loszLcsDAZnNfY01ME?utm_source=generator&theme=0',
    },

    // Contact Section
    contact: {
        title: 'Kontak',
        links: [
            {
                name: 'Surel',
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
            title: 'Tertarik bekerja sama?',
            text: "Saya berpengalaman dalam sistem terdistribusi dan rekayasa produk. Jangan ragu menghubungi jika ada gagasan menarik atau ingin berbincang.",
            cta: 'Jadwalkan percakapan',
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
        description: 'Senior Product Engineer di Berlin. Spesialis distributed systems skala besar, Golang, dan cloud architecture. Pengalaman di Upvest, Choco, Delivery Hero, dan Gojek.',
        keywords: [
            'Software Engineer',
            'Product Engineer',
            'Distributed Systems',
            'Golang',
            'Go',
            'Backend Developer',
            'Full Stack Engineer',
            'Berlin',
            'Jerman',
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
        title: 'Penampilan',
        subtitle: 'Pembicaraan & Siniar',
        description: 'Kumpulan pembicaraan, wawancara, dan liputan tentang rekayasa perangkat lunak dan teknologi.',
        items: [
            {
                type: 'video' as const,
                title: 'Hari Rekayasa Upvest 2025',
                image: '/images/media/upvest-thumbnail.png',
                url: 'https://www.youtube.com/watch?v=GvWWQf71hiE',
                description: 'Tim Rekayasa Upvest berkumpul di Berlin untuk Hari Rekayasa 2025. Sehari penuh berkolaborasi, mempererat hubungan personal, dan menyelami kebutuhan klien lebih dalam.',
                date: 'November 2025',
                platform: 'YouTube',
                duration: '2:13',
                language: 'Inggris'
            },
            {
                type: 'video' as const,
                title: 'Pelatihan Praktikal: Pengenalan Teorema CAP pada Basis Data Terdistribusi',
                image: '/images/media/cap-theorem-thumbnail.jpg',
                url: 'https://www.youtube.com/watch?v=LGl6jW7Sykg',
                description: 'Menyampaikan lokakarya tentang Teorema CAP pada basis data terdistribusi untuk program Magister Sains Data dan Kecerdasan Buatan di Universitas Sumatera Utara.',
                date: 'Maret 2023',
                platform: 'YouTube',
                duration: '2:32:49',
                language: 'Indonesia'
            },
            {
                type: 'talk' as const,
                title: 'Peran Teknologi di Ekosistem Perusahaan Rintisan Indonesia',
                image: '/images/media/startup-industry-thumbnail.jpg',
                url: 'https://www.instagram.com/p/CIAuEeNhMut/',
                description: 'Membahas jalur karier dan peran teknologi di industri perusahaan rintisan Indonesia yang berkembang pesat, sebagai bagian dari perayaan Dies Natalis kampus.',
                date: 'November 2020',
                platform: 'Webinar',
                language: 'Indonesia'
            },
            {
                type: 'talk' as const,
                title: 'Cara Berpikir dalam Pemrograman Fungsional',
                image: '/images/media/facebook-devc-thumbnail.jpg',
                url: 'https://www.facebook.com/events/554379655443696',
                description: 'Menelusuri pergeseran paradigma dari Pemrograman Berorientasi Objek ke Pemrograman Fungsional. Pembahasan mendalam tentang berpikir secara fungsional untuk kualitas dan pemeliharaan kode yang lebih baik.',
                date: 'Juni 2020',
                platform: 'Webinar',
                language: 'Indonesia'
            },
        ],
    },

    // Podcast Section
    podcasts: [
        {
            title: 'Kehidupan sebagai Insinyur Produk di Gojek',
            episodeUrl: 'https://open.spotify.com/embed/episode/42h5loszLcsDAZnNfY01ME?utm_source=generator&theme=0',
            description: 'Berbagi pengalaman dan wawasan bekerja sebagai Insinyur Produk di ekosistem perusahaan rintisan teknologi Indonesia.',
            date: 'Agustus 2021',
            language: 'Indonesia',
        },
    ],

    // Blog Section
    blog: {
        title: 'Jurnal',
        description: 'Kumpulan pemikiran tentang rekayasa perangkat lunak dan perjalanan pribadi.',
        emptyState: {
            title: 'Sedang menulis',
            description: "Sedang menyusun beberapa tulisan tentang rekayasa, sistem, dan kehidupan. Silakan mampir lagi nanti!",
        },
    },

    // Now Page
    now: {
        title: 'Sekarang',
        subtitle: "Apa yang sedang menjadi fokus saat ini.",
        updatedAt: 'Diperbaharui 21 November 2025',
        sections: [
            {
                title: '📍 Lokasi',
                content: 'Tinggal di <strong>Berlin, Jerman</strong> 🇩🇪. Jauh dari Indonesia, tapi Berlin malah terasa seperti rumah baru. Saya masih terus mengikuti perkembangan tanah air walaupun betah berada disini. Oh ya, saya juga sedang mengajukan <strong>izin tinggal permanen</strong>.',
            },
            {
                title: '💼 Pekerjaan',
                content: "Saya bekerja sebagai <strong>Senior Product Engineer</strong> di <strong>Upvest</strong>, membantu membuka akses investasi untuk semua orang. Kami membangun infrastruktur finansial untuk masa depan, menantang, berskala besar, dan sangat memuaskan.",
            },
            {
                title: '🌱 Perkembangan',
                content: 'Keluar sejenak dari gelembung dunia teknologi. Saya lagi belajar soal <strong>keuangan pribadi dan investasi</strong>, sambil mengikuti rasa ingin tahu ke berbagai <strong>topik sains</strong> apapun yang menarik. Terlepas dari semuanya, saya sedang mempelajari hal yang paling menantang yaitu: <strong>menjadi seorang ayah</strong>.',
            },
            {
                title: '⚡️ Hobi',
                content: 'Bahasa cinta saya adalah makanan dan jalan-jalan. Saya dan istri biasanya selalu merencanakan liburan berdasarkan <strong>apa yang ingin kami makan</strong>. Di luar itu, biasanya saya binge-watch film-film di Netflix atau membaca artikel random di internet yang membuat saya <strong>tidur hingga larut malam</strong>.',
            },
        ],
    },

    // Command Menu
    commandMenu: {
        navigation: [
            { name: 'Beranda', icon: 'Home', id: 'main-content', path: '/' },
            { name: 'Tentang', icon: 'Info', id: 'about-heading' },
            { name: 'Pengalaman', icon: 'Briefcase', id: 'experience-heading' },
            { name: 'Proyek', icon: 'FolderGit2', id: 'projects-heading' },
            { name: 'Penampilan', icon: 'User', path: '/appearances' },
            { name: 'Kontak', icon: 'Mail', id: 'contact-heading' },
            { name: 'Jurnal', icon: 'PenTool', path: '/blog' },
            { name: 'Sekarang', icon: 'Clock', path: '/now' },
        ],
        social: [
            { name: 'GitHub', icon: 'Github', url: 'https://github.com/parinpan' },
            { name: 'LinkedIn', icon: 'Linkedin', url: 'https://www.linkedin.com/in/fachrinfan' },
            { name: 'Twitter', icon: 'Twitter', url: 'https://x.com/fachrinx' },
        ],
        general: [
            { name: 'Salin Surel', icon: 'Copy', action: 'copy_email' },
            { name: 'Lihat Kode Sumber', icon: 'Code', url: 'https://github.com/parinpan/fachr.in' },
        ],
    },

    // Footer
    footer: {
        copyrightText: 'Fachrin Aulia Nasution. All rights reserved.',
    },

    // UI Strings
    ui: {
        themeToggle: 'Ganti tema',
        languageToggle: 'Ganti bahasa',
        backToTop: 'Kembali ke atas',
        commandMenu: {
            open: 'Buka Menu Perintah',
            placeholder: 'Ketik perintah atau cari...',
            noResults: 'Tidak ada hasil.',
            esc: 'ESC',
            headings: {
                navigation: 'Navigasi',
                journal: 'Jurnal',
                social: 'Sosial',
                general: 'Umum',
            },
            actions: {
                copyEmail: 'Salin Surel',
                sourceCode: 'Lihat Kode Sumber',
            },
        },
        githubRepos: 'Repositori Github',
        githubActions: {
            viewAllRepos: 'Lihat semua repositori',
            viewRepoOnGithub: 'Lihat {name} di GitHub',
        },
        workList: {
            featuredProjects: 'Proyek Unggulan',
            partOfWork: 'Bagian dari pekerjaan di',
            closeDetails: 'Tutup rincian',
            labels: {
                project: 'Proyek',
                description: 'Deskripsi',
                role: 'Peran Saya',
                stack: 'Teknologi',
            },
        },
        appearanceList: {
            scrollLeft: 'Geser kiri',
            scrollRight: 'Geser kanan',
            types: {
                video: 'Video',
                talk: 'Webinar',
                article: 'Artikel',
            },
            actions: {
                watchVideo: 'Tonton Video',
                viewTalk: 'Lihat Webinar',
                viewDetails: 'Lihat Rincian',
            },
        },
        experience: {
            title: 'Pengalaman Kerja',
            expand: 'Buka',
            collapse: 'Tutup',
            technologies: 'Teknologi',
            more: 'lagi',
        },
        now: {
            update: 'Pembaharuan',
        },
        notFound: {
            title: '404',
            subtitle: 'Tidak Ditemukan',
            description: "Sumber daya yang diminta tidak dapat ditemukan di server ini.",
            backButton: 'cd /beranda',
            buttonText: 'Kembali ke Beranda',
        },
    },
};
