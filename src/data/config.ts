// Define types for better TypeScript support
export interface ServiceConfig {
    id: string;
    title: string;
    icon: string;
    description: string;
    price: number | string;
    features: string[];
    category: string;
    estimatedTime: string;
    popularity: string;
    priceNote?: string; // Optional property
}

export interface UrgencyOption {
    id: string;
    label: string;
    icon: string;
    default?: boolean; // Optional property
}

export interface AddonConfig {
    id: string;
    title: string;
    price: number;
    description: string;
}

const CONFIG = {
    business: {
        name: 'IT Services & Padel Dreams',
        phone: '+27723386828',
        email: 'info@andresmit.co.za',
        website: 'https://andresmit.co.za'
    },

    pricing: {
        currency: 'R',

        services: {
            windows: 250,
            website: 800,
            software: 100,
            hardware: 150,
            combo: 'Custom Quote' as const
        },

        addons: {
            cleanup: 150,
            drivers: 150,
            windowsOffice: 450
        },

        discounts: {
            multipleServices: 0.1,
        }
    },

    features: {
        enablePromotions: false,
        enableBookingCalendar: false,
        enableLiveChat: false,
        enableTestimonials: false
    }
};

export const URGENCY_OPTIONS: Record<string, UrgencyOption> = {
    asap: {
        id: 'asap',
        label: 'ASAP (within 1-2 days)',
        icon: '🚀'
    },
    week: {
        id: 'week',
        label: 'This week',
        icon: '📅',
        default: true
    },
    flexible: {
        id: 'flexible',
        label: "I'm flexible",
        icon: '🕒'
    }
};

export const PricingHelper = {
    formatPrice(price: number | string): string {
        if (typeof price === 'string') return price;
        return `${CONFIG.pricing.currency}${price}`;
    }
};

export const ENHANCED_SERVICES: Record<string, ServiceConfig> = {
    windows: {
        id: 'windows',
        title: 'Clean Windows Install',
        icon: '💻',
        description: 'Fresh OS installation with drivers and updates (excludes data backup & OS license)',
        price: CONFIG.pricing.services.windows,
        features: [
            'Complete system format',
            'Fresh Windows installation',
            'Driver installation & updates',
            'Basic system optimization'
        ],
        category: 'installation',
        estimatedTime: '2-4 hours',
        popularity: 'high'
    },
    website: {
        id: 'website',
        title: 'One-Page Basic Website',
        icon: '🌐',
        description: 'Professional single-page website using HTML/CSS or builder platforms',
        price: CONFIG.pricing.services.website,
        features: [
            'Custom design or builder-based',
            'Mobile-responsive layout',
            'Basic SEO optimization',
            'Optional hosting/domain support'
        ],
        category: 'development',
        estimatedTime: '1-3 days',
        popularity: 'medium'
    },
    software: {
        id: 'software',
        title: 'Software Installation',
        icon: '📦',
        description: 'Bulk software setup including Office, antivirus, browsers, and essential apps',
        price: CONFIG.pricing.services.software,
        priceNote: 'Per session (flat rate)',
        features: [
            'Microsoft Office suite',
            'Antivirus & security software',
            'Essential browsers & apps',
            'Configuration & setup'
        ],
        category: 'maintenance',
        estimatedTime: '1-2 hours',
        popularity: 'high'
    },
    hardware: {
        id: 'hardware',
        title: 'RAM or SSD Upgrade',
        icon: '🧠',
        description: 'Professional hardware installation and setup (parts cost excluded)',
        price: CONFIG.pricing.services.hardware,
        features: [
            'RAM memory upgrades',
            'SSD drive installation',
            'Desktop & laptop service',
            'Parts sourcing assistance'
        ],
        category: 'hardware',
        estimatedTime: '1-2 hours',
        popularity: 'medium'
    },
    combo: {
        id: 'combo',
        title: 'Multiple Services',
        icon: '🔄',
        description: 'Combination of services with discount',
        price: CONFIG.pricing.services.combo,
        features: [
            'Mix and match services',
            'Volume discount applied',
            'Personalized consultation',
            'Priority scheduling'
        ],
        category: 'package',
        estimatedTime: 'Varies',
        popularity: 'medium'
    }
};

export const ENHANCED_ADDONS: AddonConfig[] = [
    {
        id: 'cleanup',
        title: 'PC Cleanup & Tune-up',
        price: CONFIG.pricing.addons.cleanup,
        description: 'Bloatware removal & startup optimization'
    },
    {
        id: 'drivers',
        title: 'Driver Updates & Activation',
        price: CONFIG.pricing.addons.drivers,
        description: 'Complete driver package & Windows activation'
    },
    {
        id: 'windowsOffice',
        title: 'Windows + Office Combo',
        price: CONFIG.pricing.addons.windowsOffice,
        description: 'Complete OS and productivity suite setup'
    }
];

export const CONTENT = {
    hero: {
        title: 'Personal IT Services to Fund My Padel Addiction',
        subtitle: "Hi! I'm a tech enthusiast who loves solving computer problems almost as much as I love playing padel. Every service helps me get closer to my next match on the court!",
        cta: 'Check Out My Services'
    },

    sections: {
        services: {
            title: 'What I Can Do For You',
            subtitle: 'Professional IT services with transparent pricing'
        },
        contact: {
            title: "Let's Get Your Tech Sorted (And My Padel Game Funded!)",
            subtitle: 'Ready to upgrade your tech? Drop me a message and let\'s get started. Every job gets me one step closer to the padel court!'
        }
    },

    form: {
        title: 'Quick Quote Request',
        subtitle: 'Tell me what you need and I\'ll send you a personalized quote via WhatsApp',
        disclaimer: 'Your quote will be sent via WhatsApp - no spam, just a personalized quote and next steps!'
    }
};

// Export CONFIG as named export only (removed default export)
export { CONFIG };

// Export service IDs as a type-safe array
export const SERVICE_IDS = Object.keys(ENHANCED_SERVICES) as Array<keyof typeof ENHANCED_SERVICES>;