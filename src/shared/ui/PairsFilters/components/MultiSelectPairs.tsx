import {FC, useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import RangeButtons from '@/shared/ui/Buttons/ui/RangeButtons'
import {PAIR_RANGES} from '@/features/dna-visualization/constants/pairRanges'
import {SelectedPairsList} from './SelectedPairsList'
import {handlePairInput} from '../lib/pairHelpers'

interface IMultiSelectPairsProps {
    pairFilterMode: number[]
    onFilterChange: (mode: number[]) => void
}

/**
 * Компонент для мультиселекта конкретных пар
 */
const MultiSelectPairs: FC<IMultiSelectPairsProps> = ({pairFilterMode, onFilterChange}) => {
    const {t} = useTranslation()

    const handleInputKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            handlePairInput(e, pairFilterMode, onFilterChange)
        },
        [pairFilterMode, onFilterChange]
    )

    const handleRangeSelect = (range: number[]) => {
        onFilterChange(range)
    }

    const handleClear = () => {
        onFilterChange([])
    }

    const handleRemovePair = (pairNumber: number) => {
        onFilterChange(pairFilterMode.filter((n) => n !== pairNumber))
    }

    return (
        <div className="space-y-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <input
                type="text"
                placeholder={t('ENTER_PAIR_NUMBERS', 'Введите номера пар (1-40) через запятую или пробел')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                onKeyDown={handleInputKeyDown}
            />

            <RangeButtons
                ranges={PAIR_RANGES.map(({label, range}) => ({
                    label: label === 'Все' ? t('ALL', label) : label,
                    range,
                    onClick: handleRangeSelect,
                }))}
                onClear={handleClear}
            />

            <SelectedPairsList selectedPairs={pairFilterMode} onRemovePair={handleRemovePair} />
        </div>
    )
}

export default MultiSelectPairs
