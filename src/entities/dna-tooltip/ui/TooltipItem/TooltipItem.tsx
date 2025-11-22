import {FC} from 'react'
import {useTranslation} from 'react-i18next'
import type {ITooltipData} from '../../types/types'
import {TooltipBadge} from '../TooltipBadge/TooltipBadge'
import './TooltipItem.css'

interface ITooltipItemProps {
    tooltipData: ITooltipData
    isDrawerSmall?: boolean
}

/**
 * Компонент для отображения tooltip'а пары DNA
 */
export const TooltipItem: FC<ITooltipItemProps> = ({tooltipData, isDrawerSmall = false}) => {
    const {t} = useTranslation()
    const {id, baseColor, basePairLabel, containerClassName, indicatorStyle, badgeProps, state} = tooltipData

    return (
        <div
            className={containerClassName}
            style={{
                borderColor: state === 'default' ? baseColor : undefined,
            }}
        >
            <div
                className="tooltip-indicator absolute top-2 left-4 rounded-full flex-shrink-0"
                style={indicatorStyle}
            />

            <div className="text-sm">
                <div className="font-medium mb-1 text-primary">{t('PAIR_NUMBER', {number: id + 1})}</div>
                <div className="font-normal text-secondary">{basePairLabel}</div>
            </div>

            <TooltipBadge
                badgeProps={{
                    ...badgeProps,
                    text: isDrawerSmall ? '' : badgeProps.text,
                }}
            />
        </div>
    )
}
