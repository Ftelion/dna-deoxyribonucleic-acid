import {forwardRef} from 'react'
import {Mesh} from 'three'
import {TypedTorusGeometry, TypedMeshStandardMaterial} from '../../three-components'
import {useTorusMaterial} from '../../../lib/geometry/useTorusMaterial'

interface ITorusComponent {
    position: [number, number, number]
    nodeSize: number
    id: number
    color: string
    hoveredId: number | null
    selectedId: number | null
    onPointerOver: () => void
    onPointerOut: () => void
    onClick: () => void
}

/**
 * Компонент для отображения торуса (кольца)
 */
const TorusComponent = forwardRef<Mesh, ITorusComponent>(
    ({position, nodeSize, id, color, hoveredId, selectedId, onPointerOver, onPointerOut, onClick}, ref) => {
        // Достаем материалы для торуса
        const {materialColor, materialEmissive, materialOpacity} = useTorusMaterial({
            hoveredId,
            selectedId,
            id,
            color,
        })

        return (
            <mesh
                ref={ref}
                // почему-то он утверждает, что свойства position у mesh не существует, однако все работает правильно(
                // eslint-disable-next-line react/no-unknown-property
                position={position}
                onPointerOver={onPointerOver}
                onPointerOut={onPointerOut}
                onClick={onClick}
            >
                <TypedTorusGeometry args={[nodeSize * 0.8, nodeSize * 0.3, 8, 16]} />
                <TypedMeshStandardMaterial
                    color={materialColor}
                    emissive={materialEmissive}
                    metalness={0.8}
                    roughness={0.2}
                    transparent
                    opacity={materialOpacity}
                />
            </mesh>
        )
    }
)

TorusComponent.displayName = 'TorusComponent'

export default TorusComponent
