export type Lang = "ar" | "en";

export const translations = {
  ar: {
    hero: {
      brand: "AVENTRA",
      tagline: "أبعد من اللوجستيات، بنوصل الإمكانيات",
      titleLine1: "الشحن واللوجستيات",
      titleLine2: "تميّز في التوصيل،",
      titleLine3: "أسواق متصلة",
      description:
        "شريك واحد، إمكانيات بلا حدود. نقدّم حلول لوجستية ذكية بتغطية عالمية، ونضمن وصول بضائعك بأمان وفي الموعد.",
      getStarted: "ابدأ الآن",
      exploreServices: "استكشف خدماتنا",
    },
    stats: {
      countries: "دولة",
      vehicles: "مركبة",
      clients: "عميل سعيد",
      deliveries: "شحنة سنويًا",
      experience: "سنة خبرة",
    },
    services: {
      eyebrow: "خدماتنا",
      title: "حلول لوجستية متكاملة",
      description:
        "من الشحن البحري لحلول التكنولوجيا الذكية، بنقدّم خدمات لوجستية شاملة تناسب احتياجات شركتك.",
      learnMore: "اعرف أكتر",
      items: [
        { title: "شحن بحري عالمي", description: "خدمات شحن بحري سريعة وموثوقة تربط أهم الموانئ حول العالم." },
        { title: "شحن جوي", description: "حلول شحن جوي سريعة للشحنات الحساسة للوقت في أي مكان بالعالم." },
        { title: "نقل بري", description: "تغطية على مستوى الجمهورية بأسطول حديث لنقل بري فعّال." },
        { title: "تخزين ومستودعات", description: "حلول تخزين آمنة مع إدارة مخزون متقدمة." },
        { title: "تكنولوجيا ذكية", description: "حلول لوجستية مدعومة بالذكاء الاصطناعي والتتبع اللحظي." },
      ],
    },
    cta: {
      eyebrow: "شريك واحد، إمكانيات بلا حدود",
      title: "جاهز تطوّر منظومة الشحن بتاعتك؟",
      description: "انضم لآلاف الشركات اللي بتثق في AVENTRA لإدارة عمليات الشحن بتاعتها.",
      getStarted: "ابدأ اليوم",
      contactSales: "تواصل مع المبيعات",
    },
  },
  en: {
    hero: {
      brand: "AVENTRA",
      tagline: "BEYOND LOGISTICS, WE CONNECT POSSIBILITIES",
      titleLine1: "Logistics & Shipping",
      titleLine2: "Delivering Excellence,",
      titleLine3: "Connecting Markets",
      description:
        "One Partner. Endless Possibilities. We provide smart logistics solutions with global reach, ensuring your goods arrive safely and on time.",
      getStarted: "Get Started",
      exploreServices: "Explore Services",
    },
    stats: {
      countries: "Countries",
      vehicles: "Vehicles",
      clients: "Happy Clients",
      deliveries: "Deliveries / Year",
      experience: "Years Experience",
    },
    services: {
      eyebrow: "Our Services",
      title: "Comprehensive Logistics Solutions",
      description:
        "From sea freight to smart technology, we provide end-to-end logistics services tailored to your business needs.",
      learnMore: "Learn More",
      items: [
        { title: "Global Sea Freight", description: "Fast & reliable ocean freight services connecting major ports worldwide." },
        { title: "Air Freight", description: "Express air cargo solutions for time-sensitive shipments across the globe." },
        { title: "Land Transport", description: "Nationwide coverage with a modern fleet for efficient road logistics." },
        { title: "Warehousing", description: "Safe & secure storage solutions with advanced inventory management." },
        { title: "Technology", description: "Smart logistics solutions powered by AI, tracking, and real-time data." },
      ],
    },
    cta: {
      eyebrow: "One Partner. Endless Possibilities.",
      title: "Ready to Transform Your Logistics?",
      description: "Join thousands of businesses that trust AVENTRA for their logistics needs.",
      getStarted: "Get Started Today",
      contactSales: "Contact Sales",
    },
  },
} as const;
