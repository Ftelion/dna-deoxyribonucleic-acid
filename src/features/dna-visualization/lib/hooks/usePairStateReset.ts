import {useEffect} from 'react'
import {useDNAViewStore} from '../../model/stores/useDNAViewStore'
import {usePairVisibility} from './usePairVisibility'

/**
 * Хук для автоматического сброса состояний взаимодействия (hover, select)
 * при изменении фильтров, когда выбранная или наведенная пара становится невидимой
 */
export const usePairStateReset = () => {
    const {selectedId, hoveredId, setSelectedId, setHoveredId} = useDNAViewStore((s) => ({
        selectedId: s.selectedId,
        hoveredId: s.hoveredId,
        setSelectedId: s.setSelectedId,
        setHoveredId: s.setHoveredId,
    }))
    const isPairVisible = usePairVisibility()

    useEffect(() => {
        // Сбрасываем выбранную пару, если она стала невидимой
        if (selectedId !== null && !isPairVisible(selectedId)) {
            setSelectedId(null)
        }

        // Сбрасываем наведенную пару, если она стала невидимой
        if (hoveredId !== null && !isPairVisible(hoveredId)) {
            setHoveredId(null)
        }
    }, [selectedId, hoveredId, setSelectedId, setHoveredId, isPairVisible])
}
