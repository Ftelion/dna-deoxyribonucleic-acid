import {FC, ReactNode, Ref} from 'react'
import {Mesh} from 'three'

// Типы для компонентов Three.js
export interface IMeshProps extends Record<string, unknown> {
    ref?: Ref<Mesh> | ((instance: Mesh | null) => void)
    position?: [number, number, number]
    visible?: boolean
    scale?: [number, number, number]
    onPointerOver?: () => void
    onPointerOut?: () => void
    onClick?: () => void
    children?: ReactNode
}

export interface ITorusGeometryProps extends Record<string, unknown> {
    args?: [number, number, number, number]
}

export interface ICylinderGeometryProps extends Record<string, unknown> {
    args?: [number, number, number]
}

export interface IMeshStandardMaterialProps extends Record<string, unknown> {
    color?: string
    emissive?: string
    metalness?: number
    roughness?: number
    transparent?: boolean
    opacity?: number
}

// Типизированные компоненты (обходим проблему с неизвестными свойствами)
export const TypedTorusGeometry: FC<ITorusGeometryProps> = (props) => <torusGeometry {...props} />
export const TypedCylinderGeometry: FC<ICylinderGeometryProps> = (props) => <cylinderGeometry {...props} />
export const TypedMeshStandardMaterial: FC<IMeshStandardMaterialProps> = (props) => <meshStandardMaterial {...props} />
