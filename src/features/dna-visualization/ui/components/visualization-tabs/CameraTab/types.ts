import {IVector3Array} from '@/shared/types'

export type CameraCoordinates = [number, number, number]
export type Axis = 'x' | 'y' | 'z'
export type CoordinateType = 'position' | 'target'

export interface ICameraTabProps {
    resetCamera: () => void
}

export interface ICoordinateSectionProps {
    titleKey: string
    type: CoordinateType
    values: IVector3Array
    onChange: (type: CoordinateType, axis: Axis, value: string) => void
}

export interface IAxisConfig {
    axis: Axis
    value: number
    defaultValue: number
}

export interface IBounds {
    min: number
    max: number
}

export interface ICameraBounds {
    position: Record<Axis, IBounds>
    target: Record<Axis, IBounds>
}
