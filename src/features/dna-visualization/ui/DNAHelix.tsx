import {FC, memo} from 'react'
import {Group, Mesh} from 'three'
import {useRef} from 'react'
import {useDNAAnimationStore} from '../model/stores/useDNAAnimationStore'
import {useDNAViewStore} from '../model/stores/useDNAViewStore'
import TorusComponent from './components/dna-elements/TorusComponent'
import LineComponent from './components/dna-elements/LineComponent'
import {useDNAPairs} from '../lib/geometry/useDNAPairs'
import {useDNAAnimation} from '../lib/animation/useDNAAnimation'
import {useDNALinePositioning} from '../lib/animation/useDNALinePositioning'
import {usePairVisibility} from '../lib/hooks/usePairVisibility'
import {usePairStateReset} from '../lib/hooks/usePairStateReset'

const NODE_SIZE = 0.1

const DNAHelix: FC = memo(() => {
    const group = useRef<Group>(null)
    // Refs для индивидуальной анимации нуклеотидов и линий
    const nucleotideRefs = useRef<(Mesh | null)[]>([])
    const lineRefs = useRef<(Mesh | null)[]>([])

    const {preview, breathingActive, rotationSpeed, breathingIntensity} = useDNAAnimationStore((s) => ({
        preview: s.preview,
        breathingActive: s.breathingActive,
        rotationSpeed: s.rotationSpeed,
        breathingIntensity: s.breathingIntensity,
    }))

    const {hoveredId, selectedId, setHoveredId, setSelectedId} = useDNAViewStore((s) => ({
        hoveredId: s.hoveredId,
        selectedId: s.selectedId,
        setHoveredId: s.setHoveredId,
        setSelectedId: s.setSelectedId,
    }))

    const pairs = useDNAPairs()

    const isPairVisible = usePairVisibility()
    usePairStateReset()

    // Анимация нуклеотидов (вращение, пульсация, волны)
    useDNAAnimation({
        nucleotideRefs,
        pairs,
        groupRef: group,
        preview,
        breathingActive,
        rotationSpeed,
        breathingIntensity,
        isPairVisible,
    })

    // Синхронизация позиций линий между нуклеотидами
    useDNALinePositioning({
        nucleotideRefs,
        lineRefs,
        pairs,
        hoveredId,
        selectedId,
        isPairVisible,
    })

    return (
        <group ref={group} name="dna-helix">
            {pairs.map((p) => {
                // Пропускаем рендеринг скрытых пар
                if (!isPairVisible(p.id)) {
                    return null
                }

                return (
                    <group key={p.id}>
                        <TorusComponent
                            ref={(el) => (nucleotideRefs.current[p.id * 2] = el)}
                            position={[p.left[0], p.left[1], p.left[2]]}
                            nodeSize={NODE_SIZE}
                            id={p.id}
                            color={p.color}
                            hoveredId={hoveredId}
                            selectedId={selectedId}
                            onPointerOver={() => setHoveredId(p.id)}
                            onPointerOut={() => setHoveredId(null)}
                            onClick={() => setSelectedId(selectedId === p.id ? null : p.id)}
                        />
                        <TorusComponent
                            ref={(el) => (nucleotideRefs.current[p.id * 2 + 1] = el)}
                            position={[p.right[0], p.right[1], p.right[2]]}
                            nodeSize={NODE_SIZE}
                            id={p.id}
                            color={p.color}
                            hoveredId={hoveredId}
                            selectedId={selectedId}
                            onPointerOver={() => setHoveredId(p.id)}
                            onPointerOut={() => setHoveredId(null)}
                            onClick={() => setSelectedId(selectedId === p.id ? null : p.id)}
                        />
                        <LineComponent
                            id={p.id}
                            hoveredId={hoveredId}
                            selectedId={selectedId}
                            onPointerOver={() => setHoveredId(p.id)}
                            onPointerOut={() => setHoveredId(null)}
                            onClick={() => setSelectedId(selectedId === p.id ? null : p.id)}
                            lineRef={(el) => (lineRefs.current[p.id] = el)}
                        />
                    </group>
                )
            })}
        </group>
    )
})

DNAHelix.displayName = 'DNAHelix'

export default DNAHelix
