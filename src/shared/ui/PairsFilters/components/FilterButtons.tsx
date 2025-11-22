import {FC} from 'react'
import {useTranslation} from 'react-i18next'
import cn from 'classnames'

interface IFilterButtonsProps {
    pairFilterMode: 'all' | 'even' | 'odd' | number[]
    onFilterChange: (mode: 'all' | 'even' | 'odd' | number[]) => void
}

/**
 * Компонент с кнопками основных фильтров пар
 */
export const FilterButtons: FC<IFilterButtonsProps> = ({pairFilterMode, onFilterChange}) => {
    const {t} = useTranslation()

    const getButtonClasses = (isActive: boolean) =>
        cn('px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border', {
            'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/25': isActive,
            'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400': !isActive,
        })

    return (
        <div className="grid grid-cols-2 gap-2">
            <button onClick={() => onFilterChange('all')} className={getButtonClasses(pairFilterMode === 'all')}>
                {t('SHOW_ALL_PAIRS', 'Все пары')}
            </button>
            <button onClick={() => onFilterChange('even')} className={getButtonClasses(pairFilterMode === 'even')}>
                {t('SHOW_EVEN_PAIRS', 'Четные')}
            </button>
            <button onClick={() => onFilterChange('odd')} className={getButtonClasses(pairFilterMode === 'odd')}>
                {t('SHOW_ODD_PAIRS', 'Нечетные')}
            </button>
            <button
                onClick={() => onFilterChange([] as number[])}
                className={getButtonClasses(Array.isArray(pairFilterMode))}
            >
                {t('SELECT_SPECIFIC_PAIRS', 'Выборочно')}
            </button>
        </div>
    )
}
