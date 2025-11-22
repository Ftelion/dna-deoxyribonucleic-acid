import {useMemo} from 'react'
import {IDNAPair, IVector3Array} from '@/shared/types'
import {getNucleotideColor} from '@/entities/dna-tooltip/lib/dnaUtils'

interface IUseDNAPairsProps {
    pairsCount?: number
    radius?: number
    heightStep?: number
    angleStep?: number
}

/**
 * Формируем позиции левой и правой спиралей в зависимости от угла и радиуса
 */
const getPosition = (isLeft: boolean, radius: number, angle: number, y: number): IVector3Array => {
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    const sign = isLeft ? 1 : -1

    return {
        0: sign * radius * cos,
        1: y,
        2: sign * radius * sin,
    }
}

/**
 * Генерация пар нуклеотидов
 */
export const useDNAPairs = ({
    pairsCount = 40,
    radius = 1.5,
    heightStep = 0.25,
    angleStep = 0.35,
}: IUseDNAPairsProps = {}) => {
    const pairs = useMemo<IDNAPair[]>(
        () =>
            Array.from({length: pairsCount}).map((_, i) => {
                const angle = i * angleStep
                // Начальная позиция по Y у ДНК
                const y = i * heightStep - (pairsCount * heightStep) / 2

                // Позиции для левой и правой спиралей
                const left = getPosition(true, radius, angle, y)
                const right = getPosition(false, radius, angle, y)

                // Цвет нуклеотида (чередуем A-T и G-C)
                const color = getNucleotideColor(i)

                return {
                    id: i,
                    left,
                    right,
                    originalY: y, // Сохраняем оригинальную Y позицию для анимации
                    color,
                }
            }),
        [pairsCount, radius, heightStep, angleStep]
    )

    return pairs
}
