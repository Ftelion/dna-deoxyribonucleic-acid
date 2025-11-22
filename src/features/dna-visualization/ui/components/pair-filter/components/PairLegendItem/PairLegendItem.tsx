import {FC} from 'react'
import {useTranslation} from 'react-i18next'
import cn from 'classnames'
import {useLegendItemStyles} from '../../lib/useLegendItemStyles'
import {CSSProperties} from 'react'
import {DNAPairType, DNA_PAIR_TYPES} from '@/shared/types'
import './PairLegendItem.css'

interface IPairLegendItemProps {
    labelKey: string
    className?: string
    isActive?: boolean
    onToggle?: () => void
    pairType?: DNAPairType
}

/**
 * Компонент для отображения элемента легенды типов пар в фильтре
 */
const PairLegendItem: FC<IPairLegendItemProps> = ({labelKey, className = '', isActive = true, onToggle, pairType}) => {
    const {t} = useTranslation()

    const detectedPairType = pairType || (labelKey.includes(DNA_PAIR_TYPES.AT) ? DNA_PAIR_TYPES.AT : DNA_PAIR_TYPES.GC)
    const styleVariables = useLegendItemStyles({pairType: detectedPairType, isActive, onToggle})

    return (
        <div className={cn('legend-item', className)} style={styleVariables as CSSProperties} onClick={onToggle}>
            <div className="flex items-center gap-2">
                {onToggle && (
                    <div className="w-3 h-3 rounded-full bg-[var(--indicator-color)] border-2 border-[var(--indicator-border-color)] flex-shrink-0" />
                )}
                <span className="text-primary font-semibold text-sm !text-[rgb(107,114,128)]">{t(labelKey)}</span>
            </div>
        </div>
    )
}

export default PairLegendItem
