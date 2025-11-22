import {FC} from 'react'
import type {ITooltipBadgeProps} from '../../types/types'
import './TooltipBadge.css'

interface ITooltipBadgeComponentProps {
    badgeProps: ITooltipBadgeProps
}

export const TooltipBadge: FC<ITooltipBadgeComponentProps> = ({badgeProps}) => {
    if (!badgeProps.visible) {
        return null
    }

    return (
        <div className={badgeProps.className}>
            <span className={badgeProps.indicatorClassName} />
            {badgeProps.text}
        </div>
    )
}
