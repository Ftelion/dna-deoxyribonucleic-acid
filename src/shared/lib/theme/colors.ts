// === ТИПЫ ТЕМ ===
export type ThemeType = 'light' | 'dark'

// === БАЗОВЫЕ ЦВЕТА ===
export const BASE_COLORS = {
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
} as const

// === ЦВЕТА DNA НУКЛЕОТИДОВ ===
export const DNA_NUCLEOTIDES = {
    adenineThymine: '#4FC3F7', // A-T пара (аденин-тимин)
    guanineCytosine: '#E57373', // G-C пара (гуанин-цитозин)
} as const

// === ЦВЕТА ОСВЕЩЕНИЯ ===
export const LIGHTING_COLORS = {
    primary: '#FFFFFF',
    accent: '#4FC3F7',
    warm: '#E57373',
    gold: '#FFD700',
} as const

// === ЦВЕТА UI КОМПОНЕНТОВ ===
export const UI_COLORS = {
    light: {
        background: {
            primary: '#F8FAFC',
            secondary: '#FFFFFF',
            overlay: 'rgba(255, 255, 255, 0.9)',
        },
        text: {
            primary: '#1F2937',
            secondary: '#6B7280',
            muted: '#9CA3AF',
        },
        button: {
            primary: {
                default: '#3B82F6',
                hover: '#2563EB',
                active: '#1D4ED8',
            },
            secondary: {
                default: '#6B7280',
                hover: '#4B5563',
                active: '#374151',
            },
            success: {
                default: '#10B981',
                hover: '#059669',
            },
        },
        border: {
            light: '#D1D5DB',
            medium: '#9CA3AF',
        },
        shadow: {
            default: 'rgba(0, 0, 0, 0.1)',
            hover: 'rgba(0, 0, 0, 0.2)',
        },
        slider: {
            thumb: {
                default: '#3B82F6',
                hover: '#2563EB',
                active: '#1D4ED8',
            },
            track: '#FFFFFF',
        },
    },
    dark: {
        background: {
            primary: '#0F172A',
            secondary: '#1E293B',
            overlay: 'rgba(0, 0, 0, 0.8)',
        },
        text: {
            primary: '#F1F5F9',
            secondary: '#94A3B8',
            muted: '#64748B',
        },
        button: {
            primary: {
                default: '#3B82F6',
                hover: '#60A5FA',
                active: '#2563EB',
            },
            secondary: {
                default: '#64748B',
                hover: '#94A3B8',
                active: '#475569',
            },
            success: {
                default: '#10B981',
                hover: '#34D399',
            },
        },
        border: {
            light: '#334155',
            medium: '#475569',
        },
        shadow: {
            default: 'rgba(0, 0, 0, 0.3)',
            hover: 'rgba(0, 0, 0, 0.5)',
        },
        slider: {
            thumb: {
                default: '#3B82F6',
                hover: '#60A5FA',
                active: '#2563EB',
            },
            track: '#1E293B',
        },
    },
} as const

// === ЦВЕТА ДЛЯ СПЕЦИАЛЬНЫХ ЭФФЕКТОВ ===
export const EFFECTS_COLORS = {
    connectionLine: '#FFFFFF',
    lineEmissive: '#000000',
    highlight: '#FFD700',
} as const

// === ЦВЕТА TOOLTIP ===
export const TOOLTIP_COLORS = {
    light: {
        selected: LIGHTING_COLORS.gold,
        selectedGlow: 'rgba(255, 215, 0, 0.35)',
        hover: LIGHTING_COLORS.accent,
        hoverGlow: 'rgba(0, 255, 255, 0.3)',
        defaultBackground: 'rgba(255, 255, 255, 0.8)',
        selectedBackground: 'linear-gradient(145deg, rgba(255, 215, 0, 0.12), rgba(255, 215, 0, 0.06))',
        hoverBackground: 'rgba(255, 255, 255, 0.92)',
        shadow: {
            dark: 'rgba(0, 0, 0, 0.18)',
            light: 'rgba(0, 0, 0, 0.1)',
            indicator: 'rgba(0, 0, 0, 0.3)',
        },
        whiteAlpha: 'rgba(255, 255, 255, 0.25)',
    },
    dark: {
        selected: LIGHTING_COLORS.gold,
        selectedGlow: 'rgba(255, 215, 0, 0.5)',
        hover: LIGHTING_COLORS.accent,
        hoverGlow: 'rgba(0, 255, 255, 0.4)',
        defaultBackground: 'rgba(30, 41, 59, 0.9)',
        selectedBackground: 'linear-gradient(145deg, rgba(255, 215, 0, 0.15), rgba(255, 215, 0, 0.08))',
        hoverBackground: 'rgba(30, 41, 59, 0.95)',
        shadow: {
            dark: 'rgba(0, 0, 0, 0.4)',
            light: 'rgba(0, 0, 0, 0.2)',
            indicator: 'rgba(0, 0, 0, 0.5)',
        },
        whiteAlpha: 'rgba(255, 255, 255, 0.1)',
    },
} as const
