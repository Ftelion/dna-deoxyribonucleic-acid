import {ICameraBounds, Axis, CoordinateType} from '../types'

// Конфиг границ для координат камеры
export const CAMERA_BOUNDS: ICameraBounds = {
    position: {
        x: {min: -30, max: 30},
        y: {min: -20, max: 20},
        z: {min: -30, max: 30},
    },
    target: {
        x: {min: -8, max: 8},
        y: {min: -6, max: 6},
        z: {min: -8, max: 8},
    },
} as const

// Конфиг по умолчанию для осей координат камеры
export const AXIS_DEFAULTS: Record<CoordinateType, Record<Axis, number>> = {
    position: {
        x: 0,
        y: 0.5,
        z: 20,
    },
    target: {
        x: 0,
        y: 0,
        z: 0,
    },
} as const
