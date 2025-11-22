import {FC, useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import ResetButton from '@/shared/ui/Buttons/ui/ResetButton'
import PairLegend from '../../pair-filter/components/PairLegend/PairLegend'
import {TabWrapper} from '../TabWrapper'
import {useDNAViewStore} from '@/features/dna-visualization/model/stores/useDNAViewStore'
import {useDNATooltip} from '@/entities/dna-tooltip/lib/useDNATooltip'
import {useDrawerSize} from '@/shared/ui/Drawer/lib/useDrawerSize'
import {PairsFilters} from '@/shared/ui/PairsFilters/ui/PairsFilters'
import {ActivePairsSection} from '../components/ActivePairsSection'
import {EmptyPairsState} from '../components/EmptyPairsState'

/**
 * Приоритеты состояний для сортировки tooltip'ов
 */
const STATE_PRIORITY: Record<'selected' | 'hover' | 'default', number> = {
    selected: 0,
    hover: 1,
    default: 2,
}

/**
 * Компонент вкладки пар DNA
 */
export const PairsTab: FC = () => {
    const {t} = useTranslation()
    const {pairFilterMode, setPairFilterMode, resetPairFilters, selectedId, resetPairs} = useDNAViewStore((s) => ({
        pairFilterMode: s.pairFilterMode,
        setPairFilterMode: s.setPairFilterMode,
        resetPairFilters: s.resetPairFilters,
        selectedId: s.selectedId,
        resetPairs: s.resetPairs,
    }))
    const {tooltipDataListSmall, hasTooltips} = useDNATooltip()

    // Определяем размер drawer
    const isDrawerSmall = useDrawerSize()

    // Сортируем tooltip'ы
    const sortedTooltipDataList = useMemo(() => {
        return [...tooltipDataListSmall].sort((a, b) => STATE_PRIORITY[a.state] - STATE_PRIORITY[b.state])
    }, [tooltipDataListSmall])

    return (
        <TabWrapper titleKey="PAIRS_SECTION" tabKey="pairs">
            <div className="space-y-4 relative">
                <PairLegend />
                <PairsFilters pairFilterMode={pairFilterMode} onFilterChange={setPairFilterMode} />

                {hasTooltips ? (
                    <ActivePairsSection
                        tooltips={sortedTooltipDataList}
                        isDrawerSmall={isDrawerSmall}
                        selectedId={selectedId}
                        onResetPairs={resetPairs}
                    />
                ) : (
                    <EmptyPairsState />
                )}

                <div className="border-t border-gray-200 pt-3">
                    <ResetButton onClick={resetPairFilters}>
                        {t('RESET_PAIR_FILTERS', 'Сбросить фильтры и выбор')}
                    </ResetButton>
                </div>
            </div>
        </TabWrapper>
    )
}
