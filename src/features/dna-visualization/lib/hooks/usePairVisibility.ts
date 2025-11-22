import {useMemo} from 'react'
import {useDNAViewStore} from '../../model/stores/useDNAViewStore'

/**
 * Хук для проверки видимости пар нуклеотидов на основе фильтров
 */
export const usePairVisibility = () => {
    const {showATPairs, showGCPairs, pairFilterMode} = useDNAViewStore((s) => ({
        showATPairs: s.showATPairs,
        showGCPairs: s.showGCPairs,
        pairFilterMode: s.pairFilterMode,
    }))

    return useMemo(() => {
        return (pairId: number): boolean => {
            // Проверка типа пары (A-T: четные индексы, G-C: нечетные индексы)
            const isATPair = pairId % 2 === 0
            const isGCPair = pairId % 2 === 1

            // Если тип пары скрыт, возвращаем false
            if ((isATPair && !showATPairs) || (isGCPair && !showGCPairs)) {
                return false
            }

            // Проверка фильтра по номеру пары
            switch (pairFilterMode) {
                case 'even':
                    return isATPair
                case 'odd':
                    return isGCPair
                case 'all':
                    return true
                default:
                    // Проверяем массив номеров пар
                    if (Array.isArray(pairFilterMode) && pairFilterMode.length > 0) {
                        return pairFilterMode.includes(pairId + 1)
                    }
                    return true
            }
        }
    }, [showATPairs, showGCPairs, pairFilterMode])
}
