import {FC} from 'react'
import {Mesh} from 'three'
import {TypedCylinderGeometry, TypedMeshStandardMaterial} from '../../three-components'
import {useTorusMaterial} from '../../../lib/geometry/useTorusMaterial'
import {EFFECTS_COLORS} from '@/shared/lib/theme/colors'

interface ILineComponent {
    id: number
    hoveredId: number | null
    selectedId: number | null
    onPointerOver: () => void
    onPointerOut: () => void
    onClick: () => void
    lineRef: (el: Mesh | null) => void
}

const LineComponent: FC<ILineComponent> = ({
    id,
    hoveredId,
    selectedId,
    onPointerOver,
    onPointerOut,
    onClick,
    lineRef,
}) => {
    const {materialColor, materialEmissive} = useTorusMaterial({
        hoveredId,
        selectedId,
        id,
        color: EFFECTS_COLORS.connectionLine,
        defaultEmissive: EFFECTS_COLORS.lineEmissive,
    })

    return (
        <mesh
            ref={lineRef}
            scale={[1, 1, 1]}
            onPointerOver={onPointerOver}
            onPointerOut={onPointerOut}
            onClick={onClick}
        >
            <TypedCylinderGeometry args={[0.02, 0.02, 1]} />
            <TypedMeshStandardMaterial
                color={materialColor}
                emissive={materialEmissive}
                metalness={0.6}
                roughness={0.3}
                transparent
                opacity={0.9}
            />
        </mesh>
    )
}

export default LineComponent
