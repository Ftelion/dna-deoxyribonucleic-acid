import {MOUSE} from 'three'

export const CAMERA_CONFIG = {
    position: [0, 0.5, 20] as const,
    fov: 35,
} as const

export const ORBIT_CONTROLS_CONFIG = {
    mouseButtons: {
        LEFT: MOUSE.RIGHT, // ROTATE (ПКМ)
        MIDDLE: MOUSE.MIDDLE, // ZOOM (колесико)
        RIGHT: MOUSE.LEFT, // PAN (ЛКМ)
    },
    minDistance: 8,
    maxDistance: 30,
    maxPolarAngle: Math.PI,
    enableDamping: false,
    autoRotate: false,
    enablePan: true,
    enableZoom: true,
    enableRotate: true,
} as const

// границы для target (из CAMERA_BOUNDS в camera-tab/constants.ts)
export const PAN_BOUNDS = {
    minX: -8,
    maxX: 8,
    minY: -6,
    maxY: 6,
    minZ: -8,
    maxZ: 8,
} as const

// стили для контейнера сцены
export const SCENE_CONTAINER_STYLES = {
    position: 'relative' as const,
    width: '100%',
    height: '85vh',
} as const

export const CANVAS_STYLES = {
    width: '100%',
    height: '100%',
} as const
