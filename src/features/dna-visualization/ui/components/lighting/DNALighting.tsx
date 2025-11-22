import {FC} from 'react'
import {LIGHTING_COLORS} from '@/shared/lib/theme/colors'
import {TypedAmbientLight, TypedDirectionalLight, TypedPointLight, TypedSpotLight} from './components'
import {useThemeContext} from '@/shared/lib/theme/ThemeProvider'

/**
 * Компонент освещения для DNA сцены
 */
export const DNALighting: FC = () => {
    const {theme} = useThemeContext()
    const isDark = theme === 'dark'

    return (
        <>
            <TypedAmbientLight intensity={isDark ? 0.6 : 0.4} />
            <TypedDirectionalLight
                position={[5, 5, 5]}
                intensity={isDark ? 1.5 : 1.2}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />
            <TypedPointLight position={[10, 10, 10]} intensity={isDark ? 1.0 : 0.8} color={LIGHTING_COLORS.primary} />
            <TypedPointLight position={[-10, -10, -10]} intensity={isDark ? 0.8 : 0.6} color={LIGHTING_COLORS.accent} />
            <TypedPointLight position={[0, -15, 0]} intensity={isDark ? 0.6 : 0.4} color={LIGHTING_COLORS.warm} />
            <TypedSpotLight
                position={[0, 20, 0]}
                angle={0.3}
                penumbra={0.1}
                intensity={isDark ? 0.7 : 0.5}
                color={LIGHTING_COLORS.gold}
                target-position={[0, 0, 0]}
            />
        </>
    )
}
