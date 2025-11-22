import {FC} from 'react'
import {useTranslation} from 'react-i18next'

interface ISelectedPairsListProps {
    selectedPairs: number[]
    onRemovePair: (pairNumber: number) => void
}

/**
 * Компонент для отображения списка выбранных пар с возможностью удаления
 */
export const SelectedPairsList: FC<ISelectedPairsListProps> = ({selectedPairs, onRemovePair}) => {
    const {t} = useTranslation()

    if (selectedPairs.length === 0) {
        return (
            <div className="text-xs text-gray-500 text-center py-2">
                {t('NO_PAIRS_SELECTED', 'Не выбрано ни одной пары')}
            </div>
        )
    }

    return (
        <div className="space-y-2">
            <div className="text-xs text-gray-600 font-medium">
                {t('SELECTED_PAIRS', 'Выбранные пары')} ({selectedPairs.length}):
            </div>
            <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                {selectedPairs.map((num) => (
                    <span
                        key={num}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-blue-100 text-blue-800 border border-blue-200"
                    >
                        {num}
                        <button
                            onClick={() => onRemovePair(num)}
                            className="ml-1 text-blue-600 hover:text-blue-800 hover:bg-blue-200 rounded-full w-3 h-3 flex items-center justify-center text-xs leading-none"
                        >
                            ×
                        </button>
                    </span>
                ))}
            </div>
        </div>
    )
}
