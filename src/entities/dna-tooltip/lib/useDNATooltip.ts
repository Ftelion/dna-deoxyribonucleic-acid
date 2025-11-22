import {useCallback, useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import i18n from '@/shared/lib/i18n/config/i18n'
import {useDNAViewStore} from '@/features/dna-visualization/model/stores/useDNAViewStore'
import {getNucleotideColor, getBasePairType} from './dnaUtils'
import {getTooltipClassName, getIndicatorStyle, getBadgeBaseProps, getBadgeTextKey} from './tooltipUtils'
import type {ITooltipData, TooltipState} from '../types/types'

/**
 * Хук для работы с логикой tooltip'ов пар ДНК
 */
export const useDNATooltip = () => {
    const {t} = useTranslation()
    const {hoveredId, selectedId} = useDNAViewStore((s) => ({
        hoveredId: s.hoveredId,
        selectedId: s.selectedId,
    }))

    // Создаем массив активных ID (могут быть несколько одновременно)
    const activeIds = useMemo((): number[] => {
        const ids: number[] = []
        if (hoveredId !== null) {
            ids.push(hoveredId)
        }
        if (selectedId !== null && !ids.includes(selectedId)) {
            ids.push(selectedId)
        }
        return ids
    }, [hoveredId, selectedId])

    /**
     * Получаем состояние tooltip'а для заданного ID пары
     */
    const getTooltipState = useCallback(
        (pairId: number): TooltipState => {
            if (selectedId === pairId) {
                return 'selected'
            }
            if (hoveredId === pairId) {
                return 'hover'
            }
            return 'default'
        },
        [hoveredId, selectedId]
    )

    /**
     * Получаем лейбл базовой пары для заданного ID
     */
    const getBasePairLabel = useCallback(
        (pairId: number): string => {
            const pairType = getBasePairType(pairId)
            return pairType === 'AT' ? t('AT_BASE_PAIR') : t('GC_BASE_PAIR')
        },
        [t]
    )

    /**
     * Получаем свойства бейджа tooltip'а
     */
    const getBadgeProps = useCallback(
        (state: TooltipState) => {
            const baseProps = getBadgeBaseProps(state)
            const textKey = getBadgeTextKey(state)

            return {
                ...baseProps,
                text: textKey && t(textKey),
            }
        },
        [t]
    )

    /**
     * Получаем полные данные для рендеринга tooltip'а
     */
    const getTooltipData = useCallback(
        (pairId: number, size: 'normal' | 'small' = 'normal'): ITooltipData => {
            const state = getTooltipState(pairId)
            const baseColor = getNucleotideColor(pairId)
            const basePairLabel = getBasePairLabel(pairId)
            const containerClassName = getTooltipClassName(state, size)
            const indicatorStyle = getIndicatorStyle(state, baseColor)
            const badgeProps = getBadgeProps(state)

            return {
                id: pairId,
                state,
                baseColor,
                basePairLabel,
                containerClassName,
                indicatorStyle,
                badgeProps,
            }
        },
        [getTooltipState, getBasePairLabel, getBadgeProps]
    )

    /**
     * Получаем массив данных для всех активных tooltip'ов
     */
    const tooltipDataList = useMemo((): ITooltipData[] => {
        return activeIds.map((id) => getTooltipData(id, 'normal'))
        // getTooltipData зависит от activeIds и языка (через t функцию)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIds, i18n.language])

    /**
     * Получаем массив данных для маленьких tooltip'ов (для ActiveTooltips)
     */
    const tooltipDataListSmall = useMemo((): ITooltipData[] => {
        return activeIds.map((id) => getTooltipData(id, 'small'))
        // getTooltipData зависит от activeIds и языка (через t функцию)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIds, i18n.language])

    return {
        activeIds,
        tooltipDataList,
        tooltipDataListSmall,
        hasTooltips: activeIds.length > 0,
    }
}
