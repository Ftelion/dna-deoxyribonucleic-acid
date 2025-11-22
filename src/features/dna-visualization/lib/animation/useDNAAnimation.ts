import {useFrame} from '@react-three/fiber'
import {useRef, RefObject} from 'react'
import {Group, Mesh} from 'three'
import {IDNAPair} from '@/shared/types'

interface IUseDNAAnimationProps {
    nucleotideRefs: RefObject<(Mesh | null)[]>
    pairs: IDNAPair[]
    groupRef: RefObject<Group>
    preview: boolean
    breathingActive: boolean
    rotationSpeed: number
    breathingIntensity: number
    isPairVisible?: (pairId: number) => boolean
}

/**
 * Анимация нуклеотидов (вращение, пульсация, волны)
 */
export const useDNAAnimation = ({
    nucleotideRefs,
    pairs,
    groupRef,
    preview,
    breathingActive,
    rotationSpeed,
    breathingIntensity,
    isPairVisible = () => true,
}: IUseDNAAnimationProps) => {
    const timeRef = useRef<number>(0)

    // Вращение цепи + пульсация
    useFrame((_, delta) => {
        timeRef.current += delta

        if (preview && groupRef.current) {
            groupRef.current.rotation.y += delta * rotationSpeed * 2.5 // 0.2 * 2.5 = 0.5 (обычная скорость)
        }

        // Волнообразная анимация вдоль спирали
        nucleotideRefs.current?.forEach((ref, i) => {
            if (ref) {
                const pairIndex = Math.floor(i / 2)
                const pair = pairs[pairIndex]

                if (pair && isPairVisible(pairIndex)) {
                    if (!breathingActive || breathingIntensity === 0) {
                        // При отключенном дыхании или нулевой интенсивности отключаем анимацию
                        ref.scale.setScalar(1)
                        ref.position.y = pair.originalY
                        return
                    }

                    // Волна движется вдоль спирали
                    const waveOffset = timeRef.current * 2 + i * 0.3
                    const wave = Math.sin(waveOffset) * 0.03

                    // Пульсация нуклеотидов с разной фазой для левой и правой спирали
                    const pulse = 1 + Math.sin(waveOffset * 1.2) * breathingIntensity

                    ref.scale.setScalar(pulse)

                    // Легкое вертикальное движение
                    ref.position.y = pair.originalY + wave
                }
            }
        })
    })

    return {timeRef}
}
