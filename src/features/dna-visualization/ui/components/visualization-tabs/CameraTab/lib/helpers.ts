import {IVector3Array} from '@/shared/types'
import {Axis, CoordinateType, CameraCoordinates} from '../types'
import {CAMERA_BOUNDS} from './constants'

/**
 * Функция для создания нового массива координат с обновленным значением оси
 */
export const createUpdatedCoordinates = (
    currentCoordinates: IVector3Array,
    axis: Axis,
    value: number
): CameraCoordinates => {
    const newCoordinates: CameraCoordinates = [currentCoordinates[0], currentCoordinates[1], currentCoordinates[2]]
    const axisIndex = axis === 'x' ? 0 : axis === 'y' ? 1 : 2
    newCoordinates[axisIndex] = value
    return newCoordinates
}

/**
 * Функция для создания обработчика изменения координат
 */
export const createHandleCoordinateChange = (
    setCameraPosition: (position: CameraCoordinates) => void,
    setCameraTarget: (target: CameraCoordinates) => void,
    cameraPosition: IVector3Array,
    cameraTarget: IVector3Array
) => {
    return (type: CoordinateType, axis: Axis, value: string) => {
        const numValue = parseFloat(value) || 0
        const bounds = CAMERA_BOUNDS[type][axis]

        // Ограничиваем значение границами только для слайдера
        const clampedValue = Math.max(bounds.min, Math.min(bounds.max, numValue))

        const updateCoordinates = (coordType: CoordinateType, axis: Axis, value: number) => {
            if (coordType === 'position') {
                setCameraPosition(createUpdatedCoordinates(cameraPosition, axis, value))
            } else {
                setCameraTarget(createUpdatedCoordinates(cameraTarget, axis, value))
            }
        }

        updateCoordinates(type, axis, clampedValue)
    }
}
