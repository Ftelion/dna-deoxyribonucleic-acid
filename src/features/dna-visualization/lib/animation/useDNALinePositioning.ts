import {useFrame} from '@react-three/fiber'
import {RefObject} from 'react'
import {Mesh, MeshStandardMaterial, Quaternion, Vector3} from 'three'
import {IDNAPair} from '@/shared/types'

interface IUseDNALinePositioningProps {
    nucleotideRefs: RefObject<(Mesh | null)[]>
    lineRefs: RefObject<(Mesh | null)[]>
    pairs: IDNAPair[]
    hoveredId: number | null
    selectedId: number | null
    isPairVisible?: (pairId: number) => boolean
}

/**
 * Синхронизация позиций линий между нуклеотидами
 */
export const useDNALinePositioning = ({
    nucleotideRefs,
    lineRefs,
    pairs,
    hoveredId,
    selectedId,
    isPairVisible = () => true,
}: IUseDNALinePositioningProps) => {
    // Обновление позиций и видимости линий для всех пар
    useFrame(() => {
        pairs.forEach((p) => {
            const lineRef = lineRefs.current?.[p.id]
            if (lineRef && isPairVisible(p.id)) {
                const leftRef = nucleotideRefs.current?.[p.id * 2]
                const rightRef = nucleotideRefs.current?.[p.id * 2 + 1]

                if (leftRef && rightRef) {
                    const leftPos = leftRef.position

                    // Вычисляем направление от левого к правому
                    const direction = rightRef.position.clone().sub(leftPos)
                    const distance = direction.length()

                    // Позиция линии - середина между нуклеотидами
                    const midPos = leftPos.clone().add(direction.clone().multiplyScalar(0.5))
                    lineRef.position.copy(midPos)

                    // Поворот линии вдоль направления
                    // Cylinder по умолчанию вдоль Y, поворачиваем к направлению
                    const quaternion = new Quaternion()
                    quaternion.setFromUnitVectors(new Vector3(0, 1, 0), direction.normalize())
                    lineRef.setRotationFromQuaternion(quaternion)

                    // Масштабируем длину
                    lineRef.scale.y = distance

                    // Управляем прозрачностью материала
                    const isHighlighted = hoveredId === p.id || selectedId === p.id
                    const material = lineRef.material as MeshStandardMaterial
                    if (material) {
                        material.opacity = isHighlighted ? 0.9 : 0.0
                    }
                }
            }
        })
    })
}
