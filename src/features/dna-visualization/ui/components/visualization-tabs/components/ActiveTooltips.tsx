import {FC} from 'react'
import {ITooltipData} from '@/entities/dna-tooltip/types/types'
import {SectionTitle} from '@/shared/ui/Typography/ui/SectionTitle'
import {TooltipItem} from '@/entities/dna-tooltip/ui/TooltipItem/TooltipItem'

interface IActiveTooltipsProps {
    tooltips: ITooltipData[]
    isDrawerSmall: boolean
}

/**
 * Компонент для отображения активных tooltip'ов пар
 */
export const ActiveTooltips: FC<IActiveTooltipsProps> = ({tooltips, isDrawerSmall}) => {
    return (
        <div className="space-y-3">
            <SectionTitle titleKey="ACTIVE_TOOLTIPS" size="sm" color="light-gray" />
            <div className="space-y-2">
                {tooltips.map((tooltipData) => (
                    <TooltipItem key={tooltipData.id} tooltipData={tooltipData} isDrawerSmall={isDrawerSmall} />
                ))}
            </div>
        </div>
    )
}
