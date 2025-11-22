import {FC} from 'react'

// Типы для компонентов освещения
interface IAmbientLightProps {
    intensity?: number
}

interface IDirectionalLightProps {
    position?: [number, number, number]
    intensity?: number
    castShadow?: boolean
    'shadow-mapSize-width'?: number
    'shadow-mapSize-height'?: number
}

interface IPointLightProps {
    position?: [number, number, number]
    intensity?: number
    color?: string
}

interface ISpotLightProps {
    position?: [number, number, number]
    angle?: number
    penumbra?: number
    intensity?: number
    color?: string
    'target-position'?: [number, number, number]
}

// Типизированные компоненты освещения
export const TypedAmbientLight: FC<IAmbientLightProps> = (props) => <ambientLight {...props} />
export const TypedDirectionalLight: FC<IDirectionalLightProps> = (props) => <directionalLight {...props} />
export const TypedPointLight: FC<IPointLightProps> = (props) => <pointLight {...props} />
export const TypedSpotLight: FC<ISpotLightProps> = (props) => <spotLight {...props} />
