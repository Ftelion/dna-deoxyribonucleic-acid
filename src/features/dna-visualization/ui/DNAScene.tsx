import {FC, useRef, useEffect} from 'react'
import {Canvas, useThree} from '@react-three/fiber'
import {OrbitControls} from '@react-three/drei'
import {Vector3} from 'three'
import DNAHelix from './DNAHelix'
import DNATooltip from '@/entities/dna-tooltip/ui/DNATooltip/DNATooltip'
import {DNALighting} from './components/lighting/DNALighting'
import {useOrbitControls} from '../lib/controls/useOrbitControls'
import {useThemeContext} from '@/shared/lib/theme/ThemeProvider'
import {CAMERA_CONFIG, ORBIT_CONTROLS_CONFIG, SCENE_CONTAINER_STYLES, CANVAS_STYLES} from './constants'

/**
 * Компонент для отображения сцены ДНК
 */
const SceneContent: FC = () => {
    const {gl} = useThree()
    const {theme} = useThemeContext()
    const {ref: orbitControlsRef, onChange: handleCameraChange} = useOrbitControls()
    const targetVector = useRef(new Vector3(0, 0, 0))

    // Обновляем прозрачность фона при смене темы
    useEffect(() => {
        gl.setClearColor('#000000', 0)
    }, [gl, theme])

    return (
        <>
            <DNALighting />
            <DNAHelix />

            <OrbitControls
                ref={orbitControlsRef}
                target={targetVector.current}
                onChange={handleCameraChange}
                {...ORBIT_CONTROLS_CONFIG}
            />
        </>
    )
}

const DNAScene: FC = () => {
    const {theme} = useThemeContext()

    const backgroundGradient =
        theme === 'dark'
            ? 'linear-gradient(to top, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)'
            : 'linear-gradient(to bottom, #ffffff 0%, #f8fafc 25%, #f1f5f9 50%, #e2e8f0 75%, #cbd5e1 100%)'

    const containerStyles = {
        ...SCENE_CONTAINER_STYLES,
        background: backgroundGradient,
    }

    return (
        <div style={containerStyles}>
            <Canvas camera={CAMERA_CONFIG} style={CANVAS_STYLES} resize={{debounce: 0}}>
                <SceneContent />
            </Canvas>

            <DNATooltip />
        </div>
    )
}

export default DNAScene
