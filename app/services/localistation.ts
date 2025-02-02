const TRANSLATIONS: Record<string, Record<string, string>> = {
    en: {
        free_rate_limiter_cooldown: "Blocked for 30 seconds upon exceeding rate limits",
        free_activity_logging: "No activity logging",
        free_concurrent_connections: "Up to 25 simultaneous connections",
        free_speed: "Up to 1 Gbps connection speed",
        free_bandwidth: "Limited bandwidth (300MB)",
        plus_rate_limiter_cooldown: "Blocked for 30 seconds upon exceeding rate limits",
        plus_activity_logging: "No activity logging",
        plus_concurrent_connections: "Up to 25 simultaneous connections",
        plus_speed: "Up to 1 Gbps connection speed",
        plus_bandwidth: "Unlimited bandwidth",
        pro_cheaper_than_plus: "25% cheaper than Plus",
        pro_everything_from_plus: "Includes everything in Plus",
    },
    ru: {
        free_rate_limiter_cooldown: "Блокировка на 30 секунд при превышении лимитов",
        free_activity_logging: "Отсутствие логирования активности",
        free_concurrent_connections: "До 25 одновременных подключений",
        free_speed: "Скорость до 1 Гбит/с",
        free_bandwidth: "Ограничение трафика (300МБ)",
        plus_rate_limiter_cooldown: "Блокировка на 30 секунд при превышении лимитов",
        plus_activity_logging: "Отсутствие логирования активности",
        plus_concurrent_connections: "До 25 одновременных подключений",
        plus_speed: "Скорость до 1 Гбит/с",
        plus_bandwidth: "Безлимитный трафик",
        pro_cheaper_than_plus: "На 25% дешевле, чем Plus",
        pro_everything_from_plus: "Включает все из Plus",
    },
    zh: {
        free_rate_limiter_cooldown: "超过速率限制后被封锁30秒",
        free_activity_logging: "无活动记录",
        free_concurrent_connections: "最多25个并发连接",
        free_speed: "高达1 Gbps的连接速度",
        free_bandwidth: "有限的带宽（300MB）",
        plus_rate_limiter_cooldown: "超过速率限制后被封锁30秒",
        plus_activity_logging: "无活动记录",
        plus_concurrent_connections: "最多25个并发连接",
        plus_speed: "高达1 Gbps的连接速度",
        plus_bandwidth: "无限带宽",
        pro_cheaper_than_plus: "比Plus便宜25%",
        pro_everything_from_plus: "包含Plus的所有功能",
    },
    es: {
        free_rate_limiter_cooldown: "Bloqueado durante 30 segundos al exceder los límites",
        free_activity_logging: "Sin registro de actividad",
        free_concurrent_connections: "Hasta 25 conexiones simultáneas",
        free_speed: "Velocidad de conexión de hasta 1 Gbps",
        free_bandwidth: "Ancho de banda limitado (300MB)",
        plus_rate_limiter_cooldown: "Bloqueado durante 30 segundos al exceder los límites",
        plus_activity_logging: "Sin registro de actividad",
        plus_concurrent_connections: "Hasta 25 conexiones simultáneas",
        plus_speed: "Velocidad de conexión de hasta 1 Gbps",
        plus_bandwidth: "Ancho de banda ilimitado",
        pro_cheaper_than_plus: "25% más barato que Plus",
        pro_everything_from_plus: "Incluye todo lo de Plus",
    },
    ar: {
        free_rate_limiter_cooldown: "تم الحظر لمدة 30 ثانية عند تجاوز الحدود",
        free_activity_logging: "لا تسجيل للنشاط",
        free_concurrent_connections: "ما يصل إلى 25 اتصالًا متزامنًا",
        free_speed: "سرعة اتصال تصل إلى 1 جيجابت في الثانية",
        free_bandwidth: "عرض النطاق الترددي المحدود(300 ميغابايت)",
        plus_rate_limiter_cooldown: "تم الحظر لمدة 30 ثانية عند تجاوز الحدود",
        plus_activity_logging: "لا تسجيل للنشاط",
        plus_concurrent_connections: "ما يصل إلى 25 اتصالًا متزامنًا",
        plus_speed: "سرعة اتصال تصل إلى 1 جيجابت في الثانية",
        plus_bandwidth: "عرض نطاق غير محدود",
        pro_cheaper_than_plus: "أرخص بنسبة 25% من Plus",
        pro_everything_from_plus: "يتضمن كل شيء من Plus",
    },
    pt: {
        free_rate_limiter_cooldown: "Bloqueado por 30 segundos ao exceder os limites",
        free_activity_logging: "Sem registro de atividades",
        free_concurrent_connections: "Até 25 conexões simultâneas",
        free_speed: "Velocidade de conexão de até 1 Gbps",
        free_bandwidth: "Largura de banda limitada (300MB)",
        plus_rate_limiter_cooldown: "Bloqueado por 30 segundos ao exceder os limites",
        plus_activity_logging: "Sem registro de atividades",
        plus_concurrent_connections: "Até 25 conexões simultâneas",
        plus_speed: "Velocidade de conexão de até 1 Gbps",
        plus_bandwidth: "Largura de banda ilimitada",
        pro_cheaper_than_plus: "25% mais barato que o Plus",
        pro_everything_from_plus: "Inclui tudo do Plus",
    },
};

const getUserLocale = (): string => {
    const locale = navigator.language || "en-US";
    return locale.split("-")[0].toLowerCase();
};

export const localiseKey = (key: string, fallback: string): string => {
    const userLocale = getUserLocale();
    const translations = TRANSLATIONS[userLocale] || TRANSLATIONS["en"];
    return translations[key] || fallback;
};

const CURRENCY_REGIONS: Record<string, string[]> = {
    EUR: [
        "AT", "BE", "CY", "EE", "FI", "FR", "DE", "GR", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PT", "SK", "SI", "ES",
    ],
    RUB: ["RU", "BY", "KZ", "KG", "AM"],
    USD: ["US", "CA", "MX", "AU", "NZ", "SG", "HK", "PH"],
};

export const getUserCurrency = (): string => {
    const locale = navigator.language || "en-US";
    const region = locale.split("-")[1]?.toUpperCase();

    if (!region) {
        return "USD";
    }

    for (const [currency, regions] of Object.entries(CURRENCY_REGIONS)) {
        if (regions.includes(region)) {
            return currency;
        }
    }

    return "USD";
};