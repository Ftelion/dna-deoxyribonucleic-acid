import {FC} from 'react'
import {useTranslation} from 'react-i18next'

interface IRangeButton {
    label: string
    range: number[]
    onClick: (range: number[]) => void
}

interface IRangeButtonsProps {
    ranges: IRangeButton[]
    onClear: () => void
    className?: string
}

/**
 * Компонент для кнопок выбора диапазонов с кнопкой очистки
 */
const RangeButtons: FC<IRangeButtonsProps> = ({ranges, onClear, className = ''}) => {
    const {t} = useTranslation()

    return (
        <div className={`flex flex-wrap gap-1 ${className}`}>
            {ranges.map(({label, range, onClick}) => (
                <button
                    key={label}
                    onClick={() => onClick(range)}
                    className="px-2 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                >
                    {label}
                </button>
            ))}

            <button
                onClick={onClear}
                className="px-2 py-1 text-xs bg-red-200 hover:bg-red-300 text-red-800 rounded transition-colors"
            >
                {t('CLEAR', 'Очистить')}
            </button>
        </div>
    )
}

export default RangeButtons
