import {FC} from 'react'
import {SectionTitle} from '@/shared/ui/Typography/ui/SectionTitle'
import {FilterButtons} from '../components/FilterButtons'
import MultiSelectPairs from '../components/MultiSelectPairs'

interface IPairsFiltersProps {
    pairFilterMode: 'all' | 'even' | 'odd' | number[]
    onFilterChange: (mode: 'all' | 'even' | 'odd' | number[]) => void
}

/**
 * Компонент для секции фильтров пар
 */
export const PairsFilters: FC<IPairsFiltersProps> = ({pairFilterMode, onFilterChange}) => {
    return (
        <div className="space-y-3">
            <SectionTitle titleKey="FILTER_BY_NUMBER" size="sm" color="light-gray" />

            <FilterButtons pairFilterMode={pairFilterMode} onFilterChange={onFilterChange} />

            {Array.isArray(pairFilterMode) && (
                <MultiSelectPairs pairFilterMode={pairFilterMode} onFilterChange={onFilterChange} />
            )}
        </div>
    )
}
